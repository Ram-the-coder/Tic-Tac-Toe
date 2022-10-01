function createCellElement(coords, props) {
  const {
    gameState: { board },
    handlers: { handleClick },
  } = props;
  const cell = document.createElement("div");
  setClasslist(cell, ["cell", `marked-${board.getContent(coords)}`]);
  cell.textContent = board.getContent(coords);
  cell.onclick = () => handleClick(coords);
  return cell;
}

function createCellsForRow(rowIdx, props) {
  return createArray({
    length: 3,
    mapper: (_, colIdx) => createCellElement({ i: rowIdx, j: colIdx }, props),
  });
}

function createRowElementWithCells(rowIdx, props) {
  const row = document.createElement("div");
  row.className = "row";
  row.append(...createCellsForRow(rowIdx, props));
  return row;
}

function createRows(props) {
  return createArray({
    length: 3,
    mapper: (_, rowIdx) => createRowElementWithCells(rowIdx, props),
  });
}

function renderBoard(boardElement, gameState, handlers) {
  clearChildren(boardElement);
  boardElement.append(...createRows({ gameState, handlers }));
  if (gameState.isGameOver) boardElement.classList.add("game-over");
  else boardElement.classList.remove("game-over");
}
