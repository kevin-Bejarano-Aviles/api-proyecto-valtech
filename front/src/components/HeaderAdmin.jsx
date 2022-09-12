import React from 'react'
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg'
import ProfilePicture from '../components/ProfilePicture'



function HeaderAdmin({Titulo}) {
  return (
        <div className='bg-blue w-full h-[112px] flex items-center'>
            <h1 className='text-2xl ml-[46px] text-white font-normal'>{Titulo}</h1>
            <div className='ml-[992px]'><ProfilePicture picture={ProfilePictureHeader} alt="User"/></div>    
        </div>
  )
}
export default HeaderAdmin