import React from 'react'
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg'
import ProfilePicture from '../components/ProfilePicture'

function HeaderAdmin() {
  return (
    <div className='bg-green-500 h-80 w-[1206px]'>
        <header className='bg-blueheader h-[111px] flex items-center'>
            <h1 className='text-2xl ml-[46px] text-white font-normal'>Orientados</h1>
            <div className='ml-[800px]'><ProfilePicture picture={ProfilePictureHeader} alt="User"/></div>
        </header>      
    </div>
  )
}
export default HeaderAdmin