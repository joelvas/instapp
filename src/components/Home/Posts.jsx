import React, { useEffect } from 'react'
import classes from './Posts.module.css'
import PostItem from './Posts/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { feedActions } from '../../store/feed'
import useHttp from '../../hooks/useHttp'
const Posts = () => {
  const feed = useSelector((state) => state.feed)
  const { sendRequest } = useHttp()
  const dispatch = useDispatch()
  useEffect(() => {
    const requestConfig = {
      url: import.meta.env.VITE_API_URL + '/posts?size=10&order=DESC',
      method: 'GET'
    }
    const handleResponse = (res) => {
      dispatch(feedActions.setFeed(res.data))
    }
    sendRequest(requestConfig, handleResponse)
  }, [])
  return (
    <section className={classes.posts}>
      <ul className={classes['posts-list']}>
        {feed?.content?.map((post) => {
          return <PostItem key={post.id} post={post} />
        })}
      </ul>
    </section>
  )
}
export default Posts
