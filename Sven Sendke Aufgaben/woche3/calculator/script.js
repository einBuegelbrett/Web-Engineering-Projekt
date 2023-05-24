let currentResult = '';
let operatorUsed = false;
let minusUsed = false;

function appendNumber(number) {
    currentResult += number;
    document.getElementById('result').value = currentResult;
    operatorUsed = false;
    minusUsed = false;
}

function appendOperator(operator) {
    let minusUsedNow = false;
    if(!operatorUsed || !minusUsed) {
        if(!operatorUsed) {
            currentResult += operator;
            document.getElementById('result').value = currentResult;
            operatorUsed = true;
            minusUsedNow = true;
        }

        if(operator == '-' && operatorUsed && !minusUsed && !minusUsedNow) 
        {
            currentResult += operator;
            document.getElementById('result').value = currentResult;
            minusUsed = true;
        }
    }
}

function calculate() {
    document.getElementById('result').value = eval(currentResult);
}

function clearResult() {
    currentResult = '';
    document.getElementById('result').value = currentResult;
}
