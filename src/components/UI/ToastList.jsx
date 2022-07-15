import React from 'react'
import classes from './ToastList.module.css'
import Toast from './Toast'
const ToastList = ({ toasts }) => {
  if (toasts.length === 0) return
  return (
    <div className={classes['toast-list']}>
      {toasts.map((toast) => {
        return <Toast key={toast.id} config={toast} />
      })}
    </div>
  )
}
export default ToastList
