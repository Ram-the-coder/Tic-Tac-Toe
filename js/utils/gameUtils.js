function otherPlayer(player) {
  return player === X ? O : X;
}

function isItAIsTurn(gameState) {
  return !gameState.isGameOver && gameState.playerToPlay === O;
}
