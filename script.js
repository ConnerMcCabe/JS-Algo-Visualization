//Tetris is cool

let sum;

let displayEl = document.querySelector('h1');
let input = document.getElementById('numba');

document.getElementById('add').addEventListener('click', function() {
  sum += parseFloat(input.value)
  render();
});

document.getElementById('subtract').addEventListener('click', function() {
  sum -= parseFloat(input.value)
  render();
});

function init() {
  sum = 0;
  render();
}

function render() {
  displayEl.textContent = sum;
};

init();