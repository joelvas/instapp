import React, { useState } from 'react'
import classes from './Login.module.css'
import LoginForm from './LoginForm'
import { authActions } from '../../store/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Loader from '../UI/Loader'
import { showToastWithTimeout } from '../../store/ui'
const Login = ({ onClickRegister }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const clickRegisterHandler = () => {
    onClickRegister()
  }
  const loginHandler = async (loginForm) => {
    setLoading(true)
    const res = await axios
      .post(import.meta.env.VITE_API_URL + '/auth/login', loginForm)
      .catch((error) => {
        setLoading(false)
        dispatch(
          showToastWithTimeout({
            type: 'Error',
            message:
              error.response.status === 400
                ? error?.response?.data?.message
                : error?.response?.status === 401 ? 'Check your credentials' : 'Something went wrong',
            header: error?.response?.data?.error ?? null
          })
        )
      })
    if (res && res.status === 200) {
      const authInfo = res.data
      authInfo.user.roles = authInfo.user.roles.map((role) => role.authority)
      dispatch(authActions.setToken(authInfo.token))
      dispatch(authActions.setUser(authInfo.user))
      localStorage.setItem('token', authInfo.token)
      localStorage.setItem('user', JSON.stringify(authInfo.user))
      dispatch(authActions.setIsAuthenticated(true))
      dispatch(
        showToastWithTimeout({
          type: 'Success',
          message: 'Login successful'
        })
      )
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <form className={classes.login}>
        <Loader />
        <span style={{ margin: 'auto' }}>loading...</span>
      </form>
    )
  }
  return (
    <section className={classes.login}>
      <span className={classes.login__title}>Login</span>
      <LoginForm onSendForm={loginHandler} />
      <div className={classes.login__more}>
        <span className={classes.login__more__text}>
          {"Don't you have an account?"}
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
