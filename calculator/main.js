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

const triggerMouseEvent = (node, eventType) => {
  var clickEvent = document.createEvent ('MouseEvents');
  clickEvent.initEvent (eventType, true, true);
  node.dispatchEvent (clickEvent);
}


const getButtonFromKeyEvent = (key) => {
  let button;
  switch(key.code) {
    case 'Numpad1':
    case 'Digit1': button = one; break;
    case 'Numpad2':
    case 'Digit2': button = two; break;
    case 'Numpad3':
    case 'Digit3': button = three; break;
    case 'Numpad4':
    case 'Digit4': button = four; break;
    case 'Numpad5':
    case 'Digit5': button = five; break;
    case 'Numpad6':
    case 'Digit6': button = six; break;
    case 'Numpad7':
    case 'Digit7': button = seven; break;
    case 'Numpad8':
    case 'Digit8': button = eight; break;
    case 'Numpad9':
    case 'Digit9': button = nine; break;
    case 'Numpad0':
    case 'Digit0': button = zero; break;
    case 'NumpadDecimal':
    case 'Period': button = point; break;

    case 'NumpadAdd': button = add; break;
    case 'NumpadSubstract': button = substract; break;
    case 'NumpadDivide': button = divide; break;
    case 'NumpadMultiply': button = multiply; break;
    
    case 'NumpadEnter':
    case 'Enter': button = equals; break;

    case 'Escape': button = clear; break;
  };

  switch(key.key) {
    case '+': button = add; break;
    case '-': button = substract; break;
    case '/': button = divide; break;
    case '*': button = multiply; break;
    case '%': button = percent; break;
    case '=': button = equals; break;
  }
  return button;
};

document.onkeydown = (key) => {
  key = key || window.event;
  let button = getButtonFromKeyEvent(key);

  if(button) {
    button.classList.add('active');
    triggerMouseEvent(button, 'mousedown');
  }
};

document.onkeyup = (key) => {
  key = key || window.event;
  let button = getButtonFromKeyEvent(key);

  if(button) {
    button.classList.remove('active');
    triggerMouseEvent(button, 'mouseup');
    button.click();
  }
};