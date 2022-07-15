import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: {
      list: []
    }
  },
  reducers: {
    addToast: (state, action) => {
      const toast = {
        id: action.payload.id,
        error: action.payload.error ?? null,
        message: action.payload.message,
        type: action.payload.type,
        show: true,
        timeout: 2.5
      }
      state.toast.list.push(toast)
    },
    removeToast: (state, action) => {
      state.toast.list = state.toast.list.filter(
        (toast) => toast.id !== action.payload.id
      )
    }
  }
})

export default uiSlice.reducer
export const uiActions = uiSlice.actions
export const showToastWithTimeout = ({ type, message, error }) => {
  return async (dispatch) => {
    const id = Math.random()
    await dispatch(
      uiActions.addToast({
        id,
        error,
        message,
        type
      })
    )
    setTimeout(() => {
      dispatch(uiActions.removeToast({ id }))
    }, 2500)
  }
}
