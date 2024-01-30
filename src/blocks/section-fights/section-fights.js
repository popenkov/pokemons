// import axios from "axios";
import ready from "../../js/utils/documentReady.js";
import { createSearchResultsItem, getMockResultsHtml } from "./mock-helpers.js";
import { debounce } from "../../js/utils/debounce.js";
import { highlightText } from "../../js/utils/highlightText.js";

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

    // todo шаблон запроса
    // const getSearchData = async (value) => {
    //   try {
    //     const testUrl = "https://jsonplaceholder.typicode.com/posts";
    //     const result = await axios.post(
    //       testUrl,
    //       { q: value },
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       },
    //     );

    //     if (result.data) {
    //       return result.data;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const handleInputSearch = async (evt) => {
      evt.preventDefault();

      const currentInput = evt.target;

      const trimmedValue = currentInput.value.trim();
      const currentSearchContainer = currentInput.closest(".search-field");
      const currentLoader = currentSearchContainer.querySelector(".js-search-loader");
      // todo
      // const currentResults = currentSearchContainer.querySelector(".js-search-results");
      const currentResultsContainer = currentSearchContainer.querySelector(
        ".js-search-results-container",
      );

      if (trimmedValue.length > 0) {
        // todo made for test
        // const result = await getSearchData(value);
        const result = await getMockResultsHtml(searchResultsContainer);

        console.log("result", result);

        if (result) {
          showLoader(currentLoader);
          currentResultsContainer.innerHTML = null;

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
      const currentInput = evt.target;
      const currentSearchContainer = currentInput.closest(".search-field");
      const currentResultsContainer = currentSearchContainer.querySelector(
        ".js-search-results-container",
      );

      handleResultsHide(currentResultsContainer);
      currentInput.value = "";
    };

    searchInputs.forEach((input) => {
      input.addEventListener("input", debounce(handleInputSearch, 500));
      input.addEventListener("blur", handleInputBlur);
      input.addEventListener("focus", () => handleResultsShow(searchResultsWrapper));
    });
  }
});
