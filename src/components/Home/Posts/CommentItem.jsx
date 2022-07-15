import React from 'react'
import classes from './CommentItem.module.css'
const CommentItem = ({ comment }) => {
  const getProfilePic = () => {
    return 'https://api.multiavatar.com/' + comment.user.username + '.png'
  }
  const getDate = (date) => {
    const dateObj = new Date(date)
    return (
      dateObj.toDateString().slice(3, 16) +
      ' at ' +
      dateObj.toTimeString().slice(0, 5)
    )
  }
  return (
    <li className={classes['comment-item']}>
      <div className={classes['comment-item__image']}>
        <img src={getProfilePic()} alt="photo" />
      </div>
      <div className={classes['comment-item__info']}>
        <div className={classes['comment-item__info__header']}>
          <span>{comment.user.username}</span>·
          <span>{getDate(comment.date)}</span>
        </div>
        <span className={classes['comment-item__info__description']}>
          {comment.text}
        </span>
      </div>
    </li>
  )
}
export default CommentItem
