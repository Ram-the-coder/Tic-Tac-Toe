const aiMoveEasy = (game) => {
  const { i, j } = getRandomMove(game.state.board, game.makeMove);
  game.makeMove(i, j)
}

const aiMoveMedium = (game) =>
  selectMiddleIfPossibleElseSelectRandom(game.state.board, game.makeMove);

const aiMoveHard = (game) => {
  const { board, playerToPlay } = game.state;

  const winningMove = getWinningMove(board, playerToPlay);
  if (winningMove) return game.makeMove(winningMove.i, winningMove.j);

  const moveToAvoidLoss = getWinningMove(board, otherPlayer(playerToPlay));
  if (moveToAvoidLoss)
    return game.makeMove(moveToAvoidLoss.i, moveToAvoidLoss.j);

  return selectMiddleIfPossibleElseSelectRandom(board, game.makeMove);
};

function aiMove(game) {
  switch (game.state.difficulty) {
    case DIFFICULTY.EASY:
      return aiMoveEasy(game);
    case DIFFICULTY.MEDIUM:
      return aiMoveMedium(game);
    case DIFFICULTY.HARD:
      return aiMoveHard(game);
    default:
      throw new Error("Invalid Difficulty");
  }
}
