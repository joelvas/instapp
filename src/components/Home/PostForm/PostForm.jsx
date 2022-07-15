import React, { useState, useEffect } from 'react'
import classes from './PostForm.module.css'
import Images from './Images'
import { useDispatch } from 'react-redux'
import { showToastWithTimeout } from '../../../store/ui'
import Loader from '../../UI/Loader'
import { feedActions } from '../../../store/feed'
import useHttp from '../../../hooks/useHttp'
const PostForm = ({ onFinishedRequest }) => {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const { sendRequest } = useHttp()
  const dispatch = useDispatch()
  const addImageHandler = (imgs) => {
    let c = 0
    imgs.forEach((file) => {
      const image = {
        id: Math.random(),
        src: URL.createObjectURL(file),
        name: file.name,
        file
      }
      if (images.length + c < 2) {
        setImages((oldVal) => [...oldVal, image])
      } else {
        dispatch(
          showToastWithTimeout({
            type: 'Error',
            message: 'You can upload only 2 images'
          })
        )
      }
      c++
    })
  }
  const removeImageHandler = (id) => {
    const newImages = images.filter((image) => {
      if (image.id !== id) return true
      return false
    })
    setImages(newImages)
  }
  const textareaChangeHandler = (e) => {
    setDescription(e.target.value)
  }
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.src)
      })
    }
  }, [images])
  const sendPostHandler = async () => {
    setLoading(true)
    const handleResponse = (res) => {
      if (res.status === 201) {
        dispatch(feedActions.addPost(res.data))
        dispatch(
          showToastWithTimeout({
            type: 'Success',
            message: 'You have added a new post'
          })
        )
        onFinishedRequest()
      }
    }
    const requestConfig = {
      url: import.meta.env.VITE_API_URL + '/posts',
      method: 'POST',
      body: buildFormData(),
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    sendRequest(requestConfig, handleResponse)
  }
  const buildFormData = () => {
    const form = new FormData()
    form.append('text', description)
    images.forEach((image) => {
      form.append('images', image.file)
    })
    return form
  }
  if (loading) {
    return (
      <form className={classes['post-form']}>
        <Loader />
      </form>
    )
  }
  return (
    <form className={classes['post-form']}>
      <textarea
        className={classes['post-form__description']}
        cols="30"
        rows="5"
        onChange={textareaChangeHandler}
        value={description}
        placeholder="Write a description..."
      ></textarea>
      <Images
        onAddImage={addImageHandler}
        onRemoveImage={removeImageHandler}
        images={images}
      />
      <div className={classes['post-form__actions']}>
        <button
          onClick={onFinishedRequest}
          type="button"
          className={classes['post-form__actions__cancel']}
        >
          Cancel
        </button>
        <button
          onClick={sendPostHandler}
          type="button"
          className={classes['post-form__actions__post']}
        >
          Post
        </button>
      </div>
    </form>
  )
}
export default PostForm
