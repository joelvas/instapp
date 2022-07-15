import React from 'react'
import classes from './Images.module.css'
import ImagesList from './ImagesList'

const Images = ({ onAddImage, onRemoveImage, images }) => {
  const addImageHandler = (e) => {
    onAddImage(Array.from(e.target.files))
  }
  const removeImageHandler = (id) => {
    onRemoveImage(id)
  }
  return (
    <div className={classes.images}>
      {images.length < 2 && (
        <label className={classes.images__new}>
          Add image{' '}
          <input type="file" multiple hidden onChange={addImageHandler} />
        </label>
      )}
      <ImagesList images={images} onClickRemove={removeImageHandler} />
    </div>
  )
}
export default Images
