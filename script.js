function add(a, b) { return a + b; };
function subtract(a, b) { return a - b; };
function multiply(a, b) { return a * b; };
function divide(a, b) { return a / b; };
function operate(a, b, opMethod) {
    let result = 0;
    switch (opMethod) {
        case 'add':
            result = add(a, b);
            break;
        case 'subtract':
            result = subtract(a, b);
            break
        case 'multiply':
            result = multiply(a, b);
            break
        case 'divide':
            result = divide(a, b)
            break
        default:
            break;
    }
}
// Initial values
let firstValue = 0;
let secondValue = 0;
let operation;

const status = [false, false, false]; //[FirstValueExists,SecondValueExists,OperationMethodSelected]

