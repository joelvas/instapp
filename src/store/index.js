import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui'
import feedReducer from './feed'
import authReducer from './auth'
import userReducer from './user'
import socketReducer from './socket'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    feed: feedReducer,
    auth: authReducer,
    user: userReducer,
    socket: socketReducer
  }
})

export default store
