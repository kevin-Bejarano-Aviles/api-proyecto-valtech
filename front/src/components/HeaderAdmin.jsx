import {React, useState} from 'react';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import ProfilePicture from '../components/ProfilePicture';
import Logout from './Logout';

function HeaderAdmin({ Titulo="bienvenido" }) {
  const [photo, setPhoto] = useState(false)
  const clickPhoto = () => {
    setPhoto (!photo);
  }

  return (
    <div className='bg-blue w-full h-[112px] flex items-center fixed z-30'>
      <div className='flex flex-col justify-center'>
    <h1 className='text-2xl ml-[46px] text-white font-normal  fixed'>{Titulo}</h1>
    <div className='ml-[1100px] flex flex-col justify-center'>
      <div className='fixed '  onClick={clickPhoto}><ProfilePicture picture={ProfilePictureHeader} alt="User"/></div>
      <div className='relative top-16 right-52'>{photo ? <Logout/> : ""}</div>
    </div>
    </div>
   </div>
  )
}
export default HeaderAdmin