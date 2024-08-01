import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import countryService from './services/countries'
import Content from './components/Content'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // fetch all countries at start
  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setAllCountries(allCountries)
    })
  }, [])

  // filter countries when filter changes
  useEffect(() => {
    const filteredCountries = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()),
    )
    setCountries(filteredCountries)
  }, [allCountries, filter])

  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App
