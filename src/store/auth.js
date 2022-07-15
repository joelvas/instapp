import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { showToastWithTimeout } from './ui'
import { userActions } from './user'
import { feedActions } from './feed'

const apiUrl = import.meta.env.VITE_API_URL

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    }
  }
})
export default authSlice.reducer
export const authActions = authSlice.actions
export const login = (authForm) => {
  return async (dispatch) => {
    const res = await axios
      .post(apiUrl + '/auth/login', authForm)
      .catch((error) => {
        console.log(error.response)
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
      dispatch(authActions.setUser(res.data.user))
      localStorage.setItem('token', authInfo.token)
      localStorage.setItem('user', JSON.stringify(authInfo.user))
      dispatch(authActions.setIsAuthenticated(true))
      dispatch(
        showToastWithTimeout({
          type: 'Success',
          message: 'Login successful'
        })
      )
    }
  }
}
export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(authActions.setUser(null))
    dispatch(authActions.setToken(null))
    dispatch(userActions.setFavorites([]))
    dispatch(userActions.setMyPosts([]))
    dispatch(authActions.setIsAuthenticated(false))
    dispatch(feedActions.setFeed({ content: [] }))
    dispatch(
      showToastWithTimeout({
        type: 'Success',
        message: 'Logout successful'
      })
    )
  }
}
