function operate(n, m, func) {
  if (func == 'add') return m + n;
  if (func == 'subtract') return m - n;
  if (func == 'divide') return m / n;
  if (func == 'multiply') return m * n;
  return n;
}

const calculator = {
  result: 0,
  input: undefined,
  operator: 'add',
};

const numberKeys = document.querySelectorAll('.numKeys');
const operatorKeys = document.querySelectorAll('.opKeys');
const resultScreen = document.getElementById('result');
const inputScreen = document.getElementById('input');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

clearButton.onclick = () => {
  resultScreen.innerText = '';
  inputScreen.innerText = '0';
  calculator.result = 0;
  calculator.operator = 'add';
  calculator.input = undefined;
};

calculator.delete = () => {
  if (inputScreen.innerText == '0' && calculator.input == undefined) {
    calculator.operator = 'equal';
    resultScreen.innerText = calculator.result;
    return;
  }
  inputScreen.innerText = inputScreen.innerText.slice(0, -1);
  if (!inputScreen.innerText) inputScreen.innerText = '0';
  calculator.input = parseFloat(inputScreen.innerText);
  if (calculator.input == 0) calculator.input = undefined;
};
deleteButton.onclick = calculator.delete;

// KEY BOARD SUPPORT
window.addEventListener('keydown', (e) => {
  if (e.key == 'Backspace') calculator.delete();
});

numberKeys.forEach((data) => data.addEventListener('click', updateInput));

function updateInput(e) {
  if (calculator.input == undefined) inputScreen.innerText = '';
  inputScreen.innerText += e.target.innerText;
  calculator.input = parseFloat(inputScreen.innerText);
}

operatorKeys.forEach((data) => data.addEventListener('click', updateResult));

function updateResult(e) {
  if (calculator.operator == 'equal' && calculator.input != undefined) {
    calculator.result = calculator.input;
    calculator.input = undefined;
  }
  if (calculator.operator == 'equal' && e.target.getAttribute('data-opt') != 'equal') {
    resultScreen.innerText = `${calculator.result} ${e.target.innerText}`;
    calculator.operator = e.target.getAttribute('data-opt');
  }
  if (calculator.input == undefined) return;
  calculator.result = operate(calculator.input, calculator.result, calculator.operator);
  calculator.operator = e.target.getAttribute('data-opt');
  resultScreen.innerText = `${calculator.result} ${e.target.innerText}`;
  if (calculator.operator == 'equal') resultScreen.innerText = calculator.result;
  if (calculator.input == 0 && calculator.result == Infinity) {
    resultScreen.innerText = "Math Error";
    calculator.result = 0;
  }
  calculator.input = undefined;
  inputScreen.innerText = '0';
}
