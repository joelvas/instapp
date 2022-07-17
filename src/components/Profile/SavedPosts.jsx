import React, { useState, useEffect } from 'react'
import classes from './SavedPosts.module.css'
import PostItem from '../Home/Posts/PostItem'
import { useParams } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import Loader from '../UI/Loader'
const SavedPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { username } = useParams()
  const { sendRequest } = useHttp()
  useEffect(() => {
    const handleResponse = (res) => {
      if (res.status === 200) {
        setPosts(res.data.map((f) => f.post))
        setIsLoading(false)
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/users/${username}/favorites`
    }
    sendRequest(requestConfig, handleResponse)
  }, [username])
  return (
    <div className={classes['saved-posts']}>
      {isLoading && <Loader />}
      {posts?.length === 0 && !isLoading && <span>No posts found.</span>}
      <ul className={classes['saved-posts__list']}>
        {posts?.map((post) => {
          return <PostItem key={post.id} post={post} />
        })}
      </ul>
    </div>
  )
}
export default SavedPosts
