function handleClick(coords) {
  try {
    window.game.makeMove(coords);
  } catch (e) {
    if (oneOfError(e, [InvalidMoveError, GameOverError, NoMovesError])) return;
    else throw e;
  }
}

function isValidDifficulty(difficulty) {
  return Object.values(DIFFICULTY).includes(difficulty);
}

function updateDifficulty(value) {
  if (!isValidDifficulty(value)) return;
  window.game.updateState({ difficulty: value });
  localStorage.setItem(LOCAL_STORAGE_KEYS.DIFFICULTY, value);
  console.log(`Difficulty set to ${value}`);
}

function initializeDifficulty() {
  const difficulty =
    localStorage.getItem(LOCAL_STORAGE_KEYS.DIFFICULTY) || DIFFICULTY.EASY;
  updateDifficulty(difficulty);
  setDifficultyControlElementValue(difficulty);
}

function startNewGame() {
  window.game = createNewGame({
    onCompleteTurn: () => render(window.game.state, { handleClick }),
  });
  initializeDifficulty();
  render(window.game.state, { handleClick });
}

function main() {
  startNewGame();
}

main();
