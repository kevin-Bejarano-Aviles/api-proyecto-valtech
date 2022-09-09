import axios from "axios";
import adminServices from '../services/admins'; //
import { useEffect, useState } from "react";
import Button from "../components/Button";
import ilustration from '../img/ilustration.svg';
import title from '../img/vnegro.svg'

function LoginPage() {
  //state variables so that the field is not empty
  const [errorPassword,SetErrorPassword]=useState(false);
  const [errorEmail,SetErrorEmail]=useState(false);

    //state variables showing error message
  const [incorrectPassword,SetIncorrectPassword]=useState(false);
  const [incorrectEmail,SetIncorretEmail]=useState(false);

  const [datos,setDatos] = useState({
    id:11,
    email:'',
    password:''
  });

  //I need to validate the user and control the messages
  const alerta = (e)=>{
    e.preventDefault();
    //
    adminServices.postData(datos)
  }

  const handleInput= (ev)=>{
    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
    
  }

  // check that the field is not empty
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
      
      <div className="bg-graybackground h-screen w-3/5 flex flex-col justify-center">
        <img className="w-48" src={title} alt="v-camp"/>
        <img className="" src={ilustration} alt="ilustracion"/>
      </div>
      {/* start form */}
      <form className="flex flex-col justify-center h-screen w-4/5 ml-20" onSubmit={alerta}>
        <h2 className="text-2xl	font-semibold mb-8">Ingresá a tu portal</h2>
        <label className="flex flex-col mt-2 mb-5">
          <p className="font-semibold">Email</p>
          <input className="bg-graybackground h-10 w-80 mt-2  pl-3 rounded-lg border-slate-300  focus:outline-none	focus:border-sky-500 focus:ring-1 focus:ring-sky-500" type="text" name="email" placeholder="email" value={datos.email} onChange={handleInput}/>
        </label>
        <p className={`${!errorEmail ? 'hidden' : 'block'} text-red-500	`}>*El campo email no debe estar vacio</p>
        
        <label className="flex flex-col mt-2 mb-5">
        <p className="font-semibold">Contraseña</p>
          <input className="bg-graybackground h-10 w-80 mt-2  pl-3 rounded-lg border-slate-300  focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500" type="password" name="password" placeholder="password" value={datos.password} onChange={handleInput}/>
        </label>
        <p className={`${!errorPassword ? 'hidden' : 'block'} text-red-500`}>*El campo contraseña no debe estar vacio</p>
        <div className="mt-5">
        <Button type="submit" name="log in" handleFunction={()=>console.log("boton")} disabled={!errorEmail && !errorPassword ? false : true}/>        
        </div>
      </form>    
    </div>
  )
}

export default LoginPage;
