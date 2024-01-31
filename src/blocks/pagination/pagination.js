import ready from "../../js/utils/documentReady.js";

ready(function () {
  const paginationBlock = document.querySelector(".pagination");
  if (paginationBlock) {
    const paginationBtns = paginationBlock.querySelector(".js-pagination-btns-wrapper");
    const firstPageBtn = paginationBlock.querySelector(".js-pagination-first");
    const lastPageBtn = paginationBlock.querySelector(".js-pagination-last");

    // todo test amount
    const totalcount = 12;

    let currentPage = 1;
    const BTNS_IN_ROW_AMOUNT = 6;

    const addButton = (number) => {
      return `<button class="pagination__btn js-pagination-btn ${
        Number(number) === currentPage ? "pagination__btn--active" : ""
      }">${number}</button>`;
    };

    const addDots = () => {
      return `<span class="pagination__btn pagination__btn--dots">...</span>`;
    };

    const initPagination = () => {
      let HTML = "";

      if (totalcount <= BTNS_IN_ROW_AMOUNT) {
        for (let i = 1; i <= totalcount; i++) {
          HTML += addButton(i);
        }
      } else {
        // Если текущая страница первая
        // if (currentPage === 1) {
        //   HTML += addButton("1");
        // }

        if (currentPage >= 5 && totalcount > 5) {
          HTML += addDots();
        }

        // Отрисовка точек  "..." если currentPage is > 3
        //  if (currentPage > 1) {
        if (currentPage < 5 && totalcount > 5) {
          // HTML += addDots();
          for (let i = 1; i <= 5; i++) {
            HTML += addButton(i);
          }
        } else {
          // Если выбрана последняя страница
          if (currentPage == totalcount) {
            HTML += addButton(currentPage - 2);
          }

          // отрисовать 2 предыдущую страницу
          if (currentPage > 3) {
            HTML += addButton(currentPage - 2);
          }

          // отрисовать предыдущую страницу
          if (currentPage > 2) {
            HTML += addButton(currentPage - 1);
          }

          //Отрисовать текущую страницу, если она не первая
          if (currentPage != 1 && currentPage != totalcount) {
            HTML += addButton(currentPage);
          }

          // отрисовать следующую страницу
          if (currentPage < totalcount - 1) {
            HTML += addButton(currentPage + 1);
          }

          //отрисовать 2 следующую страницу
          if (currentPage < totalcount - 2) {
            HTML += addButton(currentPage + 2);
          }

          // Если выбрана первая страница
          if (currentPage == 1 && totalcount > 3) {
            HTML += addButton(currentPage + 3);
          }
          if (currentPage == 1 && totalcount > 4) {
            HTML += addButton(currentPage + 4);
          }
        }

        // отрисовка точек "..." если currentPage is < lastPage -2
        if (currentPage < totalcount - 2) {
          HTML += addDots();
        }
      }
      paginationBtns.innerHTML = HTML;
      if (currentPage === 1) {
        firstPageBtn.classList.add("hidden");
      } else {
        firstPageBtn.classList.remove("hidden");
      }

      if (currentPage === totalcount - 1) {
        lastPageBtn.classList.add("hidden");
      } else {
        lastPageBtn.classList.remove("hidden");
      }
    };

    initPagination();

    const handleFirstPageClick = () => {
      currentPage = 1;
      initPagination();
    };

    const handleLastPageClick = () => {
      currentPage = totalcount - 1;
      initPagination();
    };

    const handlePaginationButtonClick = (currentButton) => {
      const currentPageValue = Number(currentButton.textContent);
      currentPage = currentPageValue;
      initPagination();
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

      if (evt.target.closest(".js-pagination-btn")) {
        evt.preventDefault();
        handlePaginationButtonClick(evt.target.closest(".js-pagination-btn"));
      }
    });
  }
});
