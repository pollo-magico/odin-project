const screen = document.querySelector(".screen-text");
const buttons = document.querySelectorAll(".button");

const point = document.querySelector(".point");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");

const add = document.querySelector(".add");
const substract = document.querySelector(".substract");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");

const clear = document.querySelector(".clear");
const opposite = document.querySelector(".opposite");
const percent = document.querySelector(".percent");
const equals = document.querySelector(".equals");

const clickSound = new Audio("./audio/click.mp3");
clickSound.volume = 0.2;

screen.innerText = '';

let lastNumber = screen.innerText;
let currentNumber = lastNumber;
let currentOperation = (a, b) => b;

const appendNumber = (n) => {
  if(currentNumber === 'Infinity' || currentNumber === 'NaN') {
    currentNumber = ''; 
  }
  currentNumber = currentNumber.toString() + n.toString();
  screen.innerText = currentNumber;
};

const truncateCurrentNumber = () => {
  currentNumber = (Math.round((+currentNumber * 1000)) / 1000).toString();
};

const setOperation = (op) => {
  currentOperation = op;
  if(currentNumber === '')  { return; }	  
  lastNumber = currentNumber;
  currentNumber = '';
};

const containsPoint = () => {
  return currentNumber.includes('.');
}; 

point.addEventListener('click', () => {
  if(!containsPoint()) {
    appendNumber('.');
  }
});

one.addEventListener('click', () => {
  appendNumber(1);
});

two.addEventListener('click', () => {
  appendNumber(2);
});

three.addEventListener('click', () => {
  appendNumber(3);
});

four.addEventListener('click', () => {
  appendNumber(4);
});

five.addEventListener('click', () => {
  appendNumber(5);
});

six.addEventListener('click', () => {
  appendNumber(6);
});

seven.addEventListener('click', () => {
  appendNumber(7);
});

eight.addEventListener('click', () => {
  appendNumber(8);
});

nine.addEventListener('click', () => {
  appendNumber(9);
});

zero.addEventListener('click', () => {
  appendNumber(0);
});


add.addEventListener('click', () => {
  setOperation((a, b) => +a + +b);
});

multiply.addEventListener('click', () => {
  setOperation((a, b) => +a * +b);
});

substract.addEventListener('click', () => {
  setOperation((a, b) => +a - +b);
});

divide.addEventListener('click', () => {
  setOperation((a, b) => +a / +b);
});

equals.addEventListener('click', () => {
  if(currentNumber === '') { return; }
  currentNumber = currentOperation(lastNumber, currentNumber);
  truncateCurrentNumber();
  screen.innerText = currentNumber;
});

clear.addEventListener('click', () => {
  lastNumber = '';
  currentNumber = '';
  currentOperation = (a, b) => b;
  screen.innerText = currentNumber;
});

opposite.addEventListener('click', () => {
  if(currentNumber !== '') {
    currentNumber = (+currentNumber * -1).toString();
    screen.innerText = currentNumber;
  } 
});

percent.addEventListener('click', () => {
  if(currentNumber !== '0') {
    currentNumber = (+currentNumber / 100).toString();
    truncateCurrentNumber();
    screen.innerText = currentNumber;
  }
});

buttons.forEach((b) => {
  b.addEventListener('mousedown', () => {
    clickSound.cloneNode().play();
  });
});

document.onkeydown = (key) => {
  key = key || window.event;
  switch(key.code) {
    case 'Numpad1':
    case 'Digit1': one.click(); break;
    case 'Numpad2':
    case 'Digit2': two.click(); break;
    case 'Numpad3':
    case 'Digit3': three.click(); break;
    case 'Numpad4':
    case 'Digit4': four.click(); break;
    case 'Numpad5':
    case 'Digit5': five.click(); break;
    case 'Numpad6':
    case 'Digit6': six.click(); break;
    case 'Numpad7':
    case 'Digit7': seven.click(); break;
    case 'Numpad8':
    case 'Digit8': eight.click(); break;
    case 'Numpad9':
    case 'Digit9': nine.click(); break;
    case 'Numpad0':
    case 'Digit0': zero.click(); break;
    case 'NumpadDecimal':
    case 'Period': point.click(); break;

    case 'NumpadAdd': add.click(); break;
    case 'NumpadSubstract': substract.click(); break;
    case 'NumpadDivide': divide.click(); break;
    case 'NumpadMultiply': multiply.click(); break;
    
    case 'Enter': equals.click(); break;
  };

  switch(key.key) {
    case '+': add.click(); break;
    case '-': substract.click(); break;
    case '/': divide.click(); break;
    case '*': multiply.click(); break;
    case '%': percent.click(); break;
    case '=': equals.click(); break;
  }
};