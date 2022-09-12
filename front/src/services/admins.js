//en este archivo hago las funciones para que me traigan los datos del json para probar como funcionan
import axios from 'axios'
const baseUrl = 'http://localhost:8000/admin/adminLogin'

const postData = async (datos) => {
  let band=false;
    await axios.post(baseUrl,{
      email:datos.email,
      pass:datos.pass,
    })
    .then(response=>{
        if(response.data.message.search("invalidas")!== -1){
          band=true
        }
        console.log(response.data.message);
      })
      .catch(error => console.log(error))
    return band;
  }

  export default { postData }
  