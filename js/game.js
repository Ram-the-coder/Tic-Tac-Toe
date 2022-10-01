function createNewGame({ onCompleteTurn }) {
  let state = {
    playerToPlay: X,
    board: createBoard(),
    isGameOver: false,
    winner: null,
    difficulty: DIFFICULTY.EASY,
  };

  const setState = (newState) => (state = newState);
  const updateState = (updates) => setState({ ...state, ...updates });

  const checkWinAndUpdateState = () => {
    const winner = getWinner(state.board)
    if (winner) updateState({ winner, isGameOver: true });
  };

  const checkDrawAndUpdateState = () => {
    if (isDraw(state.board)) updateState({ isGameOver: true });
  };

  const checkAndUpdateGameCompletionState = () => {
    checkWinAndUpdateState();
    checkDrawAndUpdateState();
  };

  const makeAIMove = (state) => {
    makeMove(getAIsMove(state));
  };

  const completeTurn = () => {
    updateState({ playerToPlay: otherPlayer(state.playerToPlay) });
    checkAndUpdateGameCompletionState();
    onCompleteTurn();
    if (isItAIsTurn(state)) makeAIMove(state);
  };

  const makeMove = (cell) => {
    if (state.isGameOver) throw new GameOverError();
    updateState({
      board: state.board.getBoardAfterMove(state.playerToPlay, cell),
    });
    completeTurn();
  };

  return {
    get state() {
      return state;
    },
    updateState,
    makeMove,
  };
}
