import React from 'react'
import classes from './MyPosts.module.css'
import PostItem from '../Home/Posts/PostItem'
const MyPosts = ({ posts }) => {
  return (
    <div className={classes['my-posts']}>
      {posts?.length === 0 && <span>No posts found.</span>}
      <ul className={classes['my-posts__list']}>
        {posts?.map((post) => {
          return (
            <div key={post.id}>
              <PostItem post={post} />
            </div>
          )
        })}
      </ul>
    </div>
  )
}
export default MyPosts
