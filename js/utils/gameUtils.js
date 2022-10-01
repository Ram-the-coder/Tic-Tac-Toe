function otherPlayer(player) {
  return player === X ? O : X;
}

function throwIfMoveIsInvalid(gameState, cell) {
  if (gameState.isGameOver) throw new GameOverError();
  if (gameState.board.getContent(cell) !== EMPTY)
    throw new InvalidMoveError();
}

function isItAIsTurn(gameState) {
  return !gameState.isGameOver && gameState.playerToPlay === O;
}
