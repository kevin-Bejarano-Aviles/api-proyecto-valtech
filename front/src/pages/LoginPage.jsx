import { useEffect, useState } from "react";
import Button from "../components/Button";

function LoginPage() {
  const [errorPassword,SetErrorPassword]=useState(false);
  const [errorEmail,SetErrorEmail]=useState(false);
  const [datos,setDatos] = useState({
    email:'',
    password:''
  });

  const alerta = (e)=>{
    e.preventDefault();
  }

  const handleInput= (ev)=>{
    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
    
  }

  const setErrors=()=>{
    if(datos.password.length<1 && errorPassword===false){
      SetErrorPassword(true)
    }
    else if(datos.password.length>1 && errorPassword===true){
      SetErrorPassword(false)

    }
    if(datos.email.length<1 && errorEmail===false){
      SetErrorEmail(true)
    }
    else if(datos.email.length>1 && errorEmail===true){
      SetErrorEmail(false)
    }
  }

  useEffect(()=>{
    setErrors();
  },[datos])
 
  return (
    <div className="">
      <form onSubmit={alerta}>
        
        <input type="text" name="email" placeholder="email" value={datos.email} onChange={handleInput}/>
        <p className={`${!errorEmail ? 'hidden' : 'block'}`}>El campo email no debe estar vacio</p>
        
        <input type="password" name="password" placeholder="password" value={datos.password} onChange={handleInput}/>
        <p className={`${!errorPassword ? 'hidden' : 'block'}`}>El campo contraseña no debe estar vacio</p>
        
        <Button type="submit" name="log in" handleFunction={()=>console.log("boton")} disabled={!errorEmail && !errorPassword ? false : true}/>        
      
      </form>    
    </div>
  )
}

export default LoginPage;