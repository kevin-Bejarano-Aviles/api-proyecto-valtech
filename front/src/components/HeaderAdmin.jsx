import {React, useState} from 'react';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import ProfilePicture from '../components/ProfilePicture';
import Logout from './Logout';

function HeaderAdmin({ Titulo }) {
  const [photo, setPhoto] = useState(false)
  const clickPhoto = () => {
    setPhoto (!photo);
  }

  return (
    <div className='bg-blue w-full h-[112px] flex items-center fixed z-20'>
    <h1 className='text-2xl ml-[46px] text-white font-normal'>{Titulo}</h1>
    <div className='ml-[992px] flex flex-col justify-center'>
      <div className='fixed '  onClick={clickPhoto}><ProfilePicture picture={ProfilePictureHeader} alt="User"/></div>
      <div className='relative top-14 right-52'>{photo ? <Logout/> : ""}</div>
    </div>
   </div>
  )
}
export default HeaderAdmin