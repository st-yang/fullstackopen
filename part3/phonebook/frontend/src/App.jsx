import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updateMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      updateMessage(`name or number missing`, 'error')
      return
    }

    const person = persons.find((person) => person.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id === person.id ? returnedPerson : p)))
            setNewName('')
            setNewNumber('')
            updateMessage(`Updated ${newName}`)
          })
          .catch((error) => {
            updateMessage(`${error.message}: ${error.response.data.error}`, 'error')
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          updateMessage(`Added ${newName}`)
        })
        .catch((error) => {
          updateMessage(`${error.message}: ${error.response.data.error}`, 'error')
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== id))
          updateMessage(`Information of ${person.name} has already been removed from server`, 'error')
        })
    }
  }

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a New</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
