import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return notification ? <Alert severity={notification.type}>{notification.content}</Alert> : null
}

export default Notification
