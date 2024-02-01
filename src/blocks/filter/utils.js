export const createFilterItem = (data, index) => {
  const {
    amount,
    name: { english: name },
  } = data;

  const lowerCaseName = name.toLowerCase();
  const isActive = index === 0 ? "filter__button--active" : "";

  const nameValue = name === "Normal" ? "All " : name;

  return `<button class="filter__button filter__button--type js-type-button ${isActive}" data-type='${name}'><svg class="filter__button-icon">
            <use href="./img/svgSprite.svg#type-${lowerCaseName}"></use>
          </svg><span class="filter__button-value">${nameValue}</span><span class="filter__button-amount">${amount}</span></button>`;
};
