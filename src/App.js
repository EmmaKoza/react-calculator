import React, { Component } from 'react'
import './App.css'
import Key from './Key.js'

const initialState = {
  displayVal: 0,
  prevVal: null,
  previousKey: '',
  operator: '',
  calculation: null
}

class App extends Component {
  state = initialState;

  // helper funcs
  calculate = (firstNumber, operator, secondNumber) => {
    switch (operator) {
      case 'divide':
        return firstNumber / secondNumber
      case 'multiply':
        return firstNumber * secondNumber
      case 'subtract':
        return firstNumber - secondNumber
      default:
        return firstNumber + secondNumber
    }
  }
  keepCurrentCalculation = () => {
    const {
      operator,
      calculation,
      displayVal,
      prevVal
    } = this.state

    if (operator && prevVal) {
      if (calculation === null) {
        const calculation = this.calculate(prevVal, operator, displayVal)
        this.setState({ calculation, displayVal: calculation })
      } else {
        const updatedCalculation = this.calculate(calculation, operator, displayVal)
        this.setState({ calculation: updatedCalculation, displayVal: updatedCalculation })
      }
    }
  }

  operatorClickHelper = (operator) => {
    this.setState({ operator })
    const { displayVal } = this.state
    this.setState({ previousKey: 'operator' })
    this.setState({ prevVal: displayVal })
  }

  // event handlers
  handleClickClear = () => {
    this.setState(initialState)
  }
  handleClickDivide = () => {
    this.keepCurrentCalculation()
    this.operatorClickHelper('divide')
  }
  handleClickAdd = () => {
    this.keepCurrentCalculation()
    this.operatorClickHelper('add')
  }
  handleClickMultiply = () => {
    this.keepCurrentCalculation()
    this.operatorClickHelper('multiply')
  }
  handleClickSubtract = () => {
    this.keepCurrentCalculation()
    this.operatorClickHelper('subtract')
  }
  handleClickNumber = (e) => {
    this.setState({ previousKey: 'number' })
    const number = e.target.value
    const { displayVal, previousKey } = this.state
    if (displayVal === 0 || previousKey === 'operator') {
      this.setState({ displayVal: number })
    } else {
      this.setState({ displayVal: displayVal + number })
    }
  }
  handleClickDecimal = () => {
    const { previousKey } = this.state
    if (previousKey === 'operator') {
      this.setState({ displayVal: 0 + '.' })
    }
    this.setState({ displayVal: this.state.displayVal + '.' })
    this.setState({ previousKey: 'decimal' })
  }
  handleClickCalculate = () => {
    const {
      currentCalculation,
      operator,
      prevVal,
      displayVal
    } = this.state
    let n1
    let n2
    if (currentCalculation) {
      n1 = currentCalculation
      n2 = parseFloat(displayVal)
    } else {
      n1 = parseFloat(prevVal)
      n2 = parseFloat(displayVal)
    }
    this.setState({ displayVal: this.calculate(n1, operator, n2) })
  }

  render () {
    return (
      <div className='App'>
        <div className='calculator'>
          <div className='display'>
            <p>{this.state.displayVal}</p>
          </div>
          <div className='calculator--keys'>
            <Key type='operator' value='+' onClick={this.handleClickAdd} />
            <Key type='operator' value='-' onClick={this.handleClickSubtract} />
            <Key type='operator' value='×' onClick={this.handleClickMultiply} />
            <Key type='operator' value='÷' onClick={this.handleClickDivide} />
            <Key type='number' value='7' onClick={this.handleClickNumber} />
            <Key type='number' value='8' onClick={this.handleClickNumber} />
            <Key type='number' value='9' onClick={this.handleClickNumber} />
            <Key type='equal' value='=' onClick={this.handleClickCalculate} />
            <Key type='number' value='4' onClick={this.handleClickNumber} />
            <Key type='number' value='5' onClick={this.handleClickNumber} />
            <Key type='number' value='6' onClick={this.handleClickNumber} />
            <Key type='number' value='1' onClick={this.handleClickNumber} />
            <Key type='number' value='2' onClick={this.handleClickNumber} />
            <Key type='number' value='3' onClick={this.handleClickNumber} />
            <Key type='number' value='0' onClick={this.handleClickNumber} />
            <Key type='decimal' value='.' onClick={this.handleClickDecimal} />
            <Key type='clear' value='AC' onClick={this.handleClickClear} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
