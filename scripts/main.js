let buttons = document.querySelector('.buttons');
let display = document.querySelector('.display');
let displayBuffer = [];

let firstNum = "EMPTY";
let secondNum = "EMPTY";
let currentOp = '';



buttons.addEventListener('click', function(e) {
    let target = e.target;
    console.log(target.className);
    let int = Number(displayBuffer.join(''));


    if(target.className == "number"){
        displayBuffer.push(target.textContent);
        console.log(displayBuffer);
        display.textContent += target.textContent;
    }

    else if(target.className == "operand"){
        if(target.textContent == '='){
            //do maths
            secondNum = int;
            performEquation(currentOp);
        }    
        else {
            //add number in buffer to equation buffer
            //or else perform first equation and put number 
            //back into equation buffer
            //1. Put buffer into equation

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
            display.textContent = target.textContent;

            console.log(firstNum);
            console.log(secondNum);
        }

    }

})

function performEquation(operand){
    let result;
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
    secondNum = "EMPTY";
    firstNum = result;

    console.log(result);

}

function resetDisplay(){
    displayBuffer = [];


}