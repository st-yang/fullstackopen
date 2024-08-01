import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(country.capital).then((weather) => {
      setWeather(weather)
    })
  }, [country.capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <img src={country.flags['png']} alt={country.flags['alt']} />

      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>temperature {weather.main.temp} Celcius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather[0].description}`}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

export default Country
