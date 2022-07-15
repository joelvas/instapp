import React from 'react'
import classes from './ItemHeader.module.css'
const ItemHeader = ({ date, user }) => {
  const getAvatar = () => {
    return 'https://api.multiavatar.com/' + user.username + '.png'
  }
  const getDate = (date) => {
    const dateObj = new Date(date)
    return (
      dateObj.toDateString().slice(3, 16) +
      ' at ' +
      dateObj.toTimeString().slice(0, 5)
    )
  }
  return (
    <div className={classes['item-header']}>
      <img
        className={classes['item-header__img']}
        src={getAvatar()}
        alt="photo"
      />
      <span className={classes['item-header__user']}>
        {user?.username ?? 'unknown'}
      </span>
      ·<span className={classes['item-header__date']}>{getDate(date)}</span>
      <div className={classes['item-header__options']}>•••</div>
    </div>
  )
}
export default ItemHeader
