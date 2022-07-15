import React from 'react'
import classes from './Navbar.module.css'
import ProfileButton from './Navbar/ProfileButton'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  if (!user || !token) return
  return (
    <nav className={classes.navbar}>
      <NavLink to="/" className={classes['navbar-title']}>
        Instapp
      </NavLink>
      <ProfileButton />
    </nav>
  )
}
export default Navbar
