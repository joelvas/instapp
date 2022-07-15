import axios from 'axios'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { showToastWithTimeout } from '../store/ui'
const useHttp = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*'
  }
  const sendRequest = async (requestConfig, handleResponse) => {
    try {
      const response = await axios({
        url: requestConfig.url,
        method: requestConfig.method ? requestConfig.method : 'GET',
        data: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers ? requestConfig.headers : headers
      })
      handleResponse(response)
    } catch (error) {
      dispatch(
        showToastWithTimeout({
          type: 'Error',
          message: error?.response?.data?.message ?? 'Something went wrong'
        })
      )
    }
  }
  return { sendRequest }
}
export default useHttp
