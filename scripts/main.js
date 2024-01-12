let buttons = document.querySelector('.buttons');
let display = document.querySelector('.display');
let topDisplay = document.querySelector('.top-display');
let bottomDisplay = document.querySelector('.bottom-display');

let displayBuffer = [];
let firstNum = "EMPTY";
let secondNum = "EMPTY";
let currentOp = '';
let result;

buttons.addEventListener('click', function(e) {
    let target = e.target;
    let int = Number(displayBuffer.join(''));

    if(target.className == "number"){
        displayBuffer.push(target.textContent);
        console.log(displayBuffer);
        bottomDisplay.textContent = displayBuffer.join('');
    }

    else if(target.className == "operand"){
        if(target.textContent == '='){
            secondNum = int;
            performEquation(currentOp);
        }    
        else {
            if(firstNum != "EMPTY" && secondNum != "EMPTY"){
                performEquation(currentOp);
                currentOp = target.textContent;
            }
            else if(firstNum != "EMPTY" && secondNum == "EMPTY"){
                currentOp = target.textContent;
                secondNum = int;

            }
            else if(firstNum == "EMPTY"){
                firstNum = int;
                currentOp = target.textContent;
            }
            resetDisplay();
        }

    }
    else if(target.className == "reset"){
        resetProgram();
    }

})

function performEquation(operand){
    switch(operand) {
        case "+": 
            result = firstNum + secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        case "*":
            result = firstNum * secondNum;
            break;
        case "/":
            result = firstNum / secondNum;
            break;
    }
    resetDisplay();
    secondNum = "EMPTY";
    firstNum = result;
}

function resetDisplay(){
    displayBuffer = [];
    bottomDisplay.textContent = "";
    bottomDisplay.textContent = result;

    if(firstNum == "EMPTY"){
        topDisplay.textContent = '';
        bottomDisplay.textContent = '';
    }
    else if(secondNum == "EMPTY" || secondNum == 0) {
        topDisplay.textContent = firstNum + " " + currentOp;
    }
    else {
        console.log("Val of SecondNum: " + secondNum);
        topDisplay.textContent = firstNum + " " + currentOp + " " + secondNum; 
    }
}

function resetProgram(){
    firstNum = "EMPTY";
    secondNum = "EMPTY";
    currentOp = '';
    result = '';
    resetDisplay();
}