import { initPagination } from "../blocks/pagination/initPagination";
import { renderPockemonCards } from "../blocks/section-pokemon/renderPokemons";
import { scrollToTop } from "./utils/scrollToTop";

const initialState = {
  perPage: 12,
  type: "All",
  currentPage: 1,
  totalcount: 1,
};

const handler = {
  set: function (obj, prop, value) {
    if (prop === "perPage") {
      obj.currentPage = 1;
    }
    if (prop === "type") {
      obj.currentPage = 1;
    }
    if (prop === "totalcount") {
      obj[prop] = value;
      return true;
    }

    if (prop === "currentPage") {
      initPagination(state.currentPage, state.totalcount);
    }

    obj[prop] = value;
    scrollToTop();
    renderPockemonCards();
    return true;
  },
};

export const state = new Proxy(initialState, handler);
