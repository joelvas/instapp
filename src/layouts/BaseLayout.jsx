import React from 'react'
import classes from './BaseLayout.module.css'
import Navbar from '../components/Navbar'
const BaseLayout = ({ children }) => {
  return (
    <>
      <header className={classes.header}>
        <Navbar />
      </header>
      {children}
      <footer></footer>
    </>
  )
}
export default BaseLayout
