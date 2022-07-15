import React from 'react'
import classes from './PersonalInfo.module.css'
import { useSelector } from 'react-redux'
const PersonalInfo = () => {
  const user = useSelector((state) => state.auth.user)
  const followers = useSelector((state) => state.user.followers)
  const following = useSelector((state) => state.user.following)
  const myPosts = useSelector((state) => state.user.myPosts)
  const getAvatar = () => {
    return 'https://api.multiavatar.com/' + user?.username + '.png'
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
          <span>{user?.username}</span>
          <div>edit</div>
        </div>
        <ul className={classes['personal-info__body__status']}>
          <li>
            <span>{myPosts.length}</span> posts
          </li>
          <li>
            <span>{followers?.length}</span> followers
          </li>
          <li>
            <span>{following?.length}</span> following
          </li>
        </ul>
        <span className={classes['personal-info__body__bio']}>
          No description
        </span>
      </div>
    </div>
  )
}
export default PersonalInfo
