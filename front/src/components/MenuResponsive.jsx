import React from 'react'
import { Icon } from '@iconify/react';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import MenuComponent from './MenuComponent';
import Logout from '../img/Icon_logout.svg'

export default function MenuResponsive() {
  return (
    <div className='felx flex-row'>
    <div className='min-h-screen min-w-[360px] max-w-[640px] flex items-center border-r-2 border-gray bg-[#2e384d80] z-10'>
        <div className='min-w-[275px] max-w-[325px] h-screen bg-slate-500'>
           <div className='flex flex-row-reverse mt-3'><Icon icon="bx:x" height="30" width="30" /></div>
           <div className='flex flex-row mt-3'>
              <div className=''><img className='h-[70px] ml-8 rounded-full' src={ProfilePictureHeader} alt="" /></div>
              <div className='bg-red-700 ml-3.5'>
                <h4>¡Bienvenido!</h4>
                <h4>Nombre de usuario</h4>
              </div>
           </div>
           <div className='mt-10'>
             <MenuComponent/>
           </div>
           <div className='mt-72 ml-8'>
            <h4 className='flex flex-row'><img className='mr-2' src={Logout} alt="" />Cerrar sesión</h4>
           </div>
        </div>
        <div>
          <h1>asddasd</h1>
        </div>
  
    </div>
    </div>
  )
}
