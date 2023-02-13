import React from 'react'
import classes from './ItemHeader.module.css'
import { useNavigate } from 'react-router-dom'
import { formatRelative, subDays } from 'date-fns'
const ItemHeader = ({ date, user }) => {
  const navigate = useNavigate()
  const getAvatar = () => {
    return 'https://api.multiavatar.com/' + user.username + '.png'
  }
  const getDate = (date) => {
    const newDate = new Date(date)
    return formatRelative(subDays(new Date(), 0), newDate)
  }
  const clickUsernameHandler = () => {
    navigate(`/profile/${user.username}`)
  }
  return (
    <div className={classes['item-header']}>
      <img
        className={classes['item-header__img']}
        src={getAvatar()}
        alt="photo"
      />
      <span
        className={classes['item-header__user']}
        onClick={clickUsernameHandler}
      >
        {user?.username ?? 'unknown'}
      </span>
      ·<span className={classes['item-header__date']}>{getDate(date)}</span>
      <div className={classes['item-header__options']}>•••</div>
    </div>
  )
}
export default ItemHeader
