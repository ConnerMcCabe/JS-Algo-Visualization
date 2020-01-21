//basically wanted to go back and do some of these timed tests
//I gave myself 30 minutes to do some basic DOM manipulation based on an individual assessment from SEI
//the idea is to make a UI that has a counter, two buttons for adding or subtracting and an input for numbers

let sum;

let displayEl = document.querySelector('h1 span');
let input = document.getElementById('numba');

document.getElementById('add').addEventListener('click', function() {
  sum += parseFloat(input.value)
  render();
});

document.getElementById('subtract').addEventListener('click', function() {
  sum -= parseFloat(input.value)
  render();
});



