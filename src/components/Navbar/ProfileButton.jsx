import React, { useState, useEffect, useRef } from 'react'
import classes from './ProfileButton.module.css'
import FloatingMenu from '../UI/FloatingMenu'
import ProfileOptions from './ProfileOptions'
import { useSelector } from 'react-redux'
const ProfileButton = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const floatingMenuRef = useRef(null)
  const user = useSelector((state) => state.auth.user)
  const getAvatar = () => {
    return 'https://api.multiavatar.com/' + user?.username + '.png'
  }
  const clickButtonHandler = () => {
    setActiveMenu((oldValue) => !oldValue)
  }
  useEffect(() => {
    const clickWindowHandler = (event) => {
      if (
        floatingMenuRef.current &&
        activeMenu &&
        !floatingMenuRef.current.contains(event.target)
      ) {
        setActiveMenu(false)
      }
    }
    window.addEventListener('mousedown', clickWindowHandler)
    return () => {
      window.removeEventListener('mousedown', clickWindowHandler)
    }
  })
  return (
    <div ref={floatingMenuRef} className={classes['profile-button']}>
      <button
        className={classes['profile-button__button']}
        onClick={clickButtonHandler}
      >
        <span className={classes['profile-button__button__text']}>
          {user.name}
        </span>
        <img
          className={classes['profile-button__button__img']}
          src={getAvatar()}
          alt=""
          width={35}
        />
      </button>
      <FloatingMenu active={activeMenu}>
        <ProfileOptions
          user={user}
          onSelectOption={() => {
            setActiveMenu(false)
          }}
        />
      </FloatingMenu>
    </div>
  )
}
export default ProfileButton
