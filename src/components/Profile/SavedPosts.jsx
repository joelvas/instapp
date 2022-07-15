import React from 'react'
import classes from './SavedPosts.module.css'
import PostItem from '../Home/Posts/PostItem'
const SavedPosts = ({ posts }) => {
  return (
    <div className={classes['saved-posts']}>
      {posts?.length === 0 && <span>No posts found.</span>}
      <ul className={classes['saved-posts__list']}>
        {posts?.map((post) => {
          return <PostItem key={post.id} post={post} />
        })}
      </ul>
    </div>
  )
}
export default SavedPosts
