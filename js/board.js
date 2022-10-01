function createBoard(initState) {
  const state = initState || _getEmptyBoardState();

  return {
    get cells() {
      return getCells();
    },
    get middle() {
      const coords = { i: 1, j: 1 };
      return { ...coords, content: getContent(coords) };
    },
    getContent,
    setContent,
    getBoardAfterMove,
  };

  function getCells() {
    return state
      .map((row, i) => row.map((content, j) => ({ content, i, j })))
      .flat();
  }

  function getContent({ i, j }) {
    return state[i][j];
  }

  function setContent({ i, j, content }) {
    return (state[i][j] = content);
  }

  function getBoardAfterMove(player, coords) {
    if (getContent(coords) !== EMPTY) throw new InvalidMoveError();
    const newBoard = createBoard(_deepCloneState());
    newBoard.setContent({ ...coords, content: player });
    return newBoard;
  }

  function _getEmptyBoardState() {
    return Array(3)
      .fill(null)
      .map(() => Array(3).fill(EMPTY));
  }

  function _deepCloneState() {
    return state.map((row) => row.map((cell) => cell));
  }
}
