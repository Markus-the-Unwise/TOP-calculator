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
let firstValue = { str: "", value: 0, decimal: false, negative: 1, inherited: false };
let secondValue = { str: "", value: 0, decimal: false, negative: 1 };
let result = 0;
let operation = "";

const status = [false, false, false]; //[FirstValueExists,OperationMethodSelected, SecondValueExists]

/*
process A (first time use, status == [F F F]):
1. firstValueExists the moment a number is pressed [T F F]
2. save first value when operation key is pressed and status == [T F F]
    save operation type (dependent on key pressed)
3. secondValueExists when number is pressed (if status == [T T F])
4. on "=" or "operation" button: store second value if status == [T T T]
    return results if status == [T T T] (Exception1)
5. status = [T F F] (through equal button) [T T F] (through operation button)

process B (solved once)
1. result from previous calculation is saved as first value, 
        a. First value is replaced when (number key is pressed && status == [T F F]). return to A.3
        b. secondValueExists when (number key is pressed && status == [T T F]). return to A.5

Exception1: Divide by 0
1. upon A.6 check if (second value == 0 && operation == 'divide')
2. return "Bruh" as result if true, run "All clear"

Special key (decimal):
1. set variable decimalPressed, start as false
2. turns true when pressed once
3. return to false when operation or equal button is pressed

Special key (+/-):
if status == [T F F] or [F F F]:
    firstValue.negative *= -1
if status == [T T F] or [T T T]:
    secondValue.negative *= -1


Number Keys (0-9):
if status == [F F F]
    if (firstValue.inherited == true):
        clear firstValue
    add buttonID to firstValue as string
if status == [T T F]
    add buttonID to secondValue as string

Operation Key:
if status == [T F F] (first value not yet stored)
    parseFloat firstValue
    store operation type
    status = [T T F]
if status == [T T T] (second value not yet stored)
    parseFloat secondValue
    Calculate result
    store operation type for next calculation
    store result as firstValue (inherited = true)
    status = [T T F]
Equal Key:
if status == [T T T]
    parseFloat secondValue
    Calculate result
    store result as firstValue (inherited = true)

TODO:function convertResultToFirstValue()
*/