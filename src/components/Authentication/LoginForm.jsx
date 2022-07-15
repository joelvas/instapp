import React, { useState } from 'react'
import classes from './LoginForm.module.css'
import FormInput from '../UI/FormInput'
import FormButton from '../UI/FormButton'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    setLoading(true)
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
    setLoading(false)
  }
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <form className={classes['login-form']}>
      <FormInput
        onChange={usernameChangeHandler}
        type="text"
        value={username}
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
      <FormButton onClick={submitHandler} type="button" value="Signin" />
    </form>
  )
}
export default LoginForm
