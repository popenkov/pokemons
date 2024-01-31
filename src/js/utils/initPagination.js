const BTNS_IN_ROW_AMOUNT = 6;

const paginationBlock = document.querySelector(".pagination");
const paginationBtns = paginationBlock.querySelector(".js-pagination-buttons-wrapper");
const firstPageBtn = paginationBlock.querySelector(".js-pagination-first");
const lastPageBtn = paginationBlock.querySelector(".js-pagination-last");

const addButton = (number, currentPage) => {
  return `<button class="pagination__button js-pagination-button ${
    Number(number) === currentPage ? "pagination__button--active" : ""
  }">${number}</button>`;
};

const addDots = () => {
  return `<span class="pagination__button pagination__dots">...</span>`;
};

export const initPagination = (currentPage, totalcount) => {
  let HTML = "";

  if (totalcount <= BTNS_IN_ROW_AMOUNT) {
    for (let i = 1; i <= totalcount; i++) {
      HTML += addButton(i, currentPage);
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
        HTML += addButton(i, currentPage);
      }
    } else {
      // Если выбрана последняя страница
      if (currentPage == totalcount) {
        HTML += addButton(currentPage - 2, currentPage);
      }

      //
      if (currentPage == totalcount - 1 && currentPage > 6) {
        HTML += addButton(currentPage - 4, currentPage);
      }

      // отрисовать 4 предыдущую страницу
      if (currentPage == totalcount - 2 && currentPage > 5) {
        HTML += addButton(currentPage - 4, currentPage);
      }

      // отрисовать 3 предыдущую страницу
      if (currentPage == totalcount - 1 && currentPage > 4) {
        HTML += addButton(currentPage - 3, currentPage);
      }

      //

      // отрисовать 2 предыдущую страницу
      if (currentPage > 3) {
        HTML += addButton(currentPage - 2, currentPage);
      }

      // отрисовать предыдущую страницу
      if (currentPage > 2) {
        HTML += addButton(currentPage - 1, currentPage);
      }

      //Отрисовать текущую страницу, если она не первая
      if (currentPage != 1 && currentPage != totalcount) {
        HTML += addButton(currentPage, currentPage);
      }

      // отрисовать следующую страницу
      if (currentPage < totalcount - 1) {
        HTML += addButton(currentPage + 1, currentPage);
      }

      //отрисовать 2 следующую страницу
      if (currentPage < totalcount - 2) {
        HTML += addButton(currentPage + 2, currentPage);
      }

      // Если выбрана первая страница
      if (currentPage == 1 && totalcount > 3) {
        HTML += addButton(currentPage + 3, currentPage);
      }
      if (currentPage == 1 && totalcount > 4) {
        HTML += addButton(currentPage + 4, currentPage);
      }
    }

    // отрисовка точек "..." если currentPage is < lastPage -2
    // console.log(currentPage < totalcount - 2, currentPage, totalcount - 2);
    // todo if (currentPage <= totalcount - 2) {
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
