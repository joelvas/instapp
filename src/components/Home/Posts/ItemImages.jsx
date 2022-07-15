import React, { useState } from 'react'
import classes from './ItemImages.module.css'
const ItemImages = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0])
  const [position, setPosition] = useState(0)
  const loadedImage = (e) => {
    e.target.style = 'display: block'
  }
  const clickRightHandler = () => {
    const index = images.indexOf(currentImage)
    if (index === images.length - 1) {
      setCurrentImage(images[0])
      setPosition(0)
    } else {
      setCurrentImage(images[index + 1])
      setPosition(position + 100)
    }
  }
  const clickLeftHandler = () => {
    const index = images.indexOf(currentImage)
    if (index === 0) {
      setCurrentImage(images[images.length - 1])
      setPosition(100 * (images.length - 1))
    } else {
      setCurrentImage(images[index - 1])
      setPosition(position - 100)
    }
  }
  return (
    <div className={classes['item-images']}>
      <span
        onClick={clickLeftHandler}
        className={`${classes['item-images__left']} ${
          images.length === 0 || images.indexOf(currentImage) === 0
            ? classes.hidden
            : ''
        }`}
      >
        {'<'}
      </span>

      <span
        onClick={clickRightHandler}
        className={`${classes['item-images__right']} ${
          images.length === 0 ||
          images.indexOf(currentImage) === images.length - 1
            ? classes.hidden
            : ''
        }`}
      >
        {'>'}
      </span>
      <div
        className={classes['item-images__slider']}
        style={{ right: position + '%' }}
      >
        {images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.url}
              id={image.id}
              alt="photo"
              style={{
                display: 'block'
              }}
              onLoad={(e) => loadedImage(e, image.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ItemImages
