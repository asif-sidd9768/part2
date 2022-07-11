import { useState, useEffect } from "react";
import axios from 'axios';
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersonName, setNewPersonName] = useState('')
  const [newPersonNumber, setNewPersonNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newPersonName,
      number: newPersonNumber,
    }
    const ifExists = persons.some((person) => {
        return newPersonName.toLowerCase() === person.name.toLowerCase()
    })

    if(ifExists){
      const person = persons.find(n => n.name.toLowerCase() === newPersonName.toLowerCase())
      const updatedPerson = {
        ...person,
        number: newPersonNumber
      }
      handleUpdate(updatedPerson.id, updatedPerson)
      setNewPersonName("")
      setNewPersonNumber("")
    }else{
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewPersonName("")
          setNewPersonNumber("")
          setMessage({
            message: `Added ${returnedPerson.name}`,
            class: 'success'
        })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
      })

    }
  }

  const personsToShow = filterNames==="" 
    ? persons :  
    persons.filter(person => {
      const name = (person.name).toLowerCase()
      return name.includes(filterNames.toLowerCase())
    })

  const handleNameChange = (event) => {
    setNewPersonName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPersonNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterNames(event.target.value)
  }

  const handleUpdate = (id, newObject) => {
    personService
      .update(newObject.id, newObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== newObject.id ? person : returnedPerson))
        setMessage({
          message: `Updated ${returnedPerson.name}`,
          class: 'success'
        })
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
    console.log('update ', newObject);
  }

  const handleDelete = (id) => {
    if(window.confirm("Do you really want to confirm?")){
      console.log('person id is: ', id);
      const persontoDelete = persons.filter(person => person.id === id)
      personService
        .deletePerson(id)
        .then(newPersons => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage({
            message: `Deleted ${persontoDelete[0].name}`,
            class: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(error => {
          setMessage({
            message: `Information of ${persontoDelete[0].name} has already been removed from server`,
            class: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
    }
    else{
      setMessage({
        message: `Delete request cancelled`,
        class: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={message} />
      <Filter filterNames={filterNames} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        value1={newPersonName} 
        value2={newPersonNumber} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App;