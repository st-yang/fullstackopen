import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getWeather = async (city, units = 'metric') => {
  const request = axios.get(`${baseUrl}?units=${units}&q=${city}&APPID=${apiKey}`)
  return request.then(response => response.data)
}

export default { getWeather }