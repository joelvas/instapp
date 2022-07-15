import React from 'react'
import classes from './ItemComments.module.css'
import CommentsList from './CommentsList'
import CommentEntry from './CommentEntry'
const ItemComments = ({ post }) => {
  return (
    <div className={classes['item-comments']}>
      <CommentsList comments={post?.comments} />
      <CommentEntry postId={post.id} />
    </div>
  )
}
export default ItemComments
