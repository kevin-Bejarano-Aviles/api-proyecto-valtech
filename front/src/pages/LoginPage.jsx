import { useEffect, useState } from "react";
import Button from "../components/Button";
import ilustration from '../img/ilustration.svg';
import title from '../img/vnegro.svg'

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
    if(datos.password.length<1 && !errorPassword){
      SetErrorPassword(true)
    }
    else if(datos.password.length>1 && errorPassword){
      SetErrorPassword(false)
    }
    if(datos.email.length<1 && !errorEmail){
      SetErrorEmail(true)
    }
    else if(datos.email.length>1 && errorEmail){
      SetErrorEmail(false)
    }
  }

  useEffect(()=>{
    setErrors();
  },[datos])
 
  return (
    <div className="flex">
      <div className="bg-graybackground h-screen w-2/5 flex flex-col	justify-center">
        <img className="w-48" src={title} alt="v-camp"/>
        <img className="" src={ilustration} alt="ilustracion"/>
      </div>
      <form className="flex flex-col  justify-center h-screen w-full ml-10" onSubmit={alerta}>
        <h1>Ingresá a tu portal</h1>
        <label className="flex flex-col">
          Email
          <input className="bg-graybackground pl-3 h-10 w-80 rounded-lg border-slate-300  focus:outline-none	focus:border-sky-500 focus:ring-1 focus:ring-sky-500" type="text" name="email" placeholder="email" value={datos.email} onChange={handleInput}/>
        </label>
        <p className={`${!errorEmail ? 'hidden' : 'block'}`}>El campo email no debe estar vacio</p>
        
        <label className="flex flex-col">
          Contraseña
          <input className="bg-graybackground pl-3 h-10 w-80 rounded-lg border-slate-300  focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500" type="password" name="password" placeholder="password" value={datos.password} onChange={handleInput}/>
        </label>
        <p className={`${!errorPassword ? 'hidden' : 'block'}`}>El campo contraseña no debe estar vacio</p>
        <div className="mt-5">
        <Button type="submit" name="log in" handleFunction={()=>console.log("boton")} disabled={!errorEmail && !errorPassword ? false : true}/>        
        </div>
      </form>    
    </div>
  )
}

export default LoginPage;
