import React, { useState } from 'react'
import classes from './CommentsList.module.css'
import CommentItem from './CommentItem'
const CommentsList = ({ comments }) => {
  const [showAll, setShowAll] = useState(false)
  const clickSpanHandler = () => {
    setShowAll(!showAll)
  }
  return (
    <>
      <ul className={classes['comments-list']}>
        {(showAll ? comments : comments?.slice(0, 1))?.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />
        })}
      </ul>
      {comments?.length > 1 && (
        <span className={classes['comments-more']} onClick={clickSpanHandler}>
          {showAll ? 'See less' : 'See more'}
        </span>
      )}
    </>
  )
}
export default CommentsList
