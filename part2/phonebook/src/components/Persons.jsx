import Person from './Person'

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </ul>
  )
}

export default Persons
