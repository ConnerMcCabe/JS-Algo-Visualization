//Things to do later; 
//styling, fix preview window (shows two blocks ahead instead of one), make clear and concise html rework
const width = 10;
const grid = document.querySelector('.grid')
const scoreDis = document.querySelector('#score')
const startBtn = document.querySelector('#start-button')
const colors = ['orange', 'red', 'purple', 'green', 'blue']
let squares = Array.from(document.querySelectorAll('.grid div'))
let nextRandom = 0
let score = 0
let timerId 

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
    squares[currentPosition + index].style.backgroundColor = colors[random]
  })
}
//undraw the tetro
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
    squares[currentPosition + index].style.backgroundColor = ''
  })
}
//the falling tetro interval
// timerId = setInterval(moveDown, 1000)

//key control
function control(e) {
  if(e.keyCode === 37){
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  }  else if (e.keyCode === 39) {
    moveRight()
  }  else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)

function moveDown() {
  undraw()
  currentPosition += width 
  draw()
  freeze()
}
//freeze the bottom
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    random = nextRandom
    nextRandom = Math.floor(Math.random() * tetrominoes.length)
    current = tetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
  }
}

function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge) currentPosition -= 1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1
  }
    draw()
}

function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
  if(!isAtRightEdge) currentPosition += 1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1
  }
    draw()
}

function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) {
    currentRotation = 0
  }
  current = tetrominoes[random][currentRotation]
  draw()
}

//show next tetro
const displaySquares = document.querySelectorAll('.miniGrid div')
const displayWidth = 4
let displayIndex = 0

const upNext = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2],
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
  [1, displayWidth, displayWidth + 1, displayWidth + 2],
  [0, 1, displayWidth, displayWidth + 1],
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
]

function displayShape() {
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
    square.style.backgroundColor = ''
  })
  upNext[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
    displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]

  })
}

startBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  } else {
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random() * tetrominoes.length)
    displayShape()
  }
})

function addScore() {
  for (let i = 0; i < 199; i += width)  {
    const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
    if (row.every(index => squares[index].classList.contains('taken'))) {
      score += 10
      scoreDis.innerHTML = score
      row.forEach(index => {
        squares[index].classList.remove('taken')
        squares[index].classList.remove('tetromino')
        squares[index].style.backgroundColor = ''
      })
      const squaresRemoved = squares.splice(i, width)
      squares = squaresRemoved.concat(squares)
      squares.forEach(cell => grid.appendChild(cell))
    }
  }
}

//game over
function gameOver() {
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDis.innerHTML = 'GameOver'
    clearInterval(timerId)
  }
}