import ready from "../../js/utils/documentReady.js";
import { generateFilterMenu } from "./utils.js";

ready(function () {
  const filterBtn = document.querySelector(".js-mobile-filter-button");

  if (filterBtn) {
    const filterMenu = document.querySelector(".js-filter-menu");
    const typesContainer = filterMenu.querySelector(".js-type-filter-container");

    filterBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      filterMenu.classList.toggle("open");
      document.body.classList.toggle("body-lock");
    });

    const closeMenu = () => {
      filterMenu.classList.remove("open");
      document.body.classList.remove("body-lock");
    };

    filterMenu.addEventListener("click", (evt) => {
      if (evt.target === filterMenu) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      closeMenu();
    });

    generateFilterMenu(typesContainer);
  }
});
