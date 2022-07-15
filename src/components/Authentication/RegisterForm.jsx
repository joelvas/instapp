import React from 'react'
import classes from './RegisterForm.module.css'
import FormButton from '../UI/FormButton'
import FormInput from '../UI/FormInput'
const RegisterForm = () => {
  return (
    <form className={classes['login-form']}>
      <FormInput autofocus={true} type="text" placeholder="Write your name" />
      <FormInput type="text" placeholder="Write your username" />
      <FormInput type="text" placeholder="Write your email" />
      <FormInput type="password" placeholder="Write a password" />
      <FormInput type="password" placeholder="Repeat your password" />
      <FormButton type="submit" value="Signin" />
    </form>
  )
}
export default RegisterForm
