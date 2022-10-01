function createBoard(initState) {
  const state =
    initState ||
    createArray({
      length: 3,
      mapper: () => Array(3).fill(EMPTY),
    });

  const getCells = () =>
    state.map((row, i) => row.map((cell, j) => ({ cell, i, j }))).flat();

  const getIterable = () => state;

  return {
    get cells() {
      return getCells();
    },
    get iterable() {
      return getIterable();
    },
  };
}
