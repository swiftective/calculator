function add(n, m) {
  return m + n;
}

function subtract(n, m) {
  return m - n;
}

function divide(n, m) {
  return m / n;
}

function multiply(n, m) {
  return m * n;
}

function operate(n, m, func) {
  if (func == 'add') return add(n, m);
  if (func == 'subtract') return subtract(n, m);
  if (func == 'divide') return divide(n, m);
  if (func == 'multiply') return multiply(n, m);
}

const CAL = {
  result: undefined,
  input: undefined,
  operator: undefined,
};

const NUM_KEYS = document.querySelectorAll('.numKeys');
const OP_KEYS = document.querySelectorAll('.opKeys');
const RESULT = document.getElementById('result');
const INPUT = document.getElementById('input');
const CLEAR = document.getElementById('clear');
CLEAR.onclick = () => {
  RESULT.innerText = '';
  INPUT.innerText = '';
  CAL.input = 0
  CAL.operator = 0
  CAL.result = 0
}

NUM_KEYS.forEach((data) => data.addEventListener('click', updateInput));

function updateInput(e) {
  INPUT.innerText += e.target.innerText;
  CAL.input = parseFloat(INPUT.innerText);
}

OP_KEYS.forEach((data) => data.addEventListener('click', updateResult));

function updateResult(e) {
  if (!INPUT.innerText) return;
  if (e.target.innerText == '=' && CAL.result != undefined) {
    RESULT.innerText = operate(CAL.input, CAL.result, CAL.operator)
    INPUT.innerText = '';
    return;
  }
  if(RESULT.innerText) {
    CAL.result = operate(CAL.input, CAL.result, CAL.operator)
    RESULT.innerText = `${CAL.result} ${e.target.innerText} `
    CAL.operator = e.target.getAttribute("data-opt");
    INPUT.innerText = '';
    return;
  };
  CAL.result = CAL.input;
  CAL.operator = e.target.getAttribute("data-opt");
  RESULT.innerText = `${CAL.result} ${e.target.innerText} `
  INPUT.innerText = '';
}
