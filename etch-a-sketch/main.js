const board = document.querySelector('#board');
const clear = document.querySelector('#clear');
const resize = document.querySelector('#resize');
const resizeModal = document.querySelector('#resize-modal');
const resizeModalCancel = document.querySelector('#resize-modal-cancel');
const resizeModalConfirm = document.querySelector('#resize-modal-confirm');
const resizeModalInput = document.querySelector('#resize-modal-input');
const resizeModalWarning = document.querySelector('#resize-modal-warning');

let width = 32;
let height = 32;

let tiles = [];
let mouseDown = 0;
document.body.addEventListener('mousedown', () => {
  mouseDown = (mouseDown + 1) % 2;
});
document.body.addEventListener('mouseup', () => {
  mouseDown = 0;
});

const destroyGrid = () => {
  while(board.firstChild) {
    board.removeChild(board.firstChild);
  }
  tiles = [];
};

const paintTile = (tile) => {
  tile.style.opacity = Math.min(+tile.style.opacity + 0.1, 1).toString();
};

const buildGrid = (w, h) => {
  destroyGrid();
  for(let y = 0; y < h; ++y) {
    const row = document.createElement('div');
    row.setAttribute('draggable', 'false');
    row.classList.add('row');
    row.style.height = 100/h+'%';
    board.appendChild(row);
    for(let x = 0; x < w; ++x) {
      const tile = document.createElement('div');
      tile.setAttribute('draggable', 'false');
      tile.style.width = 100/w + '%';
      tile.style.height = '100%';
      tile.classList.add('tile');
      tile.addEventListener('mousedown', (e) => paintTile(e.target));
      tile.addEventListener('mouseover', (e) => {
        if(mouseDown) {
          paintTile(e.target);
        }
      });
      row.appendChild(tile);
      tiles.push(tile);
    }
  }
};

clear.addEventListener('click', () => {
  tiles.forEach((tile) => { 
   tile.style.opacity = '0'; 
  });
});

resize.addEventListener('click', () => {
  resizeModal.removeAttribute('hidden');
});

resizeModalCancel.addEventListener('click', () => {
  resizeModal.setAttribute('hidden', '');
})

resizeModalConfirm.addEventListener('click', () => {
  const width = +resizeModalInput.value;
  resizeModalCancel.disabled = true;
  resizeModalConfirm.disabled = true;
  buildGrid(width, width);
  resizeModal.setAttribute('hidden', '');
  resizeModalCancel.disabled = false;
  resizeModalConfirm.disabled = false;
});

document.querySelectorAll('.range-container').forEach((e) => {
  let range = e.querySelector(':scope > .input-range');
  let text = e.querySelector(':scope > .input-range-text');
  text.textContent = range.value
  range.addEventListener('change', (e) => {
    text.textContent = e.target.value;
  });
});

const resizeModalInputUpdated = (value) => {
  if(value <= 64) {
    resizeModalWarning.setAttribute('hidden', '');
  } else {
    resizeModalWarning.removeAttribute('hidden');
  }
}
resizeModalInput.addEventListener('change', (e) => {
  resizeModalInputUpdated(+e.target.value);
})

resizeModalInputUpdated(+resizeModalInput.value);
buildGrid(width, height);