const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''

export default {
  BACKEND_URL,
}
