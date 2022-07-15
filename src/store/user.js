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
    setFollowers: (state, action) => {},
    setFollowing: (state, action) => {},
    addFollowing: (state, action) => {},
    removeFollowing: (state, action) => {}
  }
})

export default userSlice.reducer
export const userActions = userSlice.actions
