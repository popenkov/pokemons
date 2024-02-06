import { BASE_URL } from "../../js/services.js";

export const createSearchResultsItem = (itemData) => {
  const {
    image,
    id,
    collectionId,
    name: { english: name },
  } = itemData;

  const idValue = id.slice(-3);

  const imageURL = `${BASE_URL}/api/files/${collectionId}/${id}/${image}?thumb=Wx0`;
  return `<button class="search-field__results-item js-search-result-item" data-id=${id}
            ><img class="search-field__results-item-img" src="${imageURL}"
              alt="#" />
            <p class="search-field__results-item-title js-highlight-text">${idValue} — ${name}</p>
          </button>`;
};

const generateWeeknessesHTML = (weak) => {
  const weaknessContainer = document.createElement("span");
  weaknessContainer.classList.add("fighter-card__feature-value");
  weak.forEach((type) => {
    const typeToLowerCase = type.toLowerCase();
    const html = `<svg class="fighter-card__feature-icon-svg">
                    <use href="./img/svgSprite.svg#type-${typeToLowerCase}"></use>
                  </svg>`;
    weaknessContainer.insertAdjacentHTML("beforeend", html);
  });

  return weaknessContainer.outerHTML;
};

const generateTypesHTML = (type) => {
  const typesContainer = document.createElement("span");
  type.forEach((type) => {
    const typeToLowerCase = type.toLowerCase();
    const html = `
    <svg class="fighter-card__type">
      <use href="./img/svgSprite.svg#type-${typeToLowerCase}"></use>
    </svg>`;
    typesContainer.insertAdjacentHTML("beforeend", html);
  });
  return typesContainer.innerHTML;
};

export const generateFighterPockemon = (itemData) => {
  const {
    image,
    id,
    collectionId,
    base: { HP: health, Speed: speed, Attack: attack, Defense: defense },
    name: { english: name },
    abilities,
    weakness,
    type,
    weight,
    height,
  } = itemData;

  const imageURL = `${BASE_URL}/api/files/${collectionId}/${id}/${image}`;
  const abilitiesValue = abilities.join(", ");

  const idValue = id.slice(-3);

  return `
    <div class="fighter-card" data-name='${name}' data-weakness=${weakness} data-types=${type}>
      <div class="fighter-card__miniature"><span class="fighter-card__id">${idValue}</span><img class="fighter-card__miniature-img" src="${imageURL}" alt="${name}"></div>
      <div class="fighter-card__row">
        <h3 class="fighter-card__title">${name}</h3>
        <div class="fighter-card__types">
          ${generateTypesHTML(type)}
        </div>
      </div>
      <div class="fighter-card__features">
        <div class="fighter-card__feature"><span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-health"></use></svg></span><span class="fighter-card__feature-value">${health}</span></div>
        <div class="fighter-card__feature"><span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-attack"></use></svg></span><span class="fighter-card__feature-value">${attack}</span></div>
        <div class="fighter-card__feature"><span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-speed"></use></svg></span><span class="fighter-card__feature-value">${speed}</span></div>
        <div class="fighter-card__feature"><span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-defence"></use></svg></span><span class="fighter-card__feature-value">${defense}</span></div>
        <div class="fighter-card__feature"><span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-weight"></use></svg></span><span class="fighter-card__feature-value">${weight}</span></div>
        <div class="fighter-card__feature"><span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-height"></use></svg></span><span class="fighter-card__feature-value">${height}</span></div>

        <div class="fighter-card__feature fighter-card__feature--full-width">
          <span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-weakness"></use></svg></span>
          ${generateWeeknessesHTML(weakness)}
        </div>

        <div class="fighter-card__feature fighter-card__feature--full-width">
        <span class="fighter-card__feature-icon"><svg class="fighter-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-strength"></use></svg></span>
        <span class="fighter-card__feature-value">${abilitiesValue}</span>
        </div>
      </div>
    </div>
  `;
};
