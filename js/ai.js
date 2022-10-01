const aiMoveEasy = ({ board }) => getRandomMove(board);

const aiMoveMedium = ({ board }) => getMiddleIfEmptyElseGetRandom(board);

const aiMoveHard = ({ board, playerToPlay }) => {
  const winningMove = getWinningMove(board, playerToPlay);
  if (winningMove) return winningMove;

  const moveToAvoidLoss = getWinningMove(board, otherPlayer(playerToPlay));
  if (moveToAvoidLoss) return moveToAvoidLoss;

  return getMiddleIfEmptyElseGetRandom(board);
};

function aiMove(gameState) {
  switch (gameState.difficulty) {
    case DIFFICULTY.EASY:
      return aiMoveEasy(gameState);
    case DIFFICULTY.MEDIUM:
      return aiMoveMedium(gameState);
    case DIFFICULTY.HARD:
      return aiMoveHard(gameState);
    default:
      throw new Error("Invalid Difficulty");
  }
}
