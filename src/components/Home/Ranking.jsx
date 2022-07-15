import React, { useState, useEffect } from 'react'
import classes from './Ranking.module.css'
import RankingList from './Ranking/RankingList'
import useHttp from '../../hooks/useHttp'
const Ranking = () => {
  const [ranking, setRanking] = useState([])
  const { sendRequest } = useHttp()
  useEffect(() => {
    const handleResponse = (res) => {
      if (res.status === 200) setRanking(res.data)
    }
    const requestConfig = {
      url: import.meta.env.VITE_API_URL + '/likes/ranking'
    }
    sendRequest(requestConfig, handleResponse)
  }, [])
  return (
    <section className={classes.ranking}>
      <div className={classes.ranking__header}>#Top10Users</div>
      <RankingList rankingList={ranking} />
    </section>
  )
}
export default Ranking
