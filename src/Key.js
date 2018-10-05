import React from 'react'
import './App.css'

const Key = (props) => {
  return (
    <button className={typesToClassnames[props.type]} onClick={props.onClick} value={props.value}>
      {props.value}
    </button>
  )
}

const typesToClassnames = {
  operator: 'key--operator',
  number: 'key--number',
  decimal: 'key--decimal',
  equal: 'key--equal',
  clear: 'key--clear'
}

export default Key
