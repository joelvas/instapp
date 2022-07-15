import React, { useState } from 'react'
import classes from './CommentEntry.module.css'
import useHttp from '../../../hooks/useHttp'
import { useDispatch } from 'react-redux'
import { showToastWithTimeout } from '../../../store/ui'
import { feedActions } from '../../../store/feed'
const CommentEntry = ({ postId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { sendRequest } = useHttp()
  const changeInputHandler = (e) => {
    setComment(e.target.value)
  }
  const sendCommentHandler = async () => {
    const handleResponse = (res) => {
      if (res.status === 201) {
        dispatch(
          showToastWithTimeout({
            type: 'Success',
            message: 'You have commented this post'
          })
        )
        dispatch(feedActions.commentPost({ id: postId, comment: res.data }))
        setComment('')
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/posts/${postId}/comment`,
      method: 'POST',
      body: {
        text: comment
      }
    }
    sendRequest(requestConfig, handleResponse)
  }
  return (
    <div className={classes['comment-entry']}>
      <input
        className={classes['comment-entry__input']}
        type="text"
        onInput={changeInputHandler}
        value={comment}
        placeholder="Write a comment..."
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            sendCommentHandler()
          }
        }}
      />
      <button
        onClick={sendCommentHandler}
        className={classes['comment-entry__button']}
      >
        Comment
      </button>
    </div>
  )
}
export default CommentEntry
