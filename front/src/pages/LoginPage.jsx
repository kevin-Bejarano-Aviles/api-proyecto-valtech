import { useEffect, useState } from "react";
import Button from "../components/Button";

function LoginPage() {

  const [datos,setDatos] = useState({
    email:'',
    password:''
  })

  const alerta = (e)=>{
    e.preventDefault();
    console.log(`la contraseña es ${datos.password} y el email es ${datos.email}`)
  }

  const handleInput= (ev)=>{

    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
  }

  return (
    <div className="">
      <form onSubmit={alerta}>
        <input type="text" name="email" placeholder="email" value={datos.email} onChange={handleInput}/>
        <input type="password" name="password" placeholder="password" value={datos.password} onChange={handleInput}/>
        <Button type="submit" nombre="log in" handleFunction={()=>console.log("boton")}/>
      </form>    
    </div>
  )
}

export default LoginPage;
