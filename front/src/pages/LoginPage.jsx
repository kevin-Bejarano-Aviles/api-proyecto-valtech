import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import axios from 'axios'

import warningImg from '../img/icon_warning.svg'
import ilustration from '../img/ilustration.svg';
import title from '../img/vnegro.svg'
import { useContext } from 'react';
import Context from '../context/Context';

function LoginPage() {
  // const [band,useState]=useState(0)
  const [message,setMessage]=useState(null)

  const [bandEmail,setBandEmail]=useState(0)
  const [bandPass,setBandPass]=useState(0)
    const [bandButton,setBandButton]=useState(0)

  //state variables so that the field is not empty
  const [errorPassword,SetErrorPassword]=useState(false);
  const [errorEmail,SetErrorEmail]=useState(false);

    //state variables showing error message
  const [errorMessage,SetErrorMessage]=useState(false);

  const [datos,setDatos] = useState({
    email:'',
    pass:''
  });

  const baseUrl = 'http://localhost:8000/admin/adminLogin'
  const navigate = useNavigate();
    const {logearme} = useContext(Context);
    const login = ()=>{
      logearme()
      navigate('/login',{replace:true})
  }

  const postData = async (datos) => {
    await axios.post(baseUrl,{
      email:datos.email,
      pass:datos.pass,
    },{withCredentials:true})
    .then(response=>{
        login();
        localStorage.setItem('admin', JSON.stringify(response.data));

      })
    .catch(error => {
      setMessage(error.response.data.message);
      SetErrorMessage(true)

    })

    }

  //I need to validate the user and control the messages
  const alerta = async (e) =>{
    e.preventDefault();
    postData(datos);
  }

  const handleInput= (ev)=>{
    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
    if(ev.target.name==='email'){
      setBandEmail(1);
      if(bandPass===1){
        setBandButton(1);
      }
    }
    else if(ev.target.name==='pass'){
      setBandPass(1);
      if(bandEmail===1){
        setBandButton(1)
      }
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
  const deskTopviewIlustration='laptop:static laptop:bg-graybackground laptop:h-screen laptop:w-3/5 laptop:flex laptop:flex-col laptop:justify-center'
  const deskTopviewForm='laptop:drop-shadow-none laptop:backdrop-blur-none laptop:bg-transparent laptop:flex laptop:flex-col laptop:justify-center laptop:items-start laptop:h-screen laptop:w-4/5 laptop:ml-20'

  const tabletviewIlustration='tablet:static  tablet:bg-graybackground tablet:h-screen tablet:w-3/5 tablet:flex tablet:flex-col tablet:justify-center '
  const tabletviewsForm='tablet:drop-shadow-none tablet:backdrop-blur-none tablet:bg-transparent tablet:flex tablet:flex-col tablet:justify-center laptop:items-start tablet:h-screen tablet:w-4/5 tablet:ml-14 '

  const inputDesktopView='bg-graybackground h-10  mt-2  pl-3 rounded-lg border-slate-300  focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 desktop:w-96 tablet:w-96 '

  const inputMobileView='w-72'

  return (
    <div className={`flex flex-col tablet:flex-row`}>
      
      <div className={`fixed z-0 left-0 right-0 top-24 bottom-0${deskTopviewIlustration} ${tabletviewIlustration}`}>
        <img className='w-32 laptop:w-48 ' src={title} alt='v-camp'/>
        <img className='w-full tablet:w-full laptop:w-full' src={ilustration} alt='ilustracion'/>
      </div>
      {/* start form */}

      <form className={`flex flex-col items-center h-screen justify-center	z-0 bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg ${deskTopviewForm} ${tabletviewsForm}`} onSubmit={alerta}>
        <h2 className='text-3xl	font-bold mb-8 text-zinc-600'>Ingresá a tu portal</h2>
        <label className='flex flex-col mt-2 mb-5'>
          <p className='font-bold desktop:font-normal
 tablet:font-normal text-zinc-600 text-lg'>Email</p>
          <input className={`${inputDesktopView} ${inputMobileView}`} type='text' name='email' placeholder='email' value={datos.email} onChange={handleInput}/>
        </label>
        <div className={`${!errorEmail ? 'hidden' : 'flex'} text-red-500	`}>
          <img className='mr-2' src={warningImg} alt=''/>
          <p className='font-bold desktop:font-normal tablet:font-normal'>El campo email no debe estar vacio</p>
        </div>
        
        <label className='flex flex-col mt-2 mb-5'>
        <p className='font-bold desktop:font-normal tablet:font-normal text-zinc-600 text-lg'>Contraseña</p>
          <input className={`${inputDesktopView} ${inputMobileView}`} type='password' name='pass' placeholder='password' value={datos.password} onChange={handleInput}/>
        </label>

        <div className={`${!errorPassword ? 'hidden' : 'flex '} text-red-500 `}>
        <img className='mr-2' src={warningImg} alt=''/>
          <p className='font-bold desktop:font-normal
 tablet:font-normal'>El campo contraseña no debe estar vacio</p>
        </div>
        
        <div className={`${!errorMessage ? 'hidden' : 'flex'} text-red-500`}>
            <img className='mr-2' src={warningImg} alt=''/>
            <p className='font-bold'>{message ? message : null}</p>
        </div>
        
        <div className='mt-5'>
          <Button type='submit' name='log in' handleFunction={()=>console.log(bandButton)} disabled={((!errorEmail && !errorPassword) && bandButton===1) ? false : true}/>        
        </div>
      </form>    
    </div>
  )
}

export default LoginPage;
