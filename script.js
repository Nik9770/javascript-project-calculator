let valueToDisplay = "";

const displayBox  = document.querySelector(".display-box");
const allButtons = document.querySelectorAll(".clickButton");
const erase = document.getElementById("erase");
const clearAll = document.getElementById("clearAll");
const equalTo = document.getElementById("equalTo");


window.onload = ()=>{
    displayBox.value = valueToDisplay;
} 


function preprocessExpression(expr) {
         // Insert * between number and (
        expr = expr.replace(/(\d)(\()/g, '$1*$2');
        // Insert * between ) and number
        expr = expr.replace(/(\))(\d)/g, '$1*$2');
        // Insert * between ) and (
        expr = expr.replace(/(\))(\()/g, '$1*$2');
        return expr;
}

function clearAllValue(){
    displayBox.value=""
    valueToDisplay=""
}


Array.from(allButtons).forEach((button)=>{
    button.addEventListener("click",(e)=>{
        let valueOfButton = e.target.innerText
        valueToDisplay = valueToDisplay  + valueOfButton;
        displayBox.value = valueToDisplay
})
})

erase.addEventListener("click",(e)=>{
    if(valueToDisplay.length>=1){
    valueToDisplay = valueToDisplay.substring(0,valueToDisplay.length-1)
    displayBox.value = valueToDisplay
    }
})

clearAll.addEventListener("click",(e)=>{
    clearAllValue()
})

equalTo.addEventListener("click",(e)=>{
    try{
        let processedValue = preprocessExpression(valueToDisplay);
        valueToDisplay = eval(processedValue)

        if(valueToDisplay=="Infinity"){
            // Infinity
            alert("cannot divide by zero");
            clearAllValue()
        }
        else if(Number.isInteger(valueToDisplay)){      
            // Integer
            displayBox.value = valueToDisplay    
        }else{
            // Decimal
            displayBox.value = valueToDisplay.toFixed(2)
        }
        
    }catch(err){
        alert("Invalid Input")
    }
})
