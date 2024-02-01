const BTNS_IN_ROW_AMOUNT = 5;

const paginationBlock = document.querySelector(".pagination");
const buttonsContainer = paginationBlock.querySelector(".js-pagination-buttons-wrapper");
const firstBtn = paginationBlock.querySelector(".js-pagination-first");
const lastBtn = paginationBlock.querySelector(".js-pagination-last");

const updateButtons = (currentPage, totalPages) => {
  if (currentPage === 1) {
    firstBtn.classList.add("hidden");
  } else {
    firstBtn.classList.remove("hidden");
  }
  if (currentPage === totalPages) {
    lastBtn.classList.add("hidden");
  } else {
    lastBtn.classList.remove("hidden");
  }
};

const addDots = () => {
  const dots = document.createElement("span");
  dots.classList.add("pagination__dots");
  dots.textContent = "...";
  return dots;
};

const addButton = (number, currentPage) => {
  const button = document.createElement("button");
  button.textContent = number;
  button.classList.add("pagination__button", "js-pagination-button");
  if (number === currentPage) {
    button.classList.add("pagination__button--active");
  }
  return button;
};

function createButtons(currentPage, totalPages) {
  buttonsContainer.innerHTML = "";
  let startPage = currentPage - Math.floor(BTNS_IN_ROW_AMOUNT / 2);
  let endPage = currentPage + Math.floor(BTNS_IN_ROW_AMOUNT / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = BTNS_IN_ROW_AMOUNT;
  }

  if (endPage > totalPages) {
    startPage = totalPages > BTNS_IN_ROW_AMOUNT ? totalPages - BTNS_IN_ROW_AMOUNT + 1 : 1;
    endPage = totalPages;
  }

  console.log(currentPage, startPage, endPage);

  for (let i = startPage; i <= endPage; i++) {
    buttonsContainer.appendChild(addButton(i, currentPage));
  }

  if (startPage > 1) {
    buttonsContainer.prepend(addDots());
  }
  if (endPage < totalPages) {
    buttonsContainer.append(addDots());
  }
}

export const initPagination = (currentPage, totalPages) => {
  updateButtons(currentPage, totalPages);
  createButtons(currentPage, totalPages);
};
