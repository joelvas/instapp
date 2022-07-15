import React from 'react'
import classes from './FormButton.module.css'
const FormButton = ({ type, value, onClick }) => {
  return (
    <input
      onClick={onClick}
      className={classes['form-button']}
      type={type}
      value={value}
    />
  )
}
export default FormButton
