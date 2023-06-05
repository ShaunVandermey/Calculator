
let operation = null;
let previousNumber = null;
let currentNumber = null;
let prevHasDecimal = false;
let currHasDecimal = false;
let firstComplete = false;


function changeOperation(e){
    if(previousNumber != null){
        if(currentNumber != null && operation != null){
            evaluate();
        }
        operation = e.currentTarget.attributes.operation.value;
        firstComplete = true;
        displayString();
    }
}

function appendNumber(num){
    
    if(!firstComplete){
        if(previousNumber == null || previousNumber == "0"){
            previousNumber = num;
        }
        else{
            previousNumber += num;
        }
    }
    else{
        if(currentNumber == null || currentNumber == "0"){
            currentNumber = num;
        }
        else{
            currentNumber += num;
        }
    }
    displayString();
}

function decimal(){
    if(!firstComplete){
        if(!prevHasDecimal){
            previousNumber += ".";
            prevHasDecimal = true;
        }
    }
    else{
        if(!currHasDecimal){
            currentNumber += ".";
            currHasDecimal = true;
        }
    }
    displayString();
}

function displayString(){
    if(previousNumber != null){
        displayText.textContent = previousNumber;
    }
    if(operation != null){
        displayText.textContent += " " + operation + " ";
    }
    if(currentNumber != null){
        displayText.textContent += currentNumber;
    }
}

function evaluate(){
    let result = 0;
    if(previousNumber != null && operation != null && currentNumber != null){
        switch(operation){
            case "+":
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break;
            case "-":
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break;
            case "*":
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break;
            case "/":
                if(currentNumber != 0){
                    result = parseFloat(previousNumber) / parseFloat(currentNumber);
                    break;
                }
                else{
                    alert("Don't divide by 0, it makes the developers upset.");
                    clear();
                    break;
                }
        }
        displayText.textContent = result;
        previousNumber = result;
        operation = null;
        currentNumber = null;
        prevHasDecimal = currHasDecimal;
        currHasDecimal = false;
    }
}

function clear(){
    currentNumber = null;
    previousNumber = null;
    operation = null;
    firstComplete = false;
    prevHasDecimal = false;
    currHasDecimal = false;
    displayText.textContent = 0;
}

const addBtn = document.getElementById("addition");
addBtn.setAttribute('operation', "+");
addBtn.addEventListener("click", changeOperation);
const minusBtn = document.getElementById("subtraction");
minusBtn.setAttribute('operation', "-");
minusBtn.addEventListener("click", changeOperation);
const timesBtn = document.getElementById("multiplication");
timesBtn.setAttribute('operation', "*");
timesBtn.addEventListener("click", changeOperation);
const divideBtn = document.getElementById("division");
divideBtn.setAttribute('operation', "/");
divideBtn.addEventListener("click", changeOperation);

const equalsBtn = document.getElementById("equals");
equalsBtn.addEventListener("click", evaluate);
const decimalBtn = document.getElementById("decimal");
decimalBtn.addEventListener("click", decimal);
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clear);

const numberBtns = document.getElementsByClassName("number");
for(let i = 0; i < numberBtns.length; i++){
    numberBtns[i].addEventListener("click", () => appendNumber(numberBtns[i].textContent));
}

const displayText = document.getElementById("displayArea");