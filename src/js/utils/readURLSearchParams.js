export const updateURLSearchParams = (currentPage, type, perPage) => {
  const searchParamsObj = new URLSearchParams(window.location.search);
  currentPage && searchParamsObj.set("currentPage", currentPage);
  type && searchParamsObj.set("type", type);
  perPage && searchParamsObj.set("perPage", perPage);
  const newURL = `${window.location.origin}${
    window.location.pathname
  }?${searchParamsObj.toString()}`;

  history.pushState(null, null, newURL);
};

export const readURLSearchParams = () => {
  const searchParamsObj = new URLSearchParams(window.location.search);
  const currentPage = Number(searchParamsObj.get("currentPage"));
  const type = searchParamsObj.get("type");
  const perPage = Number(searchParamsObj.get("perPage"));
  return { currentPage, type, perPage };
};
