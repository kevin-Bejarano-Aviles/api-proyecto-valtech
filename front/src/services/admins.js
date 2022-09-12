//en este archivo hago las funciones para que me traigan los datos del json para probar como funcionan
import axios from 'axios'
const baseUrl = 'http://localhost:8000/admin/adminLogin'

const postData = async (datos) => {
  let status= 1;
    await axios.post(baseUrl,{
      email:datos.email,
      pass:datos.pass,
    },{withCredentials:true})
    .then(response=>{
        console.log(response);
        status=200;
      })
      .catch(error => console.log(error.response.data))
      
    return status;
  }

  export default { postData }
  