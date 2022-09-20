import React from 'react'
import { Icon } from '@iconify/react';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import MenuComponent from './MenuComponent';
import Logout from '../img/Icon_logout.svg'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function MenuResponsive({menu, setMenu}) {

  

  const navigate = useNavigate();

  const getAll = async () => {
    try {
      let res = await axios.get('http://localhost:8000/admin/logOut',{withCredentials:true});
      console.log(res);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`felx flex-row ${menu ? "block" : "hidden"}`}>
    <div className='min-h-screen w-[1023px] flex items-center  bg-[#2E384D] bg-opacity-30 z-30'>
        <div className='min-w-[275px] max-w-[325px] h-screen bg-white border-r border-bordergray'>
           <div  className='flex flex-row-reverse mt-3 '><div  onClick={()=> setMenu (false) }><Icon icon="bx:x" height="30" width="30" /></div></div>
           <div className='flex flex-row mt-3'>
              <div className=''><img className='h-[70px] ml-8 rounded-full' src={ProfilePictureHeader} alt="" /></div>
              <div className=' ml-3.5'>
                <h4>¡Bienvenido!</h4>
                <h4>Nombre de usuario</h4>
              </div>
           </div>
           <div className='mt-10'>
             <MenuComponent/>
           </div>
           <div className='mt-72 ml-8'>
            <Link to='/login' onClick={() => getAll()}><h4 className='flex flex-row'><img className='mr-2' src={Logout} alt="" />Cerrar sesión</h4></Link>
           </div>
        </div>
    </div>
    </div>
  )
}
