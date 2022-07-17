import React from 'react'
import classes from './ProfileOptions.module.css'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/auth'
import { useDispatch } from 'react-redux'
const ProfileOptions = ({ onSelectOption, user }) => {
  const dispatch = useDispatch()
  const clickLogoutHandler = () => {
    dispatch(logout())
  }
  const clickProfileHandler = () => {
    onSelectOption()
  }
  return (
    <ul className={classes.options}>
      <NavLink to={'/profile/' + user.username} replace>
        <li onClick={clickProfileHandler}>
          <span>i</span>
          <span>Profile</span>
        </li>
      </NavLink>
      <li onClick={clickLogoutHandler}>
        <span>i</span>
        <span>Logout</span>
      </li>
    </ul>
  )
}
export default ProfileOptions
