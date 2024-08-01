const Country = ({ country }) => {
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
      <img src={country.flags['png']} alt={country.flags['alt']}></img>
    </div>
  )
}

export default Country
