import React, { useState } from 'react'
import classes from './Authentication.module.css'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
const Authentication = () => {
  const [isLogining, setIsLogining] = useState(true)
  const toggleLogin = () => {
    setIsLogining(!isLogining)
  }
  return (
    <main className={classes.authentication}>
      {isLogining && <Login onClickRegister={toggleLogin} />}
      {!isLogining && <Register onClickLogin={toggleLogin} />}
    </main>
  )
}
export default Authentication
