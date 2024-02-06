import { getMenuData } from "../../js/services.js";
import { state } from "../../js/state.js";
import { TIMEOUT_VALUE } from "../../js/utils/constants.js";
import ready from "../../js/utils/documentReady.js";
import { hideNode, showNode } from "../../js/utils/showNode.js";
import { createFilterItem, createFirstFilterItem } from "./createFilterItem.js";

ready(function () {
  const filterBtn = document.querySelector(".js-mobile-filter-button");

  if (filterBtn) {
    const filterMenu = document.querySelector(".js-filter-menu");
    const typesContainer = filterMenu.querySelector(".js-type-filter-container");
    const petPageBtns = filterMenu.querySelectorAll(".js-per-page-button");
    const filterItemsContainer = filterMenu.querySelector(".js-filter-menu-items");
    const filterSkeletonContainer = filterMenu.querySelector(".js-filter-skeleton");

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

    const selectActiveTypeMenu = (type) => {
      const allTypesBtns = filterMenu.querySelectorAll(".js-type-button");
      allTypesBtns.forEach((button) => {
        button.dataset.type === type
          ? button.classList.add("filter__button--active")
          : button.classList.remove("filter__button--active");
      });
      closeMenu();
    };

    const selectActivePageMenu = (page) => {
      petPageBtns.forEach((button) => {
        button.dataset.perpage === page
          ? button.classList.add("filter__button--active")
          : button.classList.remove("filter__button--active");
      });
      closeMenu();
    };

    const getData = async () => {
      const filterData = await getMenuData();
      return filterData;
    };

    const generateFilterMenu = async (container) => {
      const filterData = await getData();

      container.innerHTML = "";

      const totalAmount = state.totalitems;

      if (filterData) {
        createFirstFilterItem;
        container.insertAdjacentHTML("beforeend", createFirstFilterItem(totalAmount));
        filterData.forEach((elem) => {
          container.insertAdjacentHTML("beforeend", createFilterItem(elem));
        });

        setTimeout(() => {
          hideNode(filterSkeletonContainer);
          showNode(filterItemsContainer);
        }, TIMEOUT_VALUE);
      }
    };

    let isFirstLoad = true;

    document.addEventListener("itemsrendered", function () {
      if (!isFirstLoad) {
        return;
      }

      generateFilterMenu(typesContainer);

      isFirstLoad = false;
    });

    document.addEventListener("click", (evt) => {
      if (evt.target.closest(".js-type-button")) {
        const currentBtn = evt.target.closest(".js-type-button");
        const currentType = currentBtn.dataset.type;
        state.type = currentType;
        selectActiveTypeMenu(currentType);
      }
      if (evt.target.closest(".js-per-page-button")) {
        const currentBtn = evt.target.closest(".js-per-page-button");
        const perPageValue = currentBtn.dataset.perpage;
        state.perPage = perPageValue;
        selectActivePageMenu(perPageValue);
      }
    });
  }
});
