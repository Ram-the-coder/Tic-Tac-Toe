const X = "X";
const O = "O";
const EMPTY = "";
const DIFFICULTY = {
  EASY: "0",
  MEDIUM: "1",
  HARD: "2",
};
const LOCAL_STORAGE_KEYS = {
  DIFFICULTY: 'difficulty'
}
const WIN_PATTERNS = (() => {
  const horizontalPatterns = createArray({
    length: 3,
    mapper: (_, i) =>
      createArray({
        length: 3,
        mapper: (_, j) => ({ i, j }),
      }),
  });

  const verticalPatterns = createArray({
    length: 3,
    mapper: (_, j) =>
      createArray({
        length: 3,
        mapper: (_, i) => ({ i, j }),
      }),
  });

  const topLeftToBottomRightPattern = createArray({
    length: 3,
    mapper: (_, d) => ({ i: d, j: d }),
  });

  const topRightToBottomLeftPattern = createArray({
    length: 3,
    mapper: (_, d) => ({ i: d, j: 2 - d }),
  });

  return [
    ...verticalPatterns,
    ...horizontalPatterns,
    topLeftToBottomRightPattern,
    topRightToBottomLeftPattern,
  ];
})();
