import React from 'react'
import classes from './ImagesList.module.css'
const ImagesList = ({ images, onClickRemove }) => {
  const removeImageHandler = (id) => {
    onClickRemove(id)
  }
  return (
    <ul className={classes['images-list']}>
      {images.map((image) => {
        return (
          <li
            key={image.id}
            className={classes['images-list__item']}
            onClick={() => {
              removeImageHandler(image.id)
            }}
          >
            <div
              className={classes['images-list__item__image']}
              style={{ backgroundImage: `url('${image.src}')` }}
              alt="image"
              width={50}
            ></div>
            <span className={classes['images-list__item__close']}>X</span>
          </li>
        )
      })}
    </ul>
  )
}
export default ImagesList
