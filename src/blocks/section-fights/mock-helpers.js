const SEARCH_MOCK_DATA = [
  {
    img: "/",
    title: "Bulbasaur",
  },
  {
    img: "",
    title: "Ivysaur",
  },
  {
    img: "",
    title: "Venusaur",
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

const createSearchResultsItem = (itemData) => {
  const { img, title } = itemData;
  return `<button class="search-field__results-item"
            href="/search.html"><img class="search-field__results-item-img" src="${img}"
              alt="#" />
            <p class="search-field__results-item-title js-highlight-text">${title}</p>
          </button>`;
};

export const getMockResultsHtml = (container) => {
  const data = generateRandomData();
  data.forEach((item) => {
    container.insertAdjacentHTML("beforeend", createSearchResultsItem(item));
  });
};
