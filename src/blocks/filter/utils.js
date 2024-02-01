export const createFirstFilterItem = (totalAmount) => {
  return `<button class="filter__button filter__button--type js-type-button filter__button--active" data-type='all'><svg class="filter__button-icon">
            <use href="./img/svgSprite.svg#type-all"></use>
          </svg><span class="filter__button-value">All</span><span class="filter__button-amount">${totalAmount}</span></button>`;
};

export const createFilterItem = (data) => {
  const {
    amount,
    name: { english: name },
  } = data;

  const lowerCaseName = name.toLowerCase();

  return `<button class="filter__button filter__button--type js-type-button" data-type='${name}'><svg class="filter__button-icon">
            <use href="./img/svgSprite.svg#type-${lowerCaseName}"></use>
          </svg><span class="filter__button-value">${name}</span><span class="filter__button-amount">${amount}</span></button>`;
};
