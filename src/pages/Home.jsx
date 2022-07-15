import React from 'react'
import classes from './Home.module.css'
import Posts from '../components/Home/Posts'
import NewPost from '../components/Home/NewPost'
import Ranking from '../components/Home/Ranking'
const Home = () => {
  return (
    <>
      <main className={classes.main}>
        <section className={classes.main__feed}>
          <NewPost />
          <Posts />
        </section>
        <Ranking />
      </main>
    </>
  )
}
export default Home
