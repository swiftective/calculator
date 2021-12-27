function operate(n, m, func) {
  if (func == 'add') return m + n;
  if (func == 'subtract') return m - n;
  if (func == 'divide') return m / n;
  if (func == 'multiply') return m * n;
  return n;
}

const CAL = {
  result: 0,
  input: undefined,
  operator: 'add',
};

const NUM_KEYS = document.querySelectorAll('.numKeys');
const OP_KEYS = document.querySelectorAll('.opKeys');
const RESULT = document.getElementById('result');
const INPUT = document.getElementById('input');
const CLEAR = document.getElementById('clear');
const DELETE = document.getElementById('delete');

CLEAR.onclick = () => {
  RESULT.innerText = '';
  INPUT.innerText = '0';
  CAL.result = 0;
  CAL.operator = 'add';
  CAL.input = undefined;
};

CAL.delete = () => {
  if (INPUT.innerText == '0' && CAL.input == undefined) {
    CAL.operator = 'equal';
    RESULT.innerText = CAL.result;
    return;
  }
  INPUT.innerText = INPUT.innerText.slice(0, -1);
  if (!INPUT.innerText) INPUT.innerText = '0';
  CAL.input = parseFloat(INPUT.innerText);
  if (CAL.input == 0) CAL.input = undefined;
};
DELETE.onclick = CAL.delete;

// KEY BOARD SUPPORT
window.addEventListener('keydown', (e) => {
  if (e.key == 'Backspace') CAL.delete();
});

NUM_KEYS.forEach((data) => data.addEventListener('click', updateInput));

function updateInput(e) {
  if (CAL.input == undefined) INPUT.innerText = '';
  INPUT.innerText += e.target.innerText;
  CAL.input = parseFloat(INPUT.innerText);
}

OP_KEYS.forEach((data) => data.addEventListener('click', updateResult));

function updateResult(e) {
  if (CAL.operator == 'equal' && CAL.input != undefined) {
    CAL.result = CAL.input;
    CAL.input = undefined;
  }
  if (CAL.operator == 'equal' && e.target.getAttribute('data-opt') != 'equal') {
    RESULT.innerText = `${CAL.result} ${e.target.innerText}`;
    CAL.operator = e.target.getAttribute('data-opt');
  }
  if (CAL.input == undefined) return;
  CAL.result = operate(CAL.input, CAL.result, CAL.operator);
  CAL.operator = e.target.getAttribute('data-opt');
  RESULT.innerText = `${CAL.result} ${e.target.innerText}`;
  if (CAL.operator == 'equal') RESULT.innerText = CAL.result;
  CAL.input = undefined;
  INPUT.innerText = '0';
}
