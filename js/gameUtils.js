function getWinner(board) {
  return [X, O].filter((player) =>
    WIN_PATTERNS.some((pattern) =>
      pattern.every(({ i, j }) => board[i][j] === player)
    )
  )[0];
}

function isDraw(board) {
  return board.flat().every((cell) => cell != EMPTY);
}

function otherPlayer(player) {
  return player === X ? O : X;
}

function throwIfMoveIsInvalid(gameState, i, j) {
  if (gameState.isGameOver) throw new GameOverError();
  if (gameState.board[i][j] !== EMPTY) throw new InvalidMoveError();
}

function getBoardAfterMove(board, player, i, j) {
  return board.map((row, rowIndex) =>
    rowIndex === i
      ? row.map((cell, colIndex) => (colIndex === j ? player : cell))
      : row
  );
}

function getEmptyCellCoordinates(board) {
  return board
    .map((row, i) =>
      row
        .map((cell, j) => ({ i, j, cell }))
        .filter(({ cell }) => cell === EMPTY)
    )
    .flat();
}
function getRandomEmptyCell(board) {
  const emptyCells = getEmptyCellCoordinates(board);
  cellIdx = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[cellIdx];
}

function getTheMoveToCompleteThePattern(board, pattern) {
  return pattern.filter(({ i, j }) => board[i][j] === EMPTY)[0];
}

function getWinningPattern(board, forPlayer) {
  return WIN_PATTERNS.filter(
    (pattern) =>
      pattern.filter(({ i, j }) => board[i][j] === forPlayer).length === 2 &&
      getTheMoveToCompleteThePattern(board, pattern)
  )[0];
}

function getRandomMove(board) {
  const emptyCell = getRandomEmptyCell(board);
  if (!emptyCell) throw new NoMovesError();
  return emptyCell;
}

function getMiddle() {
  return { i: 1, j: 1 };
}

function getMiddleIfEmptyElseGetRandom(board) {
  const middle = getMiddle(board);
  return board[middle.i][middle.j] === EMPTY ? middle : getRandomMove(board);
}

function getWinningMove(board, forPlayer) {
  const winningPattern = getWinningPattern(board, forPlayer);
  return (
    winningPattern && getTheMoveToCompleteThePattern(board, winningPattern)
  );
}

function isItAIsTurn(gameState) {
  return (!gameState.isGameOver && gameState.playerToPlay === O)
}