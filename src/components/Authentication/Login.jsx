import React from 'react'
import classes from './Login.module.css'
import LoginForm from './LoginForm'
const Login = ({ onClickRegister }) => {
  const clickRegisterHandler = () => {
    onClickRegister()
  }
  return (
    <section className={classes.login}>
      <span className={classes.login__title}>Login</span>
      <LoginForm />
      <div className={classes.login__more}>
        <span className={classes.login__more__text}>
          {"Don't have an account?"}
        </span>
        <span
          onClick={clickRegisterHandler}
          className={classes.login__more__link}
        >
          Sign up
        </span>
      </div>
    </section>
  )
}
export default Login
