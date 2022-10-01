function handleClick(i, j) {
  try {
    window.game.makeMove(i, j);
  } catch (e) {
    if (oneOfError(e, [InvalidMoveError, GameOverError])) return;
    else throw e;
  }
}

function handleDifficultyChange(value) {
  if (!Object.values(DIFFICULTY).includes(value)) return;
  window.game.updateState({ difficulty: value });
  localStorage.setItem("difficulty", value);
  console.log(`Difficulty set to ${value}`);
}

function initializeDifficulty() {
  const difficulty = localStorage.getItem("difficulty") || "0";
  handleDifficultyChange(difficulty);
  document.querySelector("select").value = difficulty;
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
