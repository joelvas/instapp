import React, { useEffect } from 'react'
import classes from './App.module.css'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import BaseLayout from './layouts/BaseLayout'
import ToastList from './components/UI/ToastList'
import Routing from './components/Routing'
import useAuthChecker from './hooks/useAuthChecker'
import useFetchInitials from './hooks/useFetchInitials'
const App = () => {
  const toasts = useSelector((state) => state.ui.toast.list)
  const { isAuthenticated } = useAuthChecker()
  const { getMyFavorites, getMyPosts } = useFetchInitials()
  useEffect(() => {
    if (isAuthenticated) {
      getMyFavorites()
      getMyPosts()
    }
  }, [isAuthenticated])

  return (
    <div className={classes.app}>
      <BaseLayout>
        <Routing isAuthenticated={isAuthenticated} />
      </BaseLayout>
      {createPortal(
        <ToastList toasts={toasts} />,
        document.querySelector('#root')
      )}
    </div>
  )
}

export default App
