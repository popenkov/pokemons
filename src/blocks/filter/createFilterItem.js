import { state } from "../../js/state";

export const createFirstFilterItem = (totalAmount) => {
  const isActive = state.type === "All" ? "filter__button--active" : "";
  return `<button class="filter__button filter__button--type js-type-button ${isActive}" data-type='All'><svg class="filter__button-icon">
            <use href="./img/svgSprite.svg#type-all"></use>
          </svg><span class="filter__button-value">All</span><span class="filter__button-amount">${totalAmount}</span></button>`;
};

export const createFilterItem = (data) => {
  const {
    amount,
    name: { english: name },
  } = data;
  const lowerCaseName = name.toLowerCase();
  const isActive = state.type === name ? "filter__button--active" : "";
  return `<button class="filter__button filter__button--type js-type-button ${isActive}" data-type='${name}'><svg class="filter__button-icon">
            <use href="./img/svgSprite.svg#type-${lowerCaseName}"></use>
          </svg><span class="filter__button-value">${name}</span><span class="filter__button-amount">${amount}</span></button>`;
};
