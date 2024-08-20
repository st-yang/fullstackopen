import axios from 'axios'
import { Diary, NewDiary } from '../types'

const baseUrl = '/api/diaries'

export const getAllDiarys = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data)
}

export const createDiary = (object: NewDiary) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data)
}
