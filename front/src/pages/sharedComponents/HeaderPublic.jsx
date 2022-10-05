import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../img/vnegro.svg'
import Button from '../component/PrivatePages/shared/Button';

function Header() {
  const DesktopStyle=''
  const navigate = useNavigate();
  const redirectLogin=()=>{
    navigate('/login')
  }
  return (
      <div className='bg-white w-full h-[72px] flex items-center justify-around	 flex-row ' >
        <img className='' src={Icon} alt='icon' />
        <div className=''><Button type='button' name='Ingresá a tu portal' handleFunction={redirectLogin}/></div>
      </div>
  )
}

export default Header;