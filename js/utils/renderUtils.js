const HTML_ELEMENT = {
  BOARD: "board",
  INFO: "info",
  DIFFICULTY_SELECTOR: "difficulty",
};
const getElement = (el) =>
  ({
    [HTML_ELEMENT.BOARD]: () => document.querySelector(".board"),
    [HTML_ELEMENT.INFO]: () => document.querySelector(".info"),
    [HTML_ELEMENT.DIFFICULTY_SELECTOR]: () => document.querySelector(".info"),
  }[el]());

function clearChildren(element) {
  element.textContent = "";
}

function setClasslist(el, classes) {
  classes.forEach(className => el.classList.add(className));
}

function renderRows() {

}

function renderBoard(gameState, handlers) {
  const { board, isGameOver } = gameState;
  const { handleClick } = handlers;

  function createCellElement(coords) {
    const cell = document.createElement("div");
    setClasslist(cell, ["cell", `marked-${board.getContent(coords)}`]);
    cell.textContent = board.getContent(coords);
    cell.onclick = () => handleClick(coords);
    return cell;
  }

  function getRowCells(rowIdx) {
    return createArray({
      length: 3,
      mapper: (_, colIdx) => createCellElement({ i: rowIdx, j: colIdx }),
    });
  }

  function createRowElementWithCells(rowIdx) {
    const row = document.createElement("div");
    row.className = "row";
    row.append(...getRowCells(rowIdx));
    return row;
  }

  function getBoardRows() {
    return createArray({
      length: 3,
      mapper: (_, rowIdx) => createRowElementWithCells(rowIdx),
    });
  }

  const boardElement = getElement(HTML_ELEMENT.BOARD);
  clearChildren(boardElement);
  boardElement.append(...getBoardRows());
  if (isGameOver) boardElement.classList.add("game-over");
  else boardElement.classList.remove("game-over");
}

function renderInfo(gameState) {
  const { isGameOver, winner, playerToPlay } = gameState;
  getElement(HTML_ELEMENT.INFO).textContent = (() => {
    if (!isGameOver) return `${playerToPlay}'s Turn`;
    if (winner) return `${winner} Won!`;
    return `Draw`;
  })();
}

function setDifficultyControlElementValue(value) {
  getElement(HTML_ELEMENT.INFO).value = value;
}

function render(gameState, handlers) {
  console.log(gameState);
  renderInfo(gameState);
  renderBoard(gameState, handlers);
}
