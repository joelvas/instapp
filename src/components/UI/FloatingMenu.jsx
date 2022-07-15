import React from 'react'
import classes from './FloatingMenu.module.css'
const FloatingMenu = ({ active, children }) => {
  return (
    <div
      className={`
      ${classes['floating-menu']} 
      ${!active ? classes.disabled : ''}
      `}
    >
      {children}
    </div>
  )
}
export default FloatingMenu
