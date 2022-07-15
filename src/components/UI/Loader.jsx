import React from 'react'
import classes from './Loader.module.css'
const Loader = () => {
  return (
    <div className={classes['spinner-loader']}>
      <div className={classes.inner}></div>
      <div className={classes.outer}></div>
    </div>
  )
}
export default Loader
