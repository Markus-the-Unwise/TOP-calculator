function add(a, b) { return a + b; };
function subtract(a, b) { return a - b; };
function multiply(a, b) { return a * b; };
function divide(a, b) { if(b == 0){return "BRUH"};return a / b; };
function operate(a, b, opMethod) {
    let result = 0;
    switch (opMethod) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break
        case '*':
            result = multiply(a, b);
            break
        case '/':
            result = divide(a, b)
            break
        default:
            break;
    }
    return result
}

function addNumberToValue(obj, value) {
    obj.str += value;
}

function addDecimal(obj) {
    if (obj.decimal == true) { console.log("Decimal already exists");return };
    obj.str += ".";
    obj.decimal = true;
}

function negativeMultiplier(obj) {
    obj.negative = !obj.negative
    if (obj.negative && !obj.str.includes("-")) { obj.str = '-' + obj.str }
    if (!obj.negative && obj.str.includes("-")) { obj.str.replace('-', "") }
}

function storeValue(obj){
    obj.value = parseFloat(obj.str);
    return
}

function storeResultToFirstValue (result){
    firstValue.str = Sting(result);
    firstValue.decimal = firstValue.str.includes(".");
    firstValue.negative = firstValue.str.includes("-");
    firstValue.inherited = true;
}

// Keys
function numberKeyPress(keyID) {
    switch (calcStatus[1]) {
        case false:
            calcStatus[0] = true;
            addNumberToValue(firstValue, keyID);
            break;
        case true:
            calcStatus[2] = true;
            addNumberToValue(secondValue, keyID);
            break;
        default:
            console.log("Exception at numberKeyPress");
            break;
    }
}

function negativeKeyPress(){
    switch (calcStatus[1]) {
        case false:
            negativeMultiplier(firstValue);
            break;
        case true:
            negativeMultiplier(secondValue);
            break;
        default:
            console.log("Exception at negativeKeyPress");
            break;
    }
}

function decimalKeyPress(){
    switch (calcStatus[1]) {
        case false:
            addDecimal(firstValue);
            break;
        case true:
            addDecimal(secondValue);
            break;
        default:
            console.log("Exception at decimalKeyPress");
            break;
    }
}

function allClear(){
    firstValue = { str: "", value: 0, decimal: false, negative: false, inherited: false };
    secondValue = { str: "", value: 0, decimal: false, negative: false };
    result = 0;
    operation = "";    
    calcStatus = [false, false, false];
}

function operationKeyPress(keyID){
    if(calcStatus[2]){
        // store second value
        // begin calculation, store result to first value (inherit = true) and keyID to operation type
        // flag calcStatus to [TTF]
        // reset all
        return
    }
    calcStatus[1] = true;
    operation = keyID;
    return
}

function equalKeyPress(){
    // store second value
    // begin calculation, store result to first value (inherit = true), reset everything else
    // status = [TFF]
}

// Display function
function updateDebugDisplay (){
    let firstValueDisplay = document.querySelector('#firstValueDisplay');
    let secondValueDisplay = document.querySelector('#secondValueDisplay');
    let operationDisplay = document.querySelector('#operationDisplay');
    let resultDisplay = document.querySelector('#resultDisplay');
    firstValueDisplay.textContent = `First Value: ${Object.values(firstValue)}`;
    secondValueDisplay.textContent = `Second Value: ${Object.values(secondValue)}`;
    operationDisplay.textContent = `Operation: ${operation}`;
    resultDisplay.textContent = `Result: ${result}`
}

// Initial values
let firstValue = { str: "", value: 0, decimal: false, negative: false, inherited: false };
let secondValue = { str: "", value: 0, decimal: false, negative: false };
let result = 0;
let operation = "";

let calcStatus = [false, false, false]; //[FirstValueExists,OperationMethodSelected, SecondValueExists]

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

Special key (AC):
remove all values and operations

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
*/

const allNumberKeys = document.querySelectorAll(".number");
const operationKeys = document.querySelectorAll('.operation')
// const equalKey = document.querySelector('#=')

const resultDiv = document.querySelector('#result');
for (let i = 0; i < allNumberKeys.length; i++) {
    allNumberKeys[i].addEventListener('click', (e) => {
        // calcStatus[1] = document.querySelector('#operationSelected').checked;
        console.log(`calcStatus: ${calcStatus}`);
        numberKeyPress(e.target.id);
        resultDiv.textContent = firstValue.str+operation+secondValue.str;
        updateDebugDisplay()
    })
}

for (let i = 0;i<operationKeys.length;i++){
    operationKeys[i].addEventListener('click',(e)=>{
        if (e.target.id == '=') {
            operate(firstValue.value,secondValue.value,operation)
            // update display
            return
        }
        operationKeyPress(e.target.id);
        resultDiv.textContent = firstValue.str+operation+secondValue.str;
        updateDebugDisplay()
    })
}