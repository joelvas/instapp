import React, { useState, useEffect } from 'react'
import classes from './MyPosts.module.css'
import PostItem from '../Home/Posts/PostItem'
import { useParams } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import Loader from '../UI/Loader'
const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { username } = useParams()
  const { sendRequest } = useHttp()
  useEffect(() => {
    const handleResponse = (res) => {
      if (res.status === 200) {
        setPosts(res.data)
        setIsLoading(false)
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/users/${username}/posts`
    }
    sendRequest(requestConfig, handleResponse)
  }, [username])

  return (
    <div className={classes['my-posts']}>
      {posts.length === 0 && !isLoading && <span>No posts found.</span>}
      {isLoading && <Loader />}
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
