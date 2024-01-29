import axios from "axios";
import ready from "../../js/utils/documentReady.js";
import { getMockResultsHtml } from "./mock-helpers.js";
import { debounce } from "../../js/utils/debounce.js";

ready(function () {
  const searchInputs = document.querySelectorAll(".js-search-input");
  const searchResultsWrapper = document.querySelector(".js-search-results");
  const searchResultsContainer = document.querySelector(".js-search-results-container");

  const handleResultsShow = (searchResultsContainer) => {
    searchResultsContainer?.classList.remove("hide");
  };
  const handleResultsHide = (container) => {
    container?.classList.add("hide");
  };

  // todo шаблон запроса
  const getSearchData = async (value) => {
    try {
      const testUrl = "https://jsonplaceholder.typicode.com/posts";
      const result = await axios.post(
        testUrl,
        { q: value },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (result.data) {
        return result.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputSearch = async (evt) => {
    evt.preventDefault();

    const value = evt.target.value;

    if (value.trim().length > 0) {
      const result = await getSearchData(value);
      if (result) {
        searchResultsContainer.innerHTML = null;
        // todo made for test
        getMockResultsHtml(searchResultsContainer);

        handleResultsShow(searchResultsWrapper);
      } else {
        handleResultsHide(searchResultsWrapper);
      }
    } else {
      searchResultsContainer.innerHTML = null;
    }
  };

  const handleInputBlur = () => {
    handleResultsHide(searchResultsWrapper);
  };

  searchInputs.forEach((input) => {
    input.addEventListener("input", debounce(handleInputSearch, 500));
    input.addEventListener("blur", handleInputBlur);
    input.addEventListener("focus", () => handleResultsShow(searchResultsWrapper));
  });
});
