const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  )
}

export default Persons
