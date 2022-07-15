import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui'
import feedReducer from './feed'
import authReducer from './auth'
import userReducer from './user'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    feed: feedReducer,
    auth: authReducer,
    user: userReducer
  }
})

export default store
