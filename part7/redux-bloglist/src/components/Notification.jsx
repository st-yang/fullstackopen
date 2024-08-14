import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return notification ? <div className={notification.type}>{notification.content}</div> : null
}

export default Notification
