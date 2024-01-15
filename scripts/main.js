let buttons = document.querySelector('.buttons');
let display = document.querySelector('.display');
let topDisplay = document.querySelector('.top-display');
let bottomDisplay = document.querySelector('.bottom-display');

let displayBuffer = [];
let firstNum = "EMPTY";
let secondNum = "EMPTY";
let currentOp = '';
let result;
let decimalFlag = false;
let brokenFlag = false;

buttons.addEventListener('click', function(e) {
    let target = e.target;
    let int = Number(displayBuffer.join(''));

    if(target.className == "number"){
        displayBuffer.push(target.textContent);
        console.log(displayBuffer);
        bottomDisplay.textContent = displayBuffer.join('');
    }
    if(target.className.includes("decimal")){
        if(decimalFlag == false){
            displayBuffer.push(target.textContent);
            bottomDisplay.textContent = displayBuffer.join('');
            decimalFlag = true;
        } else {
            alert("Already decimaled");
        }
    }

    else if(target.className.includes("operand")){
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
                secondNum = int;
                performEquation(currentOp);
                currentOp = target.textContent;

            }
            else if(firstNum == "EMPTY"){
                firstNum = int;
                decimalFlag = false;
                currentOp = target.textContent;
            }
            
            resetDisplay();
        }

    }
    else if(target.className.includes("reset")){
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
            if(firstNum == 0 || secondNum == 0){
                brokenFlag = true;
            }
            result = firstNum / secondNum;
            break;
    }

    resetDisplay();
    secondNum = "EMPTY";
    firstNum = result;
    decimalFlag = false;
}

function resetDisplay(){
    if(brokenFlag == true){
        cantCompute();
        return;
    }
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

function cantCompute(){
    topDisplay.textContent = "ABORT ABORT ABORT ABORT ABORT ABORT";
    bottomDisplay.textContent = "YOU HAVE BROKEN THE CALCULATOR";
    resetProgram();
}

function resetProgram(){
    firstNum = "EMPTY";
    secondNum = "EMPTY";
    currentOp = '';
    result = '';
    decimalFlag = false;
    brokenFlag = false;
    resetDisplay();
}