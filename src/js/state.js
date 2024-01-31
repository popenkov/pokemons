import { renderPockemonCards } from "../blocks/section-pokemon/renderPokemons";

const initialState = {
  perPage: 12,
  type: "All",
  currentPage: 1,
  totalcount: 1,
};

const handler = {
  set: function (obj, prop, value) {
    if (prop === "perPage") {
      // todo trigger request
      obj.currentPage = 1;
    }
    if (prop === "type") {
      // todo trigger request

      obj.currentPage = 1;
    }
    if (prop === "totalcount") {
      // todo trigger request
      obj[prop] = value;
      return true;
    }

    obj[prop] = value;
    renderPockemonCards();
    return true;
  },
};

export const state = new Proxy(initialState, handler);
