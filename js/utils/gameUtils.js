function otherPlayer(player) {
  return player === X ? O : X;
}

function throwIfMoveIsInvalid(gameState, i, j) {
  if (gameState.isGameOver) throw new GameOverError();
  if (gameState.board.getContent({ i, j }) !== EMPTY)
    throw new InvalidMoveError();
}

function isItAIsTurn(gameState) {
  return !gameState.isGameOver && gameState.playerToPlay === O;
}
