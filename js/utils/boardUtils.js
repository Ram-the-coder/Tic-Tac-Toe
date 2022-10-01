function getEmptyCells(board) {
  return board.cells.filter(({ content }) => content === EMPTY);
}
function getRandomEmptyCell(board) {
  const emptyCells = getEmptyCells(board);
  return getRandomElementFromArray(emptyCells);
}

function getTheMoveToCompleteThePattern(board, pattern) {
  return pattern.filter((coords) => board.getContent(coords) === EMPTY)[0];
}

function getWinningPattern(board, forPlayer) {
  return WIN_PATTERNS.filter(
    (pattern) =>
      pattern.filter((coords) => board.getContent(coords) === forPlayer)
        .length === 2 && getTheMoveToCompleteThePattern(board, pattern)
  )[0];
}

function getRandomMove(board) {
  const emptyCell = getRandomEmptyCell(board);
  if (!emptyCell) throw new NoMovesError();
  return emptyCell;
}

function getMiddleIfEmptyElseGetRandom(board) {
  const { middle } = board;
  return board.middle.content === EMPTY ? middle : getRandomMove(board);
}

function getWinningMove(board, forPlayer) {
  const winningPattern = getWinningPattern(board, forPlayer);
  return (
    winningPattern && getTheMoveToCompleteThePattern(board, winningPattern)
  );
}
