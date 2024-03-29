import ready from "../../js/utils/documentReady.js";
import { createSearchResultsItem, generateFighterPockemon } from "./renderHTML.js";
import { debounce } from "../../js/utils/debounce.js";
import { highlightText } from "../../js/utils/highlightText.js";
import { getPockemonById, getPockemonByName } from "../../js/services.js";
import { BASE_URL } from "../../js/services.js";
import { hideNode, showNode } from "../../js/utils/showNode.js";
import { TIMEOUT_VALUE } from "../../js/utils/constants.js";

ready(function () {
  const fightsSection = document.querySelector(".section-fights");

  if (fightsSection) {
    let searchInputsValues = {
      0: "",
      1: "",
    };

    let fightersObj = {
      0: undefined,
      1: undefined,
    };

    const searchInputs = fightsSection.querySelectorAll(".js-search-input");
    const searchResultsContainer = fightsSection.querySelector(".js-search-results-container");
    const pageLoader = fightsSection.querySelector(".js-pokemon-loader");
    const fightField = fightsSection.querySelector(".js-fights-field");
    const allFighterContainers = fightsSection.querySelectorAll(".js-fighter-card");
    const fightBtnContainer = fightsSection.querySelector(".js-fight-btn-container");
    const fightBtn = fightsSection.querySelector(".js-fight-btn");
    const fightsResultContainer = fightsSection.querySelector(".js-fights-result");

    const hidePagePreloader = () => {
      hideNode(pageLoader);
      showNode(fightField);
    };

    setTimeout(() => {
      hidePagePreloader();
    }, TIMEOUT_VALUE);

    const clearSearchInput = (input) => {
      input.style.backgroundImage = "";
    };

    const fillSearchInput = (input, data) => {
      const {
        id,
        name: { english: name },
        collectionId,
        image,
      } = data;

      const imageURL = `${BASE_URL}/api/files/${collectionId}/${id}/${image}?thumb=Wx0`;

      const img = document.createElement("img");
      img.src = imageURL;

      const idValue = id.slice(-3);
      const index = input.dataset.index;

      input.style.backgroundImage = `url('${imageURL}')`;
      input.value = `${idValue} — ${name}`;
      searchInputsValues[index] = `${idValue} — ${name}`;
      input.style.backgroundSize = "20px 20px";
    };

    const handleInputFocus = (evt) => {
      const currentInput = evt.target;
      currentInput.style.backgroundSize = "0";
      currentInput.value = "";
    };

    const handleInputBlur = (evt, index) => {
      const currentInput = evt.target;

      if (currentInput.value === "") {
        currentInput.style.backgroundSize = "20px 20px";
        currentInput.value = searchInputsValues[index];
      }
    };

    const handleInputSearch = async (evt, index) => {
      evt.preventDefault();

      const currentInput = evt.target;
      searchInputsValues[index] = currentInput.value;
      clearSearchInput(currentInput);

      const trimmedValue = currentInput.value.trim();
      const currentSearchContainer = currentInput.closest(".search-field");
      const currentLoader = currentSearchContainer.querySelector(".js-search-loader");
      const currentResultsContainer = currentSearchContainer.querySelector(
        ".js-search-results-container",
      );

      if (trimmedValue.length > 2) {
        showNode(currentLoader);
        hideNode(currentResultsContainer);
        currentResultsContainer.innerHTML = null;

        const result = await getPockemonByName(trimmedValue);

        if (result) {
          result.forEach((item) => {
            currentResultsContainer.insertAdjacentHTML("beforeend", createSearchResultsItem(item));
          });
          highlightText(trimmedValue);
          setTimeout(() => {
            hideNode(currentLoader);
            showNode(currentResultsContainer);
          }, TIMEOUT_VALUE);
        } else {
          hideNode(currentResultsContainer);
        }
      } else {
        searchResultsContainer.innerHTML = null;
      }
    };

    searchInputs.forEach((input, index) => {
      input.addEventListener(
        "input",
        debounce((evt) => handleInputSearch(evt, index), 500),
      );
      input.addEventListener("focus", handleInputFocus);
      input.addEventListener("blur", (evt) => handleInputBlur(evt, index));
    });

    const showFightBtn = () => {
      showNode(fightBtnContainer);
      let areBothCardsSelected = true;
      allFighterContainers.forEach((item) => {
        if (item.classList.contains("hide")) {
          areBothCardsSelected = false;
        }
      });

      if (areBothCardsSelected) {
        fightBtn.removeAttribute("disabled");
      } else {
        fightBtn.setAttribute("disabled", true);
      }
    };

    const handlePokemonChoose = async (id, currentBtn) => {
      const currentCard = currentBtn.closest(".js-fighter-container");
      const currentFighterId = currentCard.dataset.fighter;
      const currentLoader = currentCard.querySelector(".js-fighter-loader");
      const currentPlaceholder = currentCard.querySelector(".js-fighter-empty");
      const fighterContainer = currentCard.querySelector(".js-fighter-card"); //

      const currentSearchResultsContainer = currentCard.querySelector(
        ".js-search-results-container",
      );
      const currentSearchInput = currentCard.querySelector(".js-search-input");

      showNode(currentLoader);
      hideNode(fighterContainer);
      hideNode(currentPlaceholder);
      hideNode(currentSearchResultsContainer);
      hideNode(fightsResultContainer);
      fightsResultContainer.innerHTML = "";
      fighterContainer.innerHTML = "";

      const data = await getPockemonById(id);
      const chosenFighter = data[0];

      const pokemonItem = generateFighterPockemon(chosenFighter);
      fighterContainer.insertAdjacentHTML("afterbegin", pokemonItem);

      fillSearchInput(currentSearchInput, chosenFighter);
      const {
        name: { english: name },
        weakness,
        type,
      } = chosenFighter;

      const fighterDataForObj = { name, weakness, type };

      fightersObj[currentFighterId] = fighterDataForObj;

      setTimeout(() => {
        hideNode(currentLoader);
        showNode(fighterContainer);
        hideNode(fightsResultContainer);
        showFightBtn();
      }, TIMEOUT_VALUE);
    };

    fightsSection.addEventListener("click", (evt) => {
      if (evt.target.closest(".js-search-result-item")) {
        const currentBtn = evt.target.closest(".js-search-result-item");
        const chosenId = currentBtn.dataset.id;

        handlePokemonChoose(chosenId, currentBtn);
      }
    });

    const returnDrawResult = () => {
      showNode(fightsResultContainer);
      fightsResultContainer.innerHTML = `<span class="section-fights__results-text section-fights__results-text--draw">Round draw!</span>`;
    };

    const returnWinnerResult = (name) => {
      showNode(fightsResultContainer);
      fightsResultContainer.innerHTML = `<span class="section-fights__results-text section-fights__results-text--winner">${name} is the winner!</span>`;
    };

    const handleFightClick = async () => {
      fightBtn.classList.add("active");

      const {
        weakness: firstFighterWeakness,
        type: firstFighterType,
        name: firstFighterName,
      } = fightersObj[0];

      const {
        weakness: secondFighterWeakness,
        type: secondFighterType,
        name: secondFighterName,
      } = fightersObj[1];

      const firstFighterPowerValue = firstFighterType.filter((element) =>
        secondFighterWeakness.includes(element),
      ).length;
      const secondFighterPowerValue = secondFighterType.filter((element) =>
        firstFighterWeakness.includes(element),
      ).length;

      setTimeout(() => {
        switch (true) {
          case firstFighterPowerValue === secondFighterPowerValue:
            returnDrawResult();
            break;
          case firstFighterPowerValue > secondFighterPowerValue:
            returnWinnerResult(firstFighterName);
            break;
          case firstFighterPowerValue < secondFighterPowerValue:
            returnWinnerResult(secondFighterName);
            break;
          default:
            break;
        }

        hideNode(fightBtnContainer);
        fightBtn.classList.remove("active");
      }, TIMEOUT_VALUE);
    };

    fightBtn.addEventListener("click", () => {
      handleFightClick();
    });
  }
});
