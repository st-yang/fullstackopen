import axios from 'axios'
import { NewEntry, Patient, PatientFormValues } from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)

  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object)

  return data
}

const get = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)

  return data
}

const createEntry = async (id: string, entry: NewEntry) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry)

  return data
}

export default {
  getAll,
  create,
  get,
  createEntry,
}
