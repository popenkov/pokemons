import { state } from "../../js/state.js";
import ready from "../../js/utils/documentReady.js";

ready(function () {
  const paginationBlock = document.querySelector(".pagination");
  if (paginationBlock) {
    const handleFirstPageClick = () => {
      state.currentPage = 1;
    };

    const handleLastPageClick = () => {
      console.log("handleLastPageClick", state.totalcount);
      // state.currentPage = state.totalcount - 1;
      state.currentPage = state.totalcount;
    };

    const handlePaginationButtonClick = (currentButton) => {
      const currentPageValue = Number(currentButton.textContent);
      state.currentPage = currentPageValue;
    };

    paginationBlock.addEventListener("click", (evt) => {
      evt.stopPropagation();
      if (evt.target.closest(".js-pagination-first")) {
        evt.preventDefault();
        handleFirstPageClick();
      }
      if (evt.target.closest(".js-pagination-last")) {
        evt.preventDefault();
        handleLastPageClick();
      }

      if (evt.target.closest(".js-pagination-button")) {
        evt.preventDefault();
        handlePaginationButtonClick(evt.target.closest(".js-pagination-button"));
      }
    });
  }
});
