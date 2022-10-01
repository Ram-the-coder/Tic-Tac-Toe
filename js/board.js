function createBoard(initState) {
  const state =
    initState ||
    createArray({
      length: 3,
      mapper: () => Array(3).fill(EMPTY),
    });

  const updateBoardState = ({ i, j, content }) => (state[i][j] = content);

  const getContent = ({ i, j }) => state[i][j];

  const getCells = () =>
    state.map((row, i) => row.map((content, j) => ({ content, i, j }))).flat();

  const getIterable = () => state;

  const getWinner = () =>
    [X, O].filter((player) =>
      WIN_PATTERNS.some((pattern) =>
        pattern.every((cell) => getContent(cell) === player)
      )
    )[0];

  const isDraw = () => getCells().every(({ content }) => content != EMPTY);

  return {
    get cells() {
      return getCells();
    },
    get iterable() {
      return getIterable();
    },
    get winner() {
      return getWinner();
    },
    isDraw,
  };
}
