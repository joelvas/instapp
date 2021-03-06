import React from 'react'
import classes from './ItemInfo.module.css'
const ItemInfo = ({ likes, text, user }) => {
  return (
    <div className={classes['item-info']}>
      <span className={classes['item-info__username']}>
        {user?.username ?? 'xUser'}
      </span>{' '}
      <span className={classes['item-info__description']}>{text}</span>
      <div className={classes['item-info__likes']}>
        {likes?.length ?? 0} Likes
      </div>
    </div>
  )
}
export default ItemInfo
