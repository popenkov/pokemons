export const highlightText = (input) => {
  const texts = document.querySelectorAll(".js-highlight-text");
  const inputValue = input;
  texts &&
    texts.forEach((item) => {
      let highlightedText = item.innerHTML
        .replaceAll(/<span class="highlight">(.*?)/ < /span>/gi, "$1")
        .replaceAll(inputValue, '<span class="highlight">' + inputValue + "</span>")
        .replaceAll(
          inputValue[0].toUpperCase() + inputValue.substring(1),
          '<span class="highlight">' +
            inputValue[0].toUpperCase() +
            inputValue.substring(1) +
            "</span>",
        );

      item.innerHTML = highlightedText;
    });
};
