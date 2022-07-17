import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    favorites: [],
    myPosts: [],
    followers: [],
    following: []
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action) => {
      state.favorites.unshift(action.payload)
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.post.id !== action.payload
      )
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload
    },
    setFollowers: (state, action) => {
      state.followers = action.payload
    },
    setFollowing: (state, action) => {
      state.following = action.payload
    },
    addFollowing: (state, action) => {
      state.following.unshift(action.payload)
    },
    removeFollowing: (state, action) => {
      state.following = state.following.filter(
        (fn) => fn.username !== action.payload
      )
    }
  }
})

export default userSlice.reducer
export const userActions = userSlice.actions
