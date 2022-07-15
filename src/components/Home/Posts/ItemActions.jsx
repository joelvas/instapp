import React from 'react'
import classes from './ItemActions.module.css'
import HeartIcon from '../../UI/icons/HeartIcon'
import CommentIcon from '../../UI/icons/CommentIcon'
import BookmarkIcon from '../../UI/icons/BookmarkIcon'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { showToastWithTimeout } from '../../../store/ui'
import { feedActions } from '../../../store/feed'
import { userActions } from '../../../store/user'
import useHttp from '../../../hooks/useHttp'
const ItemActions = ({ post }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { sendRequest } = useHttp()
  const userFavorites = useSelector((state) => state.user.favorites)
  const clickLikeHandler = async () => {
    const handleResponse = (res) => {
      if (res.status === 201) {
        dispatch(
          showToastWithTimeout({
            type: 'Success',
            message: 'You have liked this post'
          })
        )
        dispatch(feedActions.likePost({ id: post.id, like: res.data }))
      }
      if (res.status === 204) {
        dispatch(feedActions.unlikePost({ id: post.id }))
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/posts/${post.id}/like`,
      method: 'POST'
    }
    sendRequest(requestConfig, handleResponse)
  }
  const clickFavoriteHandler = async () => {
    const handleResponse = (res) => {
      if (res.status === 201) {
        dispatch(
          showToastWithTimeout({
            type: 'Success',
            message: 'Saved to your favorites'
          })
        )
        dispatch(userActions.addFavorite(res.data))
      }
      if (res.status === 204) {
        dispatch(
          showToastWithTimeout({
            type: 'Success',
            message: 'Post removed from you favorites'
          })
        )
        dispatch(userActions.removeFavorite(post.id))
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/users/favorite/${post.id}`,
      method: 'POST'
    }
    sendRequest(requestConfig, handleResponse)
  }
  return (
    <div className={classes['item-actions']}>
      <div
        onClick={clickLikeHandler}
        className={`
      ${classes['item-actions__like']}
      ${
        post?.likes?.some((l) => l.user.username === user.username)
          ? classes.active
          : ''
      }
      `}
      >
        <HeartIcon />
      </div>
      <div className={classes['item-actions__comment']}>
        <CommentIcon />
      </div>
      <div
        onClick={clickFavoriteHandler}
        className={`
      ${classes['item-actions__favorite']}
      ${userFavorites.some((f) => f.post.id === post.id) ? classes.active : ''}
      `}
      >
        <BookmarkIcon />
      </div>
    </div>
  )
}
export default ItemActions
