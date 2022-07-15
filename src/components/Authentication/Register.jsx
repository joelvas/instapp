import React from 'react'
import classes from './Register.module.css'
import RegisterForm from './RegisterForm'
const Register = ({ onClickLogin }) => {
  const clickLoginHandler = () => {
    onClickLogin()
  }
  return (
    <section className={classes.register}>
      <span className={classes.register__title}>Register</span>
      <RegisterForm />
      <div className={classes.register__more}>
        <span className={classes.register__more__text}>Have an account?</span>
        <span
          onClick={clickLoginHandler}
          className={classes.register__more__link}
        >
          Log in
        </span>
      </div>
    </section>
  )
}
export default Register
