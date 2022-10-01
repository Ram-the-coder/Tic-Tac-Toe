function createNewGame({ onCompleteTurn }) {
  let state = {
    playerToPlay: X,
    board: createArray({
      length: 3,
      mapper: () => Array(3).fill(EMPTY),
    }),
    isGameOver: false,
    winner: null,
    difficulty: DIFFICULTY.EASY,
  };

  const setState = (newState) => (state = newState);
  const updateState = (updates) => setState({ ...state, ...updates });

  const checkAndUpdateGameCompletionState = () => {
    const winner = getWinner(state.board);
    if (winner) updateState({ winner, isGameOver: true });
    if (isDraw(state.board)) updateState({ isGameOver: true });
  };

  const completeTurn = () => {
    updateState({ playerToPlay: otherPlayer(state.playerToPlay) });
    checkAndUpdateGameCompletionState();
    onCompleteTurn();
    if (!state.isGameOver && state.playerToPlay === O) {
      const { i, j } = aiMove(state)
      makeMove(i, j);
    } 
  };

  const makeMove = (i, j) => {
    throwIfMoveIsInvalid(state, i, j);
    updateState({
      board: getBoardAfterMove(state.board, state.playerToPlay, i, j),
    });
    completeTurn();
  };

  return {
    get state() { return state },
    updateState,
    makeMove
  }
}
