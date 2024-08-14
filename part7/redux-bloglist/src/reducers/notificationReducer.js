import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { notification, clearNotification } = notificationSlice.actions

export const setNotification = (content, type = 'success', seconds = 5) => {
  return dispatch => {
    dispatch(notification({ content, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer