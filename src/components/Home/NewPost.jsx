import React, { useState } from 'react'
import classes from './NewPost.module.css'
import PostForm from './PostForm/PostForm'
const NewPost = () => {
  const [openedForm, setOpenedForm] = useState(false)
  const clickNewPostHandler = () => {
    setOpenedForm((oldVal) => !oldVal)
  }
  const finishedRequestHandler = () => {
    setOpenedForm(false)
  }
  return (
    <section className={classes['new-post']}>
      <button
        onClick={clickNewPostHandler}
        className={classes['new-post__button']}
      >
        <span className={classes['new-post__button__text']}>New post</span>
        <span className={classes['new-post__button__plus']}>+</span>
      </button>
      {openedForm && <PostForm onFinishedRequest={finishedRequestHandler} />}
    </section>
  )
}
export default NewPost
