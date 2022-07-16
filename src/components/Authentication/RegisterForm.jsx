import React, { useState } from 'react'
import classes from './RegisterForm.module.css'
import FormButton from '../UI/FormButton'
import FormInput from '../UI/FormInput'
import { useDispatch } from 'react-redux'
import { showToastWithTimeout } from '../../store/ui'
const RegisterForm = ({ onSendForm }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }
  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }
  const nameChangeHandler = (event) => {
    setName(event.target.value)
  }
  const password2ChangeHandler = (event) => {
    setPassword2(event.target.value)
  }
  const validateForm = (form) => {
    const errors = []
    if (form.username.length === 0) errors.push('Username is required')
    if (form.password.length === 0) errors.push('Password is required')
    if (form.name.length === 0) errors.push('Name is required')
    if (form.email.length === 0) errors.push('Email is required')
    if (form.password !== form.password2) errors.push('Passwords must match')
    errors.forEach((error) => {
      dispatch(
        showToastWithTimeout({
          type: 'Error',
          message: error
        })
      )
    })
    return errors.length === 0
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    const registerForm = {
      name,
      username,
      password,
      password2,
      email
    }
    const validForm = validateForm(registerForm)
    if (validForm) {
      delete registerForm.password2
      await onSendForm(registerForm)
    }
  }
  return (
    <form className={classes['login-form']}>
      <FormInput
        value={name}
        onChange={nameChangeHandler}
        autofocus={true}
        type="text"
        placeholder="Write your name"
      />
      <FormInput
        value={username}
        onChange={usernameChangeHandler}
        type="text"
        placeholder="Write your username"
      />
      <FormInput
        value={email}
        onChange={emailChangeHandler}
        type="text"
        placeholder="Write your email"
      />
      <FormInput
        value={password}
        onChange={passwordChangeHandler}
        type="password"
        placeholder="Write a password"
      />
      <FormInput
        value={password2}
        onChange={password2ChangeHandler}
        type="password"
        placeholder="Repeat your password"
        onPressEnter={submitHandler}
      />
      <FormButton type="submit" onClick={submitHandler} value="Signin" />
    </form>
  )
}
export default RegisterForm
