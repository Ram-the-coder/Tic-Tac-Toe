const aiMoveEasy = (game) => getRandomMove(game.state.board);

const aiMoveMedium = (game) => getMiddleIfEmptyElseGetRandom(game.state.board);

const aiMoveHard = (game) => {
  const { board, playerToPlay } = game.state;

  const winningMove = getWinningMove(board, playerToPlay);
  if (winningMove) return winningMove;

  const moveToAvoidLoss = getWinningMove(board, otherPlayer(playerToPlay));
  if (moveToAvoidLoss) return moveToAvoidLoss;

  return getMiddleIfEmptyElseGetRandom(board);
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
