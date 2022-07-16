import React from 'react'
import classes from './PostItem.module.css'
import ItemHeader from './ItemHeader'
import ItemActions from './ItemActions'
import ItemInfo from './ItemInfo'
import ItemComments from './ItemComments'
import ItemImages from './ItemImages'
const PostItem = ({ post }) => {
  return (
    <li className={classes['post-item']}>
      <ItemHeader date={post.date} user={post.user} />
      {post.images?.length > 0 && <ItemImages images={post.images} />}
      <ItemActions post={post} />
      <ItemInfo likes={post.likes} text={post.text} user={post.user} />
      <ItemComments post={post} />
    </li>
  )
}
export default PostItem
