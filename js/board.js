function createBoard(initState) {
  const state =
    initState ||
    createArray({
      length: 3,
      mapper: () => Array(3).fill(EMPTY),
    });

  const deepCloneState = () => state.map((row) => row.map((cell) => cell));

  const getContent = ({ i, j }) => state[i][j];

  const setContent = ({ i, j, content }) => (state[i][j] = content);

  const getCells = () =>
    state.map((row, i) => row.map((content, j) => ({ content, i, j }))).flat();

  const getBoardAfterMove = (player, coords) => {
    if (getContent(coords) !== EMPTY) throw new InvalidMoveError();
    const newBoard = createBoard(deepCloneState());
    newBoard.setContent({ ...coords, content: player });
    return newBoard;
  };

  return {
    get cells() {
      return getCells();
    },
    get winner() {
      return getWinner();
    },
    isDraw,
    getContent,
    setContent,
    getBoardAfterMove,
    get middle() {
      const coords = { i: 1, j: 1 };
      return { ...coords, content: getContent(coords) };
    },
  };
}
