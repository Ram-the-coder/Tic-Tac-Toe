const X = "X";
const O = "O";
const EMPTY = "";
const DIFFICULTY = {
  EASY: "0",
  MEDIUM: "1",
  HARD: "2",
};
const LOCAL_STORAGE_KEYS = {
  DIFFICULTY: "difficulty",
};

const WIN_PATTERNS = (() => {
  const horizontalPatterns = [
    createPattern(({ i }) => i == 0),
    createPattern(({ i }) => i == 1),
    createPattern(({ i }) => i == 2),
  ];

  const verticalPatterns = [
    createPattern(({ j }) => j == 0),
    createPattern(({ j }) => j == 1),
    createPattern(({ j }) => j == 2),
  ];

  const diagonalPatterns = [
    createPattern(({ i, j }) => i == j),
    createPattern(({ i, j }) => i + j == 2)
  ]

  return [
    ...verticalPatterns,
    ...horizontalPatterns,
    ...diagonalPatterns
  ];
})();
