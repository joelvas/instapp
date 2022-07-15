import { createSlice } from '@reduxjs/toolkit'

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    content: []
  },
  reducers: {
    setFeed: (state, action) => {
      state.content = action.payload.content
    },
    addPost: (state, action) => {
      state.content.unshift(action.payload)
    },
    likePost: (state, action) => {
      state.content = state.content.map((post) => {
        if (post.id === action.payload.id) {
          if (post.likes === null) post.likes = []
          post.likes.push(action.payload.like)
        }
        return post
      })
    },
    unlikePost: (state, action) => {
      state.content = state.content.map((post) => {
        if (post.id === action.payload.id) {
          post.likes = post.likes.filter((like) => like.user.id !== 4)
        }
        return post
      })
    },
    commentPost: (state, action) => {
      state.content = state.content.map((post) => {
        if (post.id === action.payload.id) {
          if (post.comments === null) post.comments = []
          post.comments.push(action.payload.comment)
        }
        return post
      })
    },
    removeComment: (state, action) => {}
  }
})

export default feedSlice.reducer
export const feedActions = feedSlice.actions
