const HTML_ELEMENT = {
  BOARD: "board",
  INFO: "info",
  DIFFICULTY_SELECTOR: "difficulty",
};
const getElement = (el) =>
  ({
    [HTML_ELEMENT.BOARD]: () => document.querySelector(".board"),
    [HTML_ELEMENT.INFO]: () => document.querySelector(".info"),
    [HTML_ELEMENT.DIFFICULTY_SELECTOR]: () => document.querySelector("select"),
  }[el]());

function renderInfo(infoElement, gameState) {
  const { isGameOver, winner, playerToPlay } = gameState;
  infoElement.textContent = (() => {
    if (!isGameOver) return `${playerToPlay}'s Turn`;
    if (winner) return `${winner} Won!`;
    return `Draw`;
  })();
}

function setDifficultyControlElementValue(value) {
  getElement(HTML_ELEMENT.DIFFICULTY_SELECTOR).value = value;
}

function render(gameState, handlers) {
  console.log(gameState);
  renderInfo(getElement(HTML_ELEMENT.INFO), gameState);
  renderBoard(getElement(HTML_ELEMENT.BOARD), gameState, handlers);
}
