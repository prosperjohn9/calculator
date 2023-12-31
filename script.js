//Get the display element
const display = document.getElementById("display");

//Declare variables
let firstNumber = "";
let operator = "";     
let secondNumber = ""; 
let displayValue = "";
let previousCalculation = "";

//Add event listeners to number buttons
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});

//Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperator(button.textContent);
    });
});

//Add event listener to equals button
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", operate);

//Add event listener to clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

//Add event listener to decimal button
const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", addDecimal);

//Add event listener to backspace button
const backspaceButton = document.getElementById("backspace");
backspaceButton.addEventListener("click", removeLastCharacter);

//Function to update the display value
function updateDisplay (number) {
    //check if display already contains a decimal point
    if (number === "." && displayValue.includes(".")) {
        return;
    };
    //Append the clicked number to the current display value
    displayValue += number;
    display.textContent = displayValue;
};

//Function to handle operator button clicks
function handleOperator(operatorClicked) {
    if (previousCalculation) {
        operate();
    } 
    operator = operatorClicked;
    firstNumber = displayValue; 
    displayValue = "";
};

//Function to perform the calculation
function operate() {
    if (operator === "" || firstNumber === "" || displayValue === "") {
        return;
    }
    secondNumber = displayValue;
    let result;
    switch (operator) {
        case "+":
            result = add(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "-":
            result = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "x":
            result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "÷":
            if (secondNumber === "0") {
                display.textContent = "Error: Cannot divide by zero";
                return;
            };
            result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        default:
            return;
    };
    previousCalculation = result;
    displayValue = previousCalculation % 1 === 0 ? previousCalculation.toFixed(0) : previousCalculation.toFixed(2);
    displayValue = result % 1 === 0 ? result.toFixed(0) : result.toFixed(2);
    display.textContent = displayValue;

    // Reset the state for next calculation
    firstNumber = previousCalculation;
    operator = "";
    secondNumber = "";
};


//Function to clear the calculator
function clear() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    displayValue = "";
    display.textContent = "0";
    previousCalculation = "";
};

//Function to add a decimal point
function addDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
        display.textContent = displayValue;
    }
};

//Function to remove the last character from displayValue
function removeLastCharacter() {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
};

//Basic math operation function
function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function divide(a, b) {
    return a / b;
};