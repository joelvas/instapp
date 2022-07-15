import React from 'react'
import classes from './FormInput.module.css'
const FormInput = ({ type, placeholder, onChange, value, onPressEnter, autofocus }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      autoFocus={autofocus}
      className={classes['form-input']}
      onKeyUp={(e) => {
        if (e.code === 'Enter') {
          onPressEnter(e)
        }
      }}
      type={type}
      placeholder={placeholder}
    />
  )
}
export default FormInput
