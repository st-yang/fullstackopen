import Country from './Country'

const Content = ({ countries, setCountries }) => {
  if (countries.length == 1) {
    return <Country country={countries[0]} />
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    return (
      <div>
        {countries.map((country, i) => (
          <div key={i}>
            {country.name.common} <button onClick={() => setCountries([country])}>show</button>
          </div>
        ))}
      </div>
    )
  }
}

export default Content
