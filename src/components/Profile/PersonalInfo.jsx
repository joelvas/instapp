import React, { useState, useEffect } from 'react'
import classes from './PersonalInfo.module.css'
import { useParams } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../store/user'
import { showToastWithTimeout } from '../../store/ui'
const PersonalInfo = () => {
  const [profile, setProfile] = useState({
    username: 'unknown',
    name: '',
    posts: 0,
    bio: '-',
    followers: 0,
    following: 0
  })
  const dispatch = useDispatch()
  const getAvatar = () => {
    return 'https://api.multiavatar.com/' + profile?.username + '.png'
  }
  const following = useSelector((state) => state.user.following)
  const { username } = useParams()
  const { sendRequest } = useHttp()
  useEffect(() => {
    const handleResponse = (res) => {
      if (res.status === 200) {
        setProfile(res.data)
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/users/${username}`
    }
    sendRequest(requestConfig, handleResponse)
  }, [username])
  const clickFollowHandler = () => {
    const handleResponse = (res) => {
      if (res.status === 201) {
        dispatch(userActions.addFollowing(res.data.followed))
        dispatch(
          showToastWithTimeout({
            message: 'User followed',
            type: 'Success'
          })
        )
        setProfile((oldVal) => {
          oldVal.followers += 1
          return oldVal
        })
      }
      if (res.status === 204) {
        dispatch(userActions.removeFollowing(res.data.username))
        dispatch(
          showToastWithTimeout({
            message: 'User unfollowed',
            type: 'Success'
          })
        )
        setProfile((oldVal) => {
          oldVal.followers -= 1
          return oldVal
        })
      }
    }
    const requestConfig = {
      url: `${import.meta.env.VITE_API_URL}/users/${username}/follow`,
      method: 'POST'
    }
    sendRequest(requestConfig, handleResponse)
  }
  return (
    <div className={classes['personal-info']}>
      <div className={classes['personal-info__header']}>
        <img
          className={classes['personal-info__header__image']}
          src={getAvatar()}
          alt=""
        />
      </div>
      <div className={classes['personal-info__body']}>
        <div className={classes['personal-info__body__username']}>
          <img
            className={classes['personal-info__body__image']}
            src={getAvatar()}
            alt=""
          />
          <span>{profile.username}</span>
          {!following?.map((fn) => fn.username).includes(username) && (
            <button onClick={clickFollowHandler}>Follow</button>
          )}
          {following?.map((fn) => fn.username).includes(username) && (
            <button onClick={clickFollowHandler}>Unfollow</button>
          )}
          <div>edit</div>
        </div>
        <ul className={classes['personal-info__body__status']}>
          <li>
            <span>{profile.posts}</span> posts
          </li>
          <li>
            <span>{profile.followers}</span> followers
          </li>
          <li>
            <span>{profile.following}</span> following
          </li>
        </ul>
        <span className={classes['personal-info__body__bio']}>
          {profile.bio}
        </span>
      </div>
    </div>
  )
}
export default PersonalInfo
