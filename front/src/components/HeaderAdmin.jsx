import {React, useState} from 'react';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import ProfilePicture from '../components/ProfilePicture';
import Logout from './Logout';
import { Icon } from '@iconify/react';
import IconV from '../img/vnegro.svg'
import MenuResponsive from './MenuResponsive';

function HeaderAdmin({ Titulo="bienvenido" }) {
  const [photo, setPhoto] = useState(false)
  const clickPhoto = () => {
    setPhoto (!photo);
  }

  const [menu, setMenu] = useState(false)
  const clickmenu = () =>{
  setMenu(!menu)
  }

  return (
    <div className='flex flex-col mx-auto'>
     <div className='fixed'>
      <div className='block laptop:invisible relative right-[235px] '>
        <div className='h-14 w-full bg-white flex items-center border-b-2 border-gray z-40'>
        <div onClick={clickmenu}><Icon className='ml-2' icon="ci:menu-alt-01" color="#2e384d"  width="65" height="32"  hFlip={true} /></div>
        {/* <div className='w-[567px] h-10 ml-auto mr-auto flex items-center justify-center'> */}
        <img className='ml-auto mr-auto' src={IconV} alt="" />
        {/*  </div> */} 
        </div>
       {/*<div className='z-20 relative bottom-14'>{menu ? <MenuResponsive/> : ""}</div> */}
       <div className='z-20 relative bottom-14'><MenuResponsive menu={menu} setMenu={setMenu}/></div>
      </div>
    </div>

    <div className='invisible laptop:visible'>
    <div className='bg-blue w-full h-[112px] flex flex-wrap items-center fixed z-30'>
      <div className='flex flex-col flex-wrap w-6/12 h-20 justify-center bg-yellow'>
         <h1 className='text-2xl ml-[46px] text-white font-normal  fixed'>{Titulo}</h1>
      <div className='ml-[800px] flex flex-col justify-center'>
       <div className=' bg-slate-900 fixed  w-14 cursor-pointer'  onClick={clickPhoto}><ProfilePicture className="cursor-pointer" picture={ProfilePictureHeader} alt="User"/></div>
       <div className='relative top-[75px] right-52'>{photo ? <Logout/> : ""}</div>
      </div>
    </div>
    
    
    </div>
   </div>
   
   </div>
  )
}
export default HeaderAdmin