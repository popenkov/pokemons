import { getPockemons } from "../../js/services.js";

const pokemonsSection = document.querySelector(".section-pokemon");
const pokemonsItems = document.querySelector(".js-pokemon-items");

import { BASE_URL } from "../../js/services.js";
import { state } from "../../js/state.js";
import { addScrollPadding } from "../../js/utils/addScrollPadding.js";
import { hideNode, showNode } from "../../js/utils/showNode.js";
import { initPagination } from "../pagination/initPagination.js";

const loader = pokemonsSection.querySelector(".js-pokemon-loader");
const pagination = pokemonsSection.querySelector(".js-pagination");

const showLoader = () => {
  showNode(loader);
  hideNode(pagination);
  hideNode(pokemonsItems);
};

const hideLoader = () => {
  hideNode(loader);
  showNode(pagination);
  showNode(pokemonsItems);
};

const generateTypesHTML = (type) => {
  const typesContainer = document.createElement("div");
  typesContainer.classList.add("p-card__types");
  type.forEach((type) => {
    const typeToLowerCase = type.toLowerCase();
    const html = `<svg class="p-card__type">
                    <use href="./img/svgSprite.svg#type-${typeToLowerCase}"></use>
                  </svg>`;
    typesContainer.insertAdjacentHTML("beforeend", html);
  });
  return typesContainer.innerHTML;
};

const renderPockemonCard = (data) => {
  const {
    type,
    base: { HP: health, Speed: speed, Attack: attack, Defense: defense },
    name: { english: name },
    image,
    collectionId,

    id,
  } = data;

  const imageURL = `${BASE_URL}/api/files/${collectionId}/${id}/${image}`;

  const idValue = id.slice(-3);

  const html = `<div class="section-pokemon__item">
                      <div class="p-card">
                        <div class="p-card__miniature"><span class="p-card__miniature-id">${idValue}</span><img class="p-card__miniature-img" src="${imageURL}
                        " alt="${name}"></div>
                        <div class="p-card__row">
                          <h3 class="p-card__title">${name}</h3>
                          <div class="p-card__types">
                            ${generateTypesHTML(type)}
                          </div>
                        </div>
                        <div class="p-card__features">
                          <div class="p-card__feature"><span class="p-card__feature-icon"><svg class="p-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-health"></use></svg></span><span class="p-card__feature-value">${health}</span></div>
                          <div class="p-card__feature"><span class="p-card__feature-icon"><svg class="p-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-speed"></use></svg></span><span class="p-card__feature-value">${speed}</span></div>
                          <div class="p-card__feature"><span class="p-card__feature-icon"><svg class="p-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-attack"></use></svg></span><span class="p-card__feature-value">${attack}</span></div>
                          <div class="p-card__feature"><span class="p-card__feature-icon"><svg class="p-card__feature-icon-svg"><use href="./img/svgSprite.svg#category-defence"></use></svg></span><span class="p-card__feature-value">${defense}</span></div>
                        </div>
                      </div>
                    </div>`;

  return html;
};

export const renderPockemonCards = async () => {
  showLoader();
  const data = await getPockemons();

  if (!data) {
    return;
  }

  const { totalPages, items } = data;

  state.totalcount = Number(totalPages);

  pokemonsItems.innerHTML = "";
  items.forEach((elem) => {
    pokemonsItems.insertAdjacentHTML("beforeend", renderPockemonCard(elem));
  });
  initPagination(state.currentPage, state.totalcount);
  addScrollPadding();

  setTimeout(() => {
    hideLoader();
  }, 1000);
};
