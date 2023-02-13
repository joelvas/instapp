import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { feedActions } from '../store/feed'
import { userActions } from '../store/user'

const SocketInit = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  const onConnected = (stompClient, frame) => {
    console.log('SOCKET CONNECTED')
    stompClient?.subscribe('/topic/secured/posts/add', function (payload) {
      if (payload?.body) {
        const post = JSON.parse(payload?.body)
        dispatch(feedActions.addPost(post))
      }
    })

    stompClient?.subscribe('/topic/secured/comments/add', function (payload) {
      if (payload?.body) {
        const comment = JSON.parse(payload?.body)
        dispatch(feedActions.commentPost({ id: comment.postId, comment }))
      }
    })

    stompClient?.subscribe('/topic/secured/likes/add', function (payload) {
      if (payload?.body) {
        const like = JSON.parse(payload?.body)
        dispatch(feedActions.likePost({ id: like.postId, like }))
      }
    })

    stompClient?.subscribe('/topic/secured/likes/remove', function (payload) {
      if (payload?.body) {
        const like = JSON.parse(payload?.body)
        dispatch(
          feedActions.unlikePost({ id: like.postId, userId: like.user.id })
        )
      }
    })

    stompClient?.subscribe('/user/queue/favorites/add', function (payload) {
      if (payload?.body) {
        const favorite = JSON.parse(payload?.body)
        dispatch(userActions.addFavorite(favorite))
      }
    })

    stompClient?.subscribe('/user/queue/favorites/remove', function (payload) {
      if (payload?.body) {
        const favorite = JSON.parse(payload?.body)
        dispatch(userActions.removeFavorite(favorite.postId))
      }
    })
  }

  const onError = (err) => {
    console.log('error: ', err)
  }

  useEffect(() => {
    let stompClient = null
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const Sock = new SockJS(`${import.meta.env.VITE_SOCKET_URL}`)
    stompClient = over(Sock)
    stompClient.debug = () => {}
    stompClient.connect(
      headers,
      (frame) => onConnected(stompClient, frame),
      onError
    )
  }, [token])
}
export default SocketInit
