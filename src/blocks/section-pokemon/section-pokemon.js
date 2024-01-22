import ready from "../../js/utils/documentReady.js";

ready(function () {
  const pokemonsSection = document.querySelector(".section-pokemon");

  if (pokemonsSection) {
    const loader = pokemonsSection.querySelector(".js-loader");
    const pagination = pokemonsSection.querySelector(".js-pagination");
    const pokemonsItems = pokemonsSection.querySelector(".js-pokemon-items");

    const showLoader = () => {
      loader.classList.remove("hidden");
      pagination.classList.add("hidden");
      pokemonsItems.classList.add("hidden");
    };

    const hideLoader = () => {
      loader.classList.add("hidden");
      pagination.classList.remove("hidden");
      pokemonsItems.classList.remove("hidden");
    };

    //  todo test

    const testShowLoader = () => {
      showLoader();
      setTimeout(() => {
        hideLoader();
      }, 2000);
    };

    testShowLoader();
  }
});
