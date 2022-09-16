import React from 'react'
import IconUser from '../img/Icon_user.svg'
import IconLogouat from '../img/Icon_logout.svg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Logout() {
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
    <div className='w-[216px] h-20 mt-10 ml-10'>
        <div className='h-10 w-full bg-white hover:bg-hoverlogout border-x-2 border-t-2 border-gray-400  rounded-t-[10px] flex items-center'>
         <Link to='mi-perfil'>
         <p className='ml-4 flex flex-row text-blue'><img src={IconUser} alt="" className='mr-2' />Mi perfil</p>
         </Link>
        </div>
        <div className='h-10 w-full bg-white hover:bg-hoverlogout rounded-b-[10px] border-x-2 border-b-2 border-gray-400 flex items-center'>
          <Link to='/login' onClick={() => getAll()}>
           <p className='ml-4 flex flex-row text-blue'><img src={IconLogouat} alt="" className='mr-2' />Cerrar sesión</p>
          </Link>
        </div>
      
    </div>
  )
}
