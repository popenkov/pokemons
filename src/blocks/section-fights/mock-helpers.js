const SEARCH_MOCK_DATA = [
  {
    img: "./img/preview.png",
    title: "001 — Bulbasaur",
  },
  {
    img: "./img/preview.png",
    title: "002 — Ivysaur",
  },
  {
    img: "./img/preview.png",
    title: "003 — Venusaur",
  },
  {
    img: "./img/preview.png",
    title: "001 — Bulbasaur",
  },
  {
    img: "./img/preview.png",
    title: "002 — Ivysaur",
  },
  {
    img: "./img/preview.png",
    title: "003 — Venusaur",
  },
  {
    img: "./img/preview.png",
    title: "001 — Bulbasaur",
  },
  {
    img: "./img/preview.png",
    title: "002 — Ivysaur",
  },
  {
    img: "./img/preview.png",
    title: "003 — Venusaur",
  },
];

const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomData = () => {
  const maxValue = SEARCH_MOCK_DATA.length;
  const randomLengthValue = getRandomNumberInRange(0, maxValue);
  return SEARCH_MOCK_DATA.slice(0, randomLengthValue);
};

export const createSearchResultsItem = (itemData) => {
  const { img, title } = itemData;
  return `<button class="search-field__results-item js-search-result-item"
            ><img class="search-field__results-item-img" src="${img}"
              alt="#" />
            <p class="search-field__results-item-title js-highlight-text">${title}</p>
          </button>`;
};

export const getMockResultsHtml = async () => {
  const data = generateRandomData();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return data;
};
