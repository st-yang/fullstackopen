import axios from 'axios'
import config from './config'

const apiClient = axios.create({
  baseURL: config.BACKEND_URL,
})

export default apiClient
