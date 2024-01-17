import ready from "../../js/utils/documentReady.js";
import openNav from "../../js/common/openNav.js";

ready(function () {
  // close nav
  const navTitles = document.querySelectorAll(".nav__section-title");
  const navLinks = document.querySelectorAll(".nav__link");

  [...navTitles, ...navLinks].forEach((item) => {
    item.addEventListener("click", openNav);
  });
});
