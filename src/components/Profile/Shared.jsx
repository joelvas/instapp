import React, { useState } from 'react'
import classes from './Shared.module.css'
import MyPosts from './MyPosts'
import SavedPosts from './SavedPosts'
import { useSelector } from 'react-redux'
const Shared = () => {
  const [sliderPosition, setSliderPosition] = useState(0)
  const myFavorites = useSelector((state) => state.user.favorites)
  const myPosts = useSelector((state) => state.user.myPosts)
  const toggleSlider = (index) => {
    setSliderPosition(index)
  }
  return (
    <div className={classes.shared}>
      <div className={classes.shared__heading}>
        <span
          className={sliderPosition === 0 ? classes.active : ''}
          onClick={() => {
            toggleSlider(0)
          }}
        >
          My posts
        </span>
        <span
          className={sliderPosition === 1 ? classes.active : ''}
          onClick={() => {
            toggleSlider(1)
          }}
        >
          Saved Posts
        </span>
      </div>
      <div
        className={classes.shared__slider}
        style={{ right: sliderPosition * 100 + '%' }}
      >
        <MyPosts posts={myPosts} />
        <SavedPosts posts={myFavorites.map((f) => f.post)} />
      </div>
    </div>
  )
}
export default Shared
