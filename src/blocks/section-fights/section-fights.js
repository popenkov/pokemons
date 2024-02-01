import ready from "../../js/utils/documentReady.js";
import { createSearchResultsItem, generateFighterPockemon } from "./utils.js";
import { debounce } from "../../js/utils/debounce.js";
import { highlightText } from "../../js/utils/highlightText.js";
import { getPockemonById, getPockemonByName } from "../../js/services.js";
import { BASE_URL } from "../../js/services.js";

ready(function () {
  const fightsSection = document.querySelector(".section-fights");

  if (fightsSection) {
    const searchInputs = fightsSection.querySelectorAll(".js-search-input");
    const searchResultsWrapper = fightsSection.querySelector(".js-search-results");
    const searchResultsContainer = fightsSection.querySelector(".js-search-results-container");
    const pageLoader = fightsSection.querySelector(".js-pokemon-loader");
    const fightField = fightsSection.querySelector(".js-fights-field");

    const showNode = (node) => {
      node.classList.remove("hide");
    };

    const hideNode = (node) => {
      node.classList.add("hide");
    };

    const hidePagePreloader = () => {
      hideNode(pageLoader);
      showNode(fightField);
    };
    hidePagePreloader();
    // todo temporary hidden
    // setTimeout(() => {
    //   hidePagePreloader();
    // }, 1000);

    const handleInputSearch = async (evt) => {
      evt.preventDefault();

      const currentInput = evt.target;

      const trimmedValue = currentInput.value.trim();
      const currentSearchContainer = currentInput.closest(".search-field");
      const currentLoader = currentSearchContainer.querySelector(".js-search-loader");
      const currentResultsContainer = currentSearchContainer.querySelector(
        ".js-search-results-container",
      );

      if (trimmedValue.length > 0) {
        showNode(currentLoader);
        currentResultsContainer.innerHTML = null;

        const result = await getPockemonByName(trimmedValue);

        if (result) {
          result.forEach((item) => {
            currentResultsContainer.insertAdjacentHTML("beforeend", createSearchResultsItem(item));
          });
          highlightText(trimmedValue);
          hideNode(currentLoader);
          showNode(currentResultsContainer);
        } else {
          hideNode(currentResultsContainer);
        }
      } else {
        searchResultsContainer.innerHTML = null;
      }
    };

    const handleInputBlur = (evt) => {
      // todo
      console.log(evt);
      // const currentInput = evt.target;
      // const currentSearchContainer = currentInput.closest(".search-field");
      // const currentResultsContainer = currentSearchContainer.querySelector(
      //   ".js-search-results-container",
      // );
      // hideNode(currentResultsContainer);
      // currentInput.value = "";
    };

    searchInputs.forEach((input) => {
      input.addEventListener("input", debounce(handleInputSearch, 500));
      input.addEventListener("blur", handleInputBlur);
      input.addEventListener("focus", () => showNode(searchResultsWrapper));
    });

    const fillSearchInput = (input, data) => {
      console.log(data);
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

      input.style.backgroundImage = `url('${imageURL}')`;
      input.value = `${idValue} - ${name}`;
    };

    const handlePokemonChoose = async (id, currentBtn) => {
      const currentCard = currentBtn.closest(".js-fighter-container");
      const currentLoader = currentCard.querySelector(".js-fighter-loader");
      const currentPlaceholder = currentCard.querySelector(".js-fighter-empty");
      const fighterContainer = currentCard.querySelector(".js-fighter-card");
      const currentSearchResultsContainer = currentCard.querySelector(
        ".js-search-results-container",
      );
      const currentSearchInput = currentCard.querySelector(".js-search-input");

      showNode(currentLoader);
      hideNode(currentPlaceholder);
      hideNode(currentSearchResultsContainer);
      fighterContainer.innerHTML = "";

      const data = await getPockemonById(id);

      const pokemonItem = generateFighterPockemon(data[0]);
      fighterContainer.insertAdjacentHTML("afterbegin", pokemonItem);

      fillSearchInput(currentSearchInput, data[0]);

      // todo temporary hidden
      // setTimeout(() => {
      //   hideNode(currentLoader);
      //   showNode(fighterContainer);
      // }, 1000);
      hideNode(currentLoader);
      showNode(fighterContainer);
    };

    fightsSection.addEventListener("click", (evt) => {
      if (evt.target.closest(".js-search-result-item")) {
        const currentBtn = evt.target.closest(".js-search-result-item");
        const chosenId = currentBtn.dataset.id;
        handlePokemonChoose(chosenId, currentBtn);
      }
    });
  }
});
