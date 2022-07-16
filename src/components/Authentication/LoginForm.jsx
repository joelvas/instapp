import React, { useState } from 'react'
import classes from './LoginForm.module.css'
import FormInput from '../UI/FormInput'
import FormButton from '../UI/FormButton'
import { useDispatch } from 'react-redux'
import { showToastWithTimeout } from '../../store/ui'
const LoginForm = ({ onSendForm }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const loginForm = { username, password }
    const validForm = validateForm(loginForm)
    if (validForm) {
      const success = onSendForm(loginForm)
      if (success) {
        setUsername('')
        setPassword('')
      }
    }
  }

  const validateForm = (loginForm) => {
    const errors = []
    if (loginForm.username.length === 0) errors.push('Username is required')
    if (loginForm.password.length === 0) errors.push('Password is required')
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
  return (
    <form className={classes['login-form']}>
      <FormInput
        onChange={usernameChangeHandler}
        type="text"
        value={username}
        onPressEnter={submitHandler}
        autofocus={true}
        placeholder="Write your username"
      />
      <FormInput
        onChange={passwordChangeHandler}
        type="password"
        value={password}
        onPressEnter={submitHandler}
        placeholder="Write your password"
      />
      <FormButton onClick={submitHandler} type="button" value="Login" />
    </form>
  )
}
export default LoginForm
