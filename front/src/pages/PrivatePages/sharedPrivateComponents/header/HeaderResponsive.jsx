import {React, useState} from 'react'
import { Icon } from '@iconify/react';
import IconV from '../img/vnegro.svg'
import MenuResponsive from '../MenuResponsive';

export default function HeaderResponsive() {
   const [menu, setMenu] = useState(false)
   const clickmenu = () =>{
   setMenu(!menu)
   }
  return (
    <div className='hidden mobile:hid'>
    <div className='h-16 w-[1023px] flex items-center border-b-2 border-gray'>
        <div onClick={clickmenu}><Icon className='ml-2' icon="ci:menu-alt-01" color="#2e384d"  width="65" height="32"  hFlip={true} /></div>
        {/* <div className='w-[567px] h-10 ml-auto mr-auto flex items-center justify-center'> */}
        <img className='ml-auto mr-auto' src={IconV} alt="" />
       {/*  </div> */}
       
    </div>
    {/*<div className='z-20 relative bottom-14'>{menu ? <MenuResponsive/> : ""}</div> */}
    <div className='z-20 relative bottom-14'><MenuResponsive menu={menu} setMenu={setMenu}/></div>
    </div>
  )
}
