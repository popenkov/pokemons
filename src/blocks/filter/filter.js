import ready from "../../js/utils/documentReady.js";

ready(function () {
  const filterBtn = document.querySelector(".js-mobile-filter-btn");

  if (filterBtn) {
    const filterMenu = document.querySelector(".js-filter-menu");
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
      console.log(evt.target === filterMenu);
      if (evt.target === filterMenu) {
        closeMenu();
      }
    });
  }
});
