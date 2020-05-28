//Tetris is cool
const width = 10;
const grid = document.querySelector('.grid')
const ScoreDis = document.querySelector('#score')
const StartBtn = document.querySelector('#start-button')
let squares = Array.from(document.querySelectorAll('.grid div'))

const lTetro = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetro = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetro = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
]

const oTetro = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
]

const iTetro = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
]

const tetrominoes = [lTetro, oTetro, zTetro, iTetro, tTetro]

let currentPosition = 4
let currentRotation = 0 

//random selection tetro
let random = Math.floor(Math.random() * tetrominoes.length)
console.log(random)

let current = tetrominoes[random][currentRotation]
//draw the tretro
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
  })
}
//undraw the tetro
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
  })
}