import adminServices from '../services/admins'; //
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";

import warningImg from '../img/icon_warning.svg'
import ilustration from '../img/ilustration.svg';
import title from '../img/vnegro.svg'

function LoginPage() {
  const [bandEmail,setBandEmail]=useState(0)
  const [bandPass,setBandPass]=useState(0)

  const navigate = useNavigate();
  //state variables so that the field is not empty
  const [errorPassword,SetErrorPassword]=useState(false);
  const [errorEmail,SetErrorEmail]=useState(false);

    //state variables showing error message
  const [errorMessage,SetErrorMessage]=useState(false);

  const [datos,setDatos] = useState({
    email:'',
    pass:''
  });

  //I need to validate the user and control the messages
  const alerta = async (e) =>{
    e.preventDefault();
    //
    let band = await adminServices.postData(datos);
    if(band===200){
      navigate('/inicio')
    }
    else{
      SetErrorMessage(true)
    }
  }

  const handleInput= (ev)=>{
    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
    if(ev.target.name==="email"){
      setBandEmail(1)
    }
    else{
      setBandPass(1)
    }
  }

  // check that the field is not empty
  const setErrors=()=>{
    
    if(datos.pass.length<1 && !errorPassword && bandPass===1){
      SetErrorPassword(true)
    }
    else if(datos.pass.length>1 && errorPassword){
      SetErrorPassword(false)
    }
    if(datos.email.length<1 && !errorEmail && bandEmail===1){
      SetErrorEmail(true)
    }
    else if(datos.email.length>1 && errorEmail){
      SetErrorEmail(false)
    }
  }

  useEffect(()=>{
    SetErrorPassword(false)
      SetErrorEmail(false)
  },[])

  useEffect(()=>{
    setErrors();
  },[datos])
 
  useEffect(()=>{
    //makes the message disappear after 8 seconds on screen
    if(errorMessage){
      const timer=setTimeout(()=>{
        SetErrorMessage(false)
      },8000);
      return ()=> clearTimeout(timer)
    }
  },[errorMessage])


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
        <div className={`${!errorEmail ? 'hidden' : 'flex'} text-red-500	`}>
          <img className="mr-2" src={warningImg} alt=''/>
          <p>El campo email no debe estar vacio</p>
        </div>
        
        <label className="flex flex-col mt-2 mb-5">
        <p className="font-semibold">Contraseña</p>
          <input className="bg-graybackground h-10 w-80 mt-2  pl-3 rounded-lg border-slate-300  focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500" type="password" name="pass" placeholder="password" value={datos.password} onChange={handleInput}/>
        </label>

        <div className={`${!errorPassword ? 'hidden' : 'flex'} text-red-500`}>
        <img className="mr-2" src={warningImg} alt=''/>
          <p >El campo contraseña no debe estar vacio</p>
        </div>

        <div className={`${!errorMessage ? 'hidden' : 'flex'} text-red-500`}>
        <img className="mr-2" src={warningImg} alt=''/>
          <p>Email y/o contraseña incorrecta</p>
        </div>
        
        <div className="mt-5">
          <Button type="submit" name="log in" handleFunction={()=>console.log("boton")} disabled={!errorEmail && !errorPassword ? false : true}/>        
        </div>
      </form>    
    </div>
  )
}

export default LoginPage;
