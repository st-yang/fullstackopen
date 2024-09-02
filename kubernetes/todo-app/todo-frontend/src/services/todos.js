import axios from '../util/apiClient'
const baseUrl = '/api/todos'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAll, create }
