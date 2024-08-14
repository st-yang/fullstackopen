import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = (obj) => axios.post(baseUrl, obj, { headers: { Authorization: token } }).then(res => res.data)

const getAll = () => axios.get(baseUrl).then(res => res.data)

const update = (obj) => axios.put(`${baseUrl}/${obj.id}`, obj, { headers: { Authorization: token } }).then(res => res.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } }).then(res => res.data)

export default { getAll, create, update, remove, setToken }