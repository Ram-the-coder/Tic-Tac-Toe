function renderBoard(gameState, { handleClick }) {
  const { board, isGameOver } = gameState;
  const boardElement = document.querySelector(".board");
  boardElement.textContent = "";
  if (isGameOver) boardElement.classList.add("game-over");
  else boardElement.classList.remove("game-over");
  const rows = createArray({
    length: 3,
    mapper: (_, i) => {
      const row = document.createElement("div");
      row.className = "row";
      const cells = createArray({
        length: 3,
        mapper: (_, j) => {
          const content = board.getContent({ i, j });
          const cell = document.createElement("div");
          ["cell", `marked-${content}`].forEach((className) =>
            cell.classList.add(className)
          );
          cell.textContent = content;
          cell.onclick = () => handleClick(i, j);
          return cell;
        },
      });
      row.append(...cells);
      return row;
    },
  });
  boardElement.append(...rows);
}

function renderInfo(gameState) {
  const infoElement = document.querySelector(".info");
  const { isGameOver, winner, playerToPlay } = gameState;
  infoElement.textContent = (() => {
    if (!isGameOver) return `${playerToPlay}'s Turn`;
    if (winner) return `${winner} Won!`;
    return `Draw`;
  })();
}

function render(gameState, { handleClick }) {
  console.log(gameState);
  renderInfo(gameState);
  renderBoard(gameState, { handleClick });
}
