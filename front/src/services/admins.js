//en este archivo hago las funciones para que me traigan los datos del json para probar como funcionan
import axios from 'axios'
const baseUrl = 'http://localhost:3001/admins'

const postData = (datos) => {

    const request = axios.post(baseUrl,datos)
    request.then(response=>{
        console.log(response)
        console.log(datos.email);
      })
    return request.then(response => response.data)
  }

  export default { postData }
  