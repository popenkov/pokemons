import { state } from "../../js/state.js";
import ready from "../../js/utils/documentReady.js";
import { renderPockemonCards } from "./renderPokemons.js";

ready(function () {
  const pokemonsSection = document.querySelector(".section-pokemon");

  if (pokemonsSection) {
    const loader = pokemonsSection.querySelector(".js-pokemon-loader");
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

    if (state) {
      showLoader();
      renderPockemonCards();
      hideLoader();
    }
  }
});
