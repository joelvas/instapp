import React from 'react'
import classes from './Toast.module.css'
const Toast = ({ config }) => {
  return (
    <div
      style={{ animationDuration: config.timeout + 's' }}
      className={`
      ${classes.toast}
      ${config.show ? classes.active : ''}
      ${config.type === 'Error' ? classes.error : ''}
      ${config.type === 'Success' ? classes.success : ''}
      ${config.type === 'Info' ? classes.info : ''}
      ${config.type === 'Warning' ? classes.warning : ''}
    `}
    >
      <div className={classes.toast__header}>
        <span className={classes.toast__header__title}>
          {config.error ?? config.type}
        </span>
      </div>
      <div className={classes.toast__header__body}>{config.message}</div>
    </div>
  )
}
export default Toast
