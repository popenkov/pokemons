import ready from "../../js/utils/documentReady.js";

ready(function () {
  const hostHero = document.querySelector(".hero");

  if (hostHero) {
    const heroTrigger = hostHero.querySelectorAll(".hero__js-trigger");
    heroTrigger.forEach((element) => {
      element.addEventListener("click", () => {
        alert("JS works!");
      });
    });
  }
});
