let result = document.querySelector(".result");
let condition = document.querySelector(".condition");
let symbol = "";
let flag = false;

function display(text) {
    if (text === '') {
        clearCalculator();
        return;
    }
    if (result.innerText.trim() === '' && (text === '+' || text === '-' || text === '*' || text === '/')) {
        return; 
    }
    if (result.innerText === '0' || flag) {
        result.innerText = '';
        flag = false;
    }
    if (flag && text !== '') {
        let temp1 = result.innerText.split(symbol);
        let temp2 = temp1[1].split('');
        if (temp2[0] === '(') {
            temp2.shift();
            temp2.unshift('(');
            temp2.pop();
            temp2.push(text);
            temp2.push(')');
        } else {
            temp2.unshift('(');
            temp2.push(')');
        }
        temp2 = temp2.join('');
        result.innerText = `${temp1[0]}${symbol}${temp2}`;
        console.log(temp2);
        return;
    }

    if (result.innerText == '0' && text !== '.') {
        result.innerText = text;
        return;
    }

    if (toAddEmpthEndOfResult()) {
        result.innerText += ` ${text}`;
        return;
    }
    
    result.innerText += text;
}

function clearCalculator() {
    symbol = '';
    result.innerText = '';
    condition.innerText = '';
    flag = false;
}

function backspace() {
    let temp = result.innerText.split('');
    let lastChar = temp.pop(); 
    result.innerText = temp.join('').trim();
    if (result.innerText === '') {
        symbol = ''; 
    } else if (['+', '-', '*', '/'].includes(lastChar.trim())) {
        symbol = ''; 
    }
}

function calculate() {
    let answer = result.innerText;
    let temp = result.innerText.split(symbol);

    if (temp.length < 2 || temp[1].trim() === '') {
        return "Error"; 
    }

    let num1 = Number(temp[0].trim());
    let num2 = Number(temp[1].trim());
    let operation = '';

    switch (symbol.trim()) {
        case '+':
            answer = num1 + num2;
            operation = `${num1} + ${num2}`;
            break;
        case '-':
            answer = num1 - num2;
            operation = `${num1} - ${num2}`;
            break;
        case '/':
            if (num2 === 0) {
                return "Error"; 
            }
            answer = num1 / num2;
            operation = `${num1} / ${num2}`;
            break;
        case '*':
            answer = num1 * num2;
            operation = `${num1} * ${num2}`;
            break;
        default:
            return "Error";
    }
    condition.innerText = operation;

    return answer % 1 === 0 ? answer.toString() : answer.toFixed(6);
}

function checkSymbol() {
    let temp = result.innerText.split(symbol);
    return temp.length === 2 && temp[1].trim() === ''; 
}

function writePointToResult() {
    if (symbol === '') {
        if (!result.innerText.includes(".") && !checkSymbol()) {
            display(".");
        }
    } else {
        let temp = result.innerText.split(symbol);
        if (temp[1] !== '' && !temp[1].includes('.')) {
            display(".");
        }
    }
}

function plus() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate(); 
        }
        symbol = " + ";
        result.innerText += " + "; 
        flag = false; 
    }
}

function divide() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate(); 
        }
        symbol = " / ";
        result.innerText += " / ";
        flag = false;
    }
}

function subtruction() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate();
        }
        symbol = " - ";
        result.innerText += " - ";
        flag = false;
    }
}

function multiplication() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate();
        }
        symbol = " * ";
        result.innerText += " * ";
        flag = false;
    }
}

function equal() {
    let resultValue = calculate();
    result.innerText = resultValue;
    symbol = '';
    flag = true;
}

function percent() {
    let currentText = result.innerText.trim();
    if (symbol) {
        let temp = currentText.split(symbol);
        if (temp.length === 2) {
            let num2 = Number(temp[1].trim());
            if (!isNaN(num2)) {
                num2 = num2 / 100; 
                result.innerText = `${temp[0].trim()} ${symbol} ${num2}`; 
                return;
            }
        }
    }
    let singleNum = Number(currentText);
    if (!isNaN(singleNum)) {
        result.innerText = (singleNum / 100).toString(); 
    }
}

function changeSign() {
    let currentText = result.innerText.trim();
    if (symbol) {
        let temp1 = currentText.split(symbol);
        if (temp1.length === 2) {
            let num2 = temp1[1].trim();
            if (num2.startsWith('-')) {
                num2 = num2.substring(1);
            } else {
                num2 = '-' + num2; 
            }
            result.innerText = `${temp1[0].trim()} ${symbol} ${num2}`;
        }
    } else {
        let singleNum = Number(currentText);
        if (!isNaN(singleNum)) {
            result.innerText = (-singleNum).toString(); 
        }
    }
}

function toAddEmpthEndOfResult() {
    let temp = result.innerText.split('');
    return ['-', '+', '/', '*'].includes(temp[temp.length - 1]);
}
