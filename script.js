// CLEARING TETRIS OFF THE BOARD FOR CALCULATOR 
class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand
    this.currentOperand = currentOperand
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {

  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    this.operation = operation
    this.previousOperand =  this.previousOperand
    this.currentOperand = ''
  }

  compute() {

  }

  updateDisplay() {
    this.currentOperand.innerText = this.currentOperand
  }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperand, currentOperand)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})