import {React, useState} from 'react'
import { Icon } from '@iconify/react';
import IconV from '../img/vnegro.svg'

export default function HeaderResponsive() {
   const [menu, setMenu] = useState(false)
   const clickmenu = () =>{
   setMenu("")
   }
  return (
    <div className='h-14 min-w-[375px] max-w-[640px] flex items-center border-b-2 border-gray'>
        <div onClick={clickmenu}><Icon className='ml-2' icon="ci:menu-alt-01" color="#2e384d"  width="65" height="32"  hFlip={true} /></div>
        {/* <div className='w-[567px] h-10 ml-auto mr-auto flex items-center justify-center'> */}
        <img className='ml-auto mr-auto' src={IconV} alt="" />
       {/*  </div> */}
      
    </div>
  )
}
