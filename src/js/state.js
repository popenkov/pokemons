import { initPagination } from "../blocks/pagination/initPagination";
import { renderPockemonCards } from "../blocks/section-pokemon/renderPokemons";
import { readURLSearchParams, updateURLSearchParams } from "./utils/readURLSearchParams";
import { scrollToTop } from "./utils/scrollToTop";

const { perPage, type, currentPage } = readURLSearchParams();

const initialState = {
  perPage: perPage || 12,
  type: type || "All",
  currentPage: currentPage || 1,
  totalcount: 1,
  totalitems: "",
};

const handler = {
  set: function (obj, prop, value) {
    if (prop === "totalitems") {
      obj[prop] = value;
      return true;
    }
    if (prop === "perPage") {
      obj.currentPage = 1;
      updateURLSearchParams(obj.currentPage, obj.type, value);
    }
    if (prop === "type") {
      obj.currentPage = 1;
      updateURLSearchParams(obj.currentPage, value, obj.perPage);
    }
    if (prop === "totalcount") {
      obj[prop] = value;
      return true;
    }
    if (prop === "currentPage") {
      updateURLSearchParams(value, obj.type, obj.perPage);
      initPagination(state.currentPage, state.totalcount);
    }

    obj[prop] = value;
    scrollToTop();
    renderPockemonCards();
    return true;
  },
};

export const state = new Proxy(initialState, handler);
