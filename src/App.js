import React, { Component } from 'react';
import './App.css';
import Key from './Button.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentVal: 0,
      prevVal: null,
      lastClickedKey: '',
      operator: '',
      calculation: null,
    }
    this.handleClickNumber = this.handleClickNumber.bind(this);
    this.handleClickDivide = this.handleClickDivide.bind(this);
    this.handleClickMultiply = this.handleClickMultiply.bind(this);
    this.handleClickSubtract = this.handleClickSubtract.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickDecimal = this.handleClickDecimal.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickCalculate= this.handleClickCalculate.bind(this);
    this.calculate = this.calculate.bind(this);
    this.keepCurrentCalculation = this.keepCurrentCalculation.bind(this);
    this.operatorClickHelper = this.operatorClickHelper.bind(this);
  }

  // helper funcs
  calculate(firstNumber, operator, secondNumber) {
    if (operator === 'divide') {
      return firstNumber / secondNumber;
    } else if (operator === 'multiply') {
      return firstNumber * secondNumber;
    } else if (operator === 'subtract') {
      return firstNumber - secondNumber;
    } else {
      return firstNumber + secondNumber;
    }
  }
  keepCurrentCalculation() {
    const currentVal = parseFloat(this.state.currentVal);
    const prevVal = parseFloat(this.state.prevVal);
    const operator = this.state.operator;
    const currentCalculation = this.state.calculation;

    if (operator && prevVal && currentCalculation === null) { 
      const calculation = this.calculate(prevVal, operator, currentVal);
      this.setState({ calculation: calculation, currentVal: calculation });
    } else if(operator && prevVal && currentCalculation) {
      const updatedCalculation = this.calculate(currentCalculation, operator, currentVal);
      this.setState({ calculation: updatedCalculation, currentVal: updatedCalculation });
    }
  }

  operatorClickHelper(operator) {
    this.setState({ operator: operator });
    const currentNumber = this.state.currentVal;
    this.setState({ lastClickedKey: 'operator' });
    this.setState({ prevVal: currentNumber });
  }
 
  // event handlers
  handleClickClear() {
    this.setState({ currentVal: 0 });
  }
  handleClickDivide() {
    this.keepCurrentCalculation();
    this.operatorClickHelper('divide');

  }
  handleClickAdd() {
    this.keepCurrentCalculation();
    this.operatorClickHelper('add');
  }
  handleClickMultiply() {
    this.keepCurrentCalculation();
    this.operatorClickHelper('multiply');
   
  }
  handleClickSubtract() {
    this.keepCurrentCalculation();
    this.operatorClickHelper('subtract');
  }
  handleClickNumber(e) {
    this.setState({lastClickedKey: 'number'});
    const number = e.target.value;
    const displayedNum = this.state.currentVal;
    const previousKey = this.state.lastClickedKey;
    if (displayedNum === 0 || previousKey === 'operator') {
      this.setState({ currentVal:number });
    } else {
      this.setState({ currentVal: displayedNum + number });
    }
  }
  handleClickDecimal() {
    const previousKeyType = this.state.lastClickedKey;
    if(previousKeyType === 'operator'){
      this.setState({currentVal: 0 + '.'});
    }
    this.setState({currentVal: this.state.currentVal +'.'});
    this.setState({ lastClickedKey:'decimal' });
  }
  handleClickCalculate() {
    const currentCalculation = this.state.calculation;
    const operator = this.state.operator;
    let n1;
    let n2;
    if (currentCalculation) {
      n1 = currentCalculation;
      n2 = parseFloat(this.state.currentVal);
    } else {
      n1 = parseFloat(this.state.prevVal);
      n2 = parseFloat(this.state.currentVal);
    }
    this.setState({ currentVal: this.calculate(n1, operator, n2) });
 
  }
 
  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div className="display">
            <p>{this.state.currentVal}</p>
          </div>
          <div className="calculator--keys">
            <Key className="key--operator" value="+" onClick={this.handleClickAdd}/>
            <Key className="key--operator" value="-" onClick={this.handleClickSubtract}/>
            <Key className="key--operator" value="×"onClick={this.handleClickMultiply}/>
            <Key className="key--operator" value="÷" onClick={this.handleClickDivide}/>
            <Key className="key--number" value="7" onClick={this.handleClickNumber}/>
            <Key className="key--number" value="8"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="9"onClick={this.handleClickNumber}/>
            <Key className="key--equal" value="=" onClick={this.handleClickCalculate}/>
            <Key className="key--number" value="4"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="5"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="6"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="1"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="2"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="3"onClick={this.handleClickNumber}/>
            <Key className="key--number" value="0"onClick={this.handleClickNumber}/>
            <Key className="key--decimal" value="." action={"decimal"} onClick={this.handleClickDecimal}/>
            <Key className="key--clear" value="AC" action={"clear"} onClick={this.handleClickClear} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
