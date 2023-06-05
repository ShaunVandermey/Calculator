
let operation = null;
let previousNumber = null;
let currentNumber = null;
let firstComplete = false;

//use the previous calculation, and evaluate a new addition
function addArg(){
    operation = "+";
    firstComplete = true;
    displayString();
}

function subtractArg(){
    operation = "-";
    firstComplete = true;
    displayString();
}

function multiplyArg(){
    operation = "*";
    firstComplete = true;
    displayString();
}

function divideArg(){
    operation = "/";
    firstComplete = true;
    displayString();
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
                result = parseFloat(previousNumber) / parseFloat(currentNumber);
                break;
        }
        displayText.textContent = result;
        previousNumber = result;
        operation = null;
        currentNumber = null;
    }
}

const addBtn = document.getElementById("addition");
addBtn.addEventListener("click", addArg);
const minusBtn = document.getElementById("subtraction");
minusBtn.addEventListener("click", subtractArg);
const timesBtn = document.getElementById("multiplication");
timesBtn.addEventListener("click", multiplyArg);
const divideBtn = document.getElementById("division");
divideBtn.addEventListener("click", divideArg);
const equalsBtn = document.getElementById("equals");
equalsBtn.addEventListener("click", evaluate);

const numberBtns = document.getElementsByClassName("number");
//numberBtns.forEach((button) =>
    //button.addEventListener("click", () => appendNumber(button.textContent))
    //);
for(let i = 0; i < numberBtns.length; i++){
    numberBtns[i].addEventListener("click", () => appendNumber(numberBtns[i].textContent));
}

const displayText = document.getElementById("displayArea");

function setup(){

}