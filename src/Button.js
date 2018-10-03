import React from 'react'
import './App.css'

const Key= (props) => {
  return (
    <button className={props.className} onClick={props.onClick} value={props.value} action={props.action}>
      {props.value}
    </button>
  )
}

export default Key
