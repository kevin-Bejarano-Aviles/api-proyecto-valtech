import {React, Fragment, useState} from 'react';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import ProfilePicture from '../components/ProfilePicture';
import Logout from './Logout';
import { Icon } from '@iconify/react';
import IconV from '../img/vnegro.svg'
import MenuResponsive from './MenuResponsive';

function HeaderAdmin({ Titulo }) {
  const [photo, setPhoto] = useState(false)
  const clickPhoto = () => {
    setPhoto (!photo);
  }

  const [menu, setMenu] = useState(false)
  const clickmenu = () =>{
    setMenu(!menu)
  }

  return (
    <header className='sticky top-0 z-40 w-full'>
      {/** Desktop header */}
      <div className='pl-12 bg-blue'>
        <div className='mobile:hidden laptop:flex justify-between items-center w-5/6 h-[112px]'>
          <h1 className='text-[32px] text-white'>{Titulo}</h1>
          <div className='relative'>
            <ProfilePicture
              styles='h-12 w-[46px] rounded-full cursor-pointer'
              picture={ProfilePictureHeader}
              alt='User'
              event={clickPhoto}
            />
            <div className='absolute top-[60px] right-0'>
              {photo ? <Logout /> : ''}
            </div>
          </div>
        </div>
      </div>
      {/** Mobile header */}
      <div className='mobile:flex laptop:hidden pl-6 items-center h-14 border-b-2 border-gray bg-white'>
          <Icon
            icon='ci:menu-alt-01'
            color='#2e384d'
            width='32'
            height='32'
            hFlip={true}
            onClick={clickmenu}
          />
          <img className='mx-auto' src={IconV} alt='' />
      </div>
      {/** Show Menubar */}
      <MenuResponsive menu={menu} setMenu={setMenu} />
    </header>
  )
}

export default HeaderAdmin;