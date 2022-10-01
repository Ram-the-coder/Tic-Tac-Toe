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

  const checkAndUpdateGameCompletionState = () => {
    if (state.board.winner)
      updateState({ winner: state.board.winner, isGameOver: true });
    if (state.board.isDraw()) updateState({ isGameOver: true });
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
    throwIfMoveIsInvalid(state, cell);
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
