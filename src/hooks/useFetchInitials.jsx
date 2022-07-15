import { useDispatch } from 'react-redux'
import { userActions } from '../store/user'
import useHttp from '../hooks/useHttp'
const useFetchInitials = () => {
  const dispatch = useDispatch()
  const { sendRequest } = useHttp()
  const getMyFavorites = () => {
    const handleResponse = (res) => {
      if (res?.status === 200) dispatch(userActions.setFavorites(res.data))
    }
    const requestConfig = {
      url: import.meta.env.VITE_API_URL + '/favorites/user'
    }
    sendRequest(requestConfig, handleResponse)
  }
  const getMyPosts = () => {
    const handleResponse = (res) => {
      if (res?.status === 200) dispatch(userActions.setMyPosts(res.data))
    }
    const requestConfig = {
      url: import.meta.env.VITE_API_URL + '/posts/user'
    }
    sendRequest(requestConfig, handleResponse)
  }
  return { getMyFavorites, getMyPosts }
}
export default useFetchInitials
