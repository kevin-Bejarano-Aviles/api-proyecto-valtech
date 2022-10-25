import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/logo/vnegro.svg';
import Button from '../PrivatePages/sharedPrivateComponents/button/Button';

function HeaderPublic() {
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate('/login');
  };
  return (
    <header className='bg-white w-full h-[72px] flex items-center justify-around	 flex-row '>
      <img src={Icon} alt='icon' />
      {/* send to login page */}
      <div>
        <Button
          type='button'
          name='Ingresá a tu portal'
          handleFunction={redirectLogin}
        />
      </div>
    </header>
  );
}

export default HeaderPublic;
