const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
  const isInteger = !currentNumber.includes(".");
  const formattedNumber = isInteger ? currentNumber : currentNumber.replace(".", ",");
  result.innerText = originClear ? 0 : formattedNumber;
}

function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {
    currentNumber = digit;
    restart = false;
} else {
    currentNumber += digit;
}

  updateResult();
}

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();
    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
}
  operator = newOperator;
}

const operations = new Map([
  ["+", (a, b) => a + b],
  ["-", (a, b) => a - b],
  ["×", (a, b) => a * b],
  ["÷", (a, b) => a / b],
]);

function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue = operations.get(operator)(firstOperand, secondOperand);

  const isIntegerResult = resultValue % 1 === 0;
  currentNumber = isIntegerResult ? resultValue.toFixed(0) : resultValue.toFixed(5);

  operator = null;
  firstOperand = null;
  restart = true;
  updateResult();
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult(true);
}

function setPercentage() {
  let result = parseFloat(currentNumber) / 100;

  if (["+", "-"].includes(operator)) {
    result = result * (firstOperand || 1);
}

  currentNumber = result.toFixed(5).toString();
  updateResult();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (parseFloat(currentNumber || firstOperand) * -1).toString();
      updateResult();
    } else if (buttonText === "%") {
      setPercentage();
    }
  });
});
