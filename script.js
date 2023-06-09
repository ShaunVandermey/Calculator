
let operation = null;
let previousNumber = null;
let currentNumber = null;
let prevHasDecimal = false;
let currHasDecimal = false;
let firstComplete = false;

//for capture through UI
function changeOperation(e){
    string = e.currentTarget.attributes.operation.value;
    changeStringOperation(string);
}

//for capture for keypad/after UI is pressed
function changeStringOperation(string){
    if(previousNumber != null){
        if(currentNumber != null && operation != null){
            evaluate();
        }
        operation = string;
        firstComplete = true;
        displayString();
    }
}

//append a number to the active part of the equation
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

//add a decimal point into the active part of the equation if it doesn't have one
function decimal(){
    if(!firstComplete){
        if(!prevHasDecimal){
            if(previousNumber == null){
                appendNumber("0");
            }
            previousNumber += ".";
            prevHasDecimal = true;
        }
    }
    else{
        if(!currHasDecimal){
            if(currentNumber == null){
                appendNumber("0");
            }
            currentNumber += ".";
            currHasDecimal = true;
        }
    }
    displayString();
}

//update the UI to show the current equation
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

//run the current calculation, assuming it's legal
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
                    //clear();
                    break;
                }
        }
        result = Math.round(result * 10000000) / 10000000;
        displayText.textContent = result;
        previousNumber = result;
        operation = null;
        currentNumber = null;
        prevHasDecimal = previousNumber.toString().includes(".");
        currHasDecimal = false;
        firstComplete = false;
        //mild chicanery because the type isn't converted back to a string implicitly, leading to issues when deleting after evaluating
        let temp = previousNumber.toString();
        alert(temp);
        previousNumber = temp;
    }
}

//remove the latest thing the user has added to the calculator
function deleteAction(){
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

//reset calculator to initial state
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


//I'm guessing that there's a better way of capturing all of the numerical and numpad inputs, but I think it would require a larger refactor
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
        case "Period":
        case "NumpadDecimal":
            decimal();
            break;
        case "NumpadAdd":
            changeStringOperation("+");
            break;
        case "NumpadSubtract":
            changeStringOperation("-");
            break;
        case "NumpadMultiply":
            changeStringOperation("*");
            break;
        case "NumpadDivide":
            changeStringOperation("/");
            break;
        case "Backspace":
            deleteAction();
            break;
        case "NumpadEnter":
            evaluate();
            break;
    }
}, true);

const displayText = document.getElementById("displayArea");