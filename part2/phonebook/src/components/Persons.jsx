import Person from './Person'

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <Person key={person.name} person={person} deletePerson={deletePerson} />
        ))}
    </ul>
  )
}

export default Persons
