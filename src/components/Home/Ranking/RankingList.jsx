import React from 'react'
import classes from './RankingList.module.css'
const RankingList = ({ rankingList }) => {
  return (
    <ul className={classes['ranking-list']}>
      {rankingList.map((item, i) => {
        return (
          <li className={classes['ranking-list__item']} key={item.username}>
            <span>{i + 1}.</span>
            <span>{item.username}</span>
            <span>with {item.score} likes</span>
          </li>
        )
      })}
    </ul>
  )
}
export default RankingList
