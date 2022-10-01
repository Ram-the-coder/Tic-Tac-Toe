function oneOfError(e, errorClasses) {
  return errorClasses.some((errorClass) => e instanceof errorClass);
}

const createPattern = (shouldCellBePartOfPattern) => {
  const pattern = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const coords = { i, j };
      if (shouldCellBePartOfPattern(coords)) pattern.push(coords);
    }
  }
  return pattern;
};

function getRandomElementFromArray(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function clearChildren(element) {
  element.textContent = "";
}

function setClasslist(el, classes) {
  classes.forEach((className) => el.classList.add(className));
}