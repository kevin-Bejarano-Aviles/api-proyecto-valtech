//en este archivo hago las funciones para que me traigan los datos del json para probar como funcionan
import axios from 'axios'
const baseUrl = 'http://localhost:3001/admins'

const getAll = () => {
    const request = axios.get(baseUrl)
    request.then(response=>{
        console.log(response)
      })
    return request.then(response => response.data)
  }

  export default { getAll }
  