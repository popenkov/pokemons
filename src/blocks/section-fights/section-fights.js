import ready from "../../js/utils/documentReady.js";
import { createSearchResultsItem, generateFighterPockemon } from "./utils.js";
import { debounce } from "../../js/utils/debounce.js";
import { highlightText } from "../../js/utils/highlightText.js";
import { getPockemonById, getPockemonByName } from "../../js/services.js";

ready(function () {
  const fightsSection = document.querySelector(".section-fights");

  if (fightsSection) {
    const searchInputs = fightsSection.querySelectorAll(".js-search-input");
    const searchResultsWrapper = fightsSection.querySelector(".js-search-results");
    const searchResultsContainer = fightsSection.querySelector(".js-search-results-container");

    const handleResultsShow = (resultsContainer) => {
      resultsContainer.classList.remove("hide");
    };
    const handleResultsHide = (resultsContainer) => {
      resultsContainer.classList.add("hide");
    };

    const showLoader = (loader) => {
      loader.classList.remove("hide");
    };

    const hideLoader = (loader) => {
      loader.classList.add("hide");
    };

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
        showLoader(currentLoader);
        currentResultsContainer.innerHTML = null;

        const result = await getPockemonByName(trimmedValue);

        if (result) {
          result.forEach((item) => {
            currentResultsContainer.insertAdjacentHTML("beforeend", createSearchResultsItem(item));
          });
          highlightText(trimmedValue);
          hideLoader(currentLoader);
          handleResultsShow(currentResultsContainer);
        } else {
          handleResultsHide(currentResultsContainer);
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
      // handleResultsHide(currentResultsContainer);
      // currentInput.value = "";
    };

    searchInputs.forEach((input) => {
      input.addEventListener("input", debounce(handleInputSearch, 500));
      input.addEventListener("blur", handleInputBlur);
      input.addEventListener("focus", () => handleResultsShow(searchResultsWrapper));
    });

    const handlePokemonChoose = async (id) => {
      const data = await getPockemonById(id);

      if (data) {
        generateFighterPockemon(data[0]);
      }
    };

    fightsSection.addEventListener("click", (evt) => {
      if (evt.target.closest(".js-search-result-item")) {
        const currentBtn = evt.target.closest(".js-search-result-item");
        const chosenId = currentBtn.dataset.id;
        handlePokemonChoose(chosenId);
      }
    });
  }
});
