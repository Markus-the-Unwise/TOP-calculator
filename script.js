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
    if (!obj.negative && obj.str.includes("-")) { obj.str = obj.str.replace('-', "") }
}

function storeValue(obj){
    obj.value = parseFloat(obj.str);
    return
}

function storeResultToFirstValue (result){
    firstValue.str = String(result);
    firstValue.decimal = firstValue.str.includes(".");
    firstValue.negative = firstValue.str.includes("-");
    firstValue.inherited = true;
}

// Keys
function numberKeyPress(keyID) {
    switch (calcStatus[1]) {
        case false:
            calcStatus[0] = true;
            if(firstValue.inherited){firstValue.str = "";firstValue.inherited=false}
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

function signKeyPress(){
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

function percent(obj){
    return newValue = String(parseFloat(obj.str)/100);
}

function percentKeyPress(){
    if (!calcStatus[1]) {
        firstValue.str = percent(firstValue);
        return
    }
    secondValue.str = percent(secondValue);
    return
}

function operationKeyPress(keyID){
    if(calcStatus[2]){
        storeValue(secondValue);
        result = operate(firstValue.value,secondValue.value,operation);
        storeResultToFirstValue(result);
        // result = 0;
        operation = keyID;
        calcStatus=[true, true,false];
        secondValue = { str: "", value: 0, decimal: false, negative: false };
        return
    }
    storeValue(firstValue);
    calcStatus[1] = true;
    operation = keyID;
    return
}

function equalKeyPress(){
    if(calcStatus != [true,true,true]){console.log('equal key pressed without all values');return}
    storeValue(secondValue);
    result = operate(firstValue.value,secondValue.value,operation);
    storeResultToFirstValue(result);
    secondValue = { str: "", value: 0, decimal: false, negative: false };
    // result = 0;
    operation = "";
    calcStatus = [true,false,false];
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

function updateResultDisplay(keyID){
    if (keyID == "=") {resultDiv.textContent = result;return};
    resultDiv.textContent = firstValue.str+operation+secondValue.str;
}

// Initial values
let firstValue = { str: "", value: 0, decimal: false, negative: false, inherited: false };
let secondValue = { str: "", value: 0, decimal: false, negative: false };
let result = 0;
let operation = "";

let calcStatus = [false, false, false]; //[FirstValueExists,OperationMethodSelected, SecondValueExists]

const allNumberKeys = document.querySelectorAll(".number");
const operationKeys = document.querySelectorAll('.operation');
const allClearKey = document.querySelector(`.clear`);
const percentKey = document.querySelector('.percent');
const signKey = document.querySelector('.sign');
const decimalKey = document.querySelector('.decimal');
const allBtn = document.querySelectorAll('button');

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
            equalKeyPress();
            return;
        }
        operationKeyPress(e.target.id);
    })
}

percentKey.addEventListener('click',()=>{percentKeyPress()})
allClearKey.addEventListener('click',()=>{allClear()})
decimalKey.addEventListener('click',()=>{decimalKeyPress()})
signKey.addEventListener('click',()=>{signKeyPress()})

for (let i = 0;i<allBtn.length;i++){
    allBtn[i].addEventListener('click',(e)=>{
        updateDebugDisplay();
        updateResultDisplay(e.target.id);
    })
}
