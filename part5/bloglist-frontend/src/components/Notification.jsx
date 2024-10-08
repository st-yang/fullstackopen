import PropTypes from 'prop-types'
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className={message.type}>{message.text}</div>
}

Notification.propTypes = {
  message: PropTypes.object,
}

export default Notification
