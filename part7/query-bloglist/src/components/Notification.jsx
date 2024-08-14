import { useNotificationValue } from '../context/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  return notification ? <div className={notification.type}>{notification.content}</div> : null
}

export default Notification
