import React from 'react'
import classes from './ItemActions.module.css'
import HeartIcon from '../../UI/icons/HeartIcon'
import CommentIcon from '../../UI/icons/CommentIcon'
import BookmarkIcon from '../../UI/icons/BookmarkIcon'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { showToastWithTimeout } from '../../../store/ui'
import { userActions } from '../../../store/user'
import useHttp from '../../../hooks/useHttp'
const ItemActions = ({ post }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { sendRequest } = useHttp()
  const userFavorites = useSelector((state) => state.user.favorites)
  const clickLikeHandler = async () => {
    const handleResponse = (res) => {
      if (res.status === 400) {
        dispatch(
          showToastWithTimeout({
            type: 'Error',
            message: 'There was an error.'
          })
        )
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
      if (res.status === 400) {
        dispatch(
          showToastWithTimeout({
            type: 'Error',
            message: 'There was an error.'
          })
        )
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
