import Country from './Country'

const Content = ({ countries, filter }) => {
  if (filter) {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()),
    )
    if (filteredCountries.length == 1) {
      return <Country country={filteredCountries[0]} />
    } else if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else {
      return (
        <div>
          {filteredCountries.map((country, i) => (
            <div key={i}>{country.name.common}</div>
          ))}
        </div>
      )
    }
  } else {
    return <div>Type in the filter to search country</div>
  }
}

export default Content
