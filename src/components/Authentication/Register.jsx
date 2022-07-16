import React, { useState } from 'react'
import classes from './Register.module.css'
import RegisterForm from './RegisterForm'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Loader from '../UI/Loader'
import { showToastWithTimeout } from '../../store/ui'
const Register = ({ onClickLogin }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const clickLoginHandler = () => {
    onClickLogin()
  }
  const registerHandler = async (loginForm) => {
    setLoading(true)
    const res = await axios
      .post(import.meta.env.VITE_API_URL + '/auth/signup', loginForm)
      .catch((error) => {
        setLoading(false)
        dispatch(
          showToastWithTimeout({
            type: 'Error',
            message: error?.response?.data?.message ?? 'something went wrong',
            header: error?.response?.data?.error ?? 'something went wrong'
          })
        )
        return false
      })
    if (res && res.status === 201) {
      setLoading(false)
      dispatch(
        showToastWithTimeout({
          type: 'Success',
          message: 'Register successful'
        })
      )
      onClickLogin()
    }
  }
  if (loading) {
    return (
      <form className={classes.register}>
        <Loader />
        <span style={{ margin: 'auto' }}>loading...</span>
      </form>
    )
  }
  return (
    <section className={classes.register}>
      <span className={classes.register__title}>Register</span>
      <RegisterForm onSendForm={registerHandler} />
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
