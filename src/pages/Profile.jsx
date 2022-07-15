import React from 'react'
import classes from './Profile.module.css'
import PersonalInfo from '../components/Profile/PersonalInfo'
import Shared from '../components/Profile/Shared'
const Profile = () => {
  return (
    <div className={classes.profile}>
      <PersonalInfo />
      <Shared />
    </div>
  )
}
export default Profile
