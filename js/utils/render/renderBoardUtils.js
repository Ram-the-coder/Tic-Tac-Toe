function createCellsForRow(i, props) {
  const {
    gameState: { board },
    handlers: { handleClick },
  } = props;
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const coords = { i, j };
    const cell = document.createElement("div");
    setClasslist(cell, ["cell", `marked-${board.getContent(coords)}`]);
    cell.textContent = board.getContent(coords);
    cell.onclick = () => handleClick(coords);
    cells.push(cell);
  }
  return cells;
}

function createRows(props) {
  const rows = [];
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.append(...createCellsForRow(i, props));
    rows.push(row);
  }
  return rows;
}

function renderBoard(boardElement, gameState, handlers) {
  clearChildren(boardElement);
  boardElement.append(...createRows({ gameState, handlers }));
  if (gameState.isGameOver) boardElement.classList.add("game-over");
  else boardElement.classList.remove("game-over");
}
