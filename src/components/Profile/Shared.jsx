import React, { useState, useEffect } from 'react'
import classes from './Shared.module.css'
import { useParams } from 'react-router-dom'
import MyPosts from './MyPosts'
import SavedPosts from './SavedPosts'
const Shared = () => {
  const [sliderPosition, setSliderPosition] = useState(0)
  const toggleSlider = (index) => {
    setSliderPosition(index)
  }
  const { username } = useParams()
  useEffect(() => {
    setSliderPosition(0)
  }, [username])
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
        <MyPosts />
        <SavedPosts />
      </div>
    </div>
  )
}
export default Shared
