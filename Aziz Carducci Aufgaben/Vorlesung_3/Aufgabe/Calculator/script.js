let currentResult = '';

function appendNumber(number) {
    currentResult += number;
    document.getElementById('result').value = currentResult;
}

function appendOperator(operator) {
    lastcharakterinList = currentResult[currentResult.length -1]
   if ((lastcharakterinList === '+' || lastcharakterinList === '-' || lastcharakterinList === '*' || lastcharakterinList === '/')) {
        currentResult = currentResult.slice(0, -1)
   }
   if(lastcharakterinList === '' && (lastcharakterinList === '+' || lastcharakterinList === '-' || lastcharakterinList === '*' || lastcharakterinList === '/'))
   {
    currentResult = '';
   }
    currentResult += operator;
    document.getElementById('result').value = currentResult;
   }
   
function calculate() {
    if (currentResult !== '') {
        let result;
        try {
            result = eval(currentResult);
            if (result === Infinity || isNaN(result)) {
                document.getElementById('result').value = 'Error';
            } else {
                document.getElementById('result').value = result;
            }
        } catch (error) {
            document.getElementById('result').value = 'Error';
        }
        currentResult = result;
    }
}

function clearResult() {
    currentResult = '';
    document.getElementById('result').value = currentResult;
}
