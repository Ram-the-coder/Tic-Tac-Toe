function oneOfError(e, errorClasses) {
  return errorClasses.some((errorClass) => e instanceof errorClass);
}

function createArray({ length, mapper }) {
  return Array(length).fill(null).map(mapper);
}

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