import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import countryService from './services/countries'
import Content from './components/Content'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Content countries={countries} filter={filter} />
    </div>
  )
}

export default App
