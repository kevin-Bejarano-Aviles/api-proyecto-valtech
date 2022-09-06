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
    if(ev.target.name==='password' && ev.target.value.length<1 && errorPassword===false){
      SetErrorPassword(true)
      console.log('el campo contraseña no puede estar vacio');
    }
    else if(ev.target.name==='password' && ev.target.value.length>1 && errorPassword===true){
      SetErrorPassword(false)
      console.log('el campo contraseña esta lleno');

    }
    
    if(ev.target.name==='email' && ev.target.value.length<1 && errorEmail===false){
      SetErrorEmail(true)
      console.log('el campo email no puede estar vacio');
    }
    else if(ev.target.name==='email' && ev.target.value.length>1 && errorEmail===true){
      SetErrorEmail(false)
      console.log('el campo email esta lleno');
    }
  }

 
  return (
    <div className="">
      <form onSubmit={alerta}>
        <input type="text" name="email" placeholder="email" value={datos.email} onChange={handleInput}/>
        <p className={`${!errorEmail ? 'hidden' : 'block'}`}>El campo email no debe estar vacio</p>
        
        <input type="password" name="password" placeholder="password" value={datos.password} onChange={handleInput}/>
        <p className={`${!errorPassword ? 'hidden' : 'block'}`}>El campo contraseña no debe estar vacio</p>
        <Button type="submit" name="log in" handleFunction={()=>console.log("boton")} disabled={false}/>
      </form>    
    </div>
  )
}

export default LoginPage;