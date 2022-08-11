const clear_all = document.getElementById("clear-all");
const deleteEl = document.getElementById("delete");
const calculatorDisplay = document.querySelector(".display h1");
const inputBtns = document.querySelectorAll("button");

let firstValue = 0;
let operatorValue = " ";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //   Replace display value if it is 0, else add the numbers
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
    //   if (displayValue === "0") {
    //     calculatorDisplay.textContent = number;
    //   } else {
    //     calculatorDisplay.textContent += number;
    //   }
  }
}

const addDecimal = () => {
  if (awaitingNextValue) return;
  // Add a decimal if none exists
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  //   Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //   Assign currentValue to firstValue if it is 0.
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //   Ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
};

// Add event listeners for all the buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.contains("number")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Clear the Display
clear_all.addEventListener("click", () => {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = " ";
  awaitingNextValue = false;
});

deleteEl.addEventListener("click", (string) => {
  string = calculatorDisplay.textContent;
  string.slice(0, -1);
});
