import { state } from "../../js/state.js";
import ready from "../../js/utils/documentReady.js";
import { renderPockemonCards } from "./renderPokemons.js";

ready(function () {
  const pokemonsSection = document.querySelector(".section-pokemon");

  if (pokemonsSection && state) {
    renderPockemonCards();
    const event = new Event("itemsrendered", { bubbles: true });
    document.dispatchEvent(event);
  }
});
