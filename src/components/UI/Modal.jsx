import React from 'react'
import classes from './Modal.module.css'
const Modal = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modal__backdrop}></div>
      <div className={classes.modal__content}>{children}</div>
    </div>
  )
}
export default Modal
