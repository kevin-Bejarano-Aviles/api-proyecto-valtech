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
    <div className='bg-white w-full h-[72px] flex items-center justify-around	 flex-row '>
      <img src={Icon} alt='icon' />
      <div> {/* send to login page */}
        <Button
          type='button'
          name='Ingresá a tu portal'
          handleFunction={redirectLogin}
        />
      </div>
    </div>
  );
}

export default HeaderPublic;
