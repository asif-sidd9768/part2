import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = (newPerson) => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then(response => response.data)
}

const update = (personId, newObject) => {
    console.log('update called');
    const request = axios.put(`${baseUrl}/${personId}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

export default {getAll, create, deletePerson, update}