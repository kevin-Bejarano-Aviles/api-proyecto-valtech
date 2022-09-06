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
    console.log(errorEmail)
  }

  const handleInput= (ev)=>{
    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
    if(ev.target.name==='email' && ev.target.value.length<1){
      console.log('el campo email no puede estar vacio');
    }
  }

 
  return (
    <div className="">
      <form onSubmit={alerta}>
        <input type="text" name="email" placeholder="email" value={datos.email} onChange={handleInput}/>
        <input type="password" name="password" placeholder="password" value={datos.password} onChange={handleInput}/>
        <Button type="submit" name="log in" handleFunction={()=>console.log("boton")} disabled={false}/>
      </form>    
    </div>
  )
}

export default LoginPage;