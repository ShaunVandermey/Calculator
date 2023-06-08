
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
    if(previousNumber == null && operation == null && currentNumber == null){
        displayText.textContent = "0";
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
        result = Math.round(result * 10000000) / 10000000;
        displayText.textContent = result;
        previousNumber = result;
        operation = null;
        currentNumber = null;
        prevHasDecimal = currHasDecimal;
        currHasDecimal = false;
    }
}

function deleteAction(){
    //remove the latest thing the user has added to the calculator
    if(currentNumber != null){
        if(currentNumber.length > 0){
            currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        }
        if(currentNumber.length == 0){
            currentNumber = null;
        }
    }
    else if(operation != null){
        operation = null;
    }
    else if(previousNumber != null){
        if(previousNumber.length > 0){
            previousNumber = previousNumber.substring(0, previousNumber.length - 1);
        }
        if(previousNumber.length == 0){
            previousNumber = null;
        }
    }
    displayString();
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
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteAction);

const numberBtns = document.getElementsByClassName("number");
for(let i = 0; i < numberBtns.length; i++){
    numberBtns[i].addEventListener("click", () => appendNumber(numberBtns[i].textContent));
}

window.addEventListener("keydown", function(event){
    if(event.defaultPrevented){
        return;
    }
    switch(event.code){
        case "Digit1":
        case "Numpad1":
            appendNumber("1");
            break;
        case "Digit2":
        case "Numpad2":
            appendNumber("2");
            break;
        case "Digit3":
        case "Numpad3":
            appendNumber("3");
            break;
        case "Digit4":
        case "Numpad4":
            appendNumber("4");
            break;
        case "Digit5":
        case "Numpad5":
            appendNumber("5");
            break;
        case "Digit6":
        case "Numpad6":
            appendNumber("6");
            break;
        case "Digit7":
        case "Numpad7":
            appendNumber("7");
            break;
        case "Digit8":
        case "Numpad8":
            appendNumber("8");
            break;
        case "Digit9":
        case "Numpad9":
            appendNumber("9");
            break;
        case "Digit0":
        case "Numpad0":
            appendNumber("0");
            break;
    }
}, true);

const displayText = document.getElementById("displayArea");