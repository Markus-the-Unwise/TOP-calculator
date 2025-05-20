function add(a, b) { return a + b; };
function subtract(a, b) { return a - b; };
function multiply(a, b) { return a * b; };
function divide(a, b) { return a / b; };

// Initial values
let firstValue = 0;
let secondValue = 0;
let operation; // 0123 -> +-*/

const status = [false, false, false]; //[FirstValueExists,SecondValueExists,OperationMethodSelected]

