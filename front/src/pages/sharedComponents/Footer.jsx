import React from 'react';
import Icon from '../../assets/logo/vblanco.svg';
import Mail from '../../assets/MailIcon.svg';
import Phone from '../../assets/Phone.svg';
import Facebook from '../../assets/icons/sociaMedia/Facebook.svg';
import Instagram from '../../assets/icons/sociaMedia/Instagram.svg';
import LinkedIn from '../../assets/icons/sociaMedia/LinkedIn.svg';

function Footer() {
  const desktopStyle =
    'tablet:justify-evenly tablet:flex-row mobile:items-center';
  return (
    <footer
      className={`bg-blue w-full flex h-full mobile:mt-8 mobile:flex-col ${desktopStyle} `}
    >
      <div className='hidden tablet:flex mobile:flex-col mobile:justify-evenly mobile:h-52 mobile:mt-8 tablet:mb-12 '>
        <img className='' src={Icon} alt='' />
        <p className='text-white mt-8 text-base'>Conocé nuestra historia</p>
        <p className='text-white mt-4 text-base'>Propósito V_Camp</p>
        <p className='text-white mt-4 text-base'>Ingresá a tu portal</p>
      </div>
      <div className='hidden tablet:flex mobile:flex-col mobile:justify-evenly mobile:h-52 mobile:mt-8 mobile:tablet:mb-12'>
        <h3 className='text-letrafooter text-lg font-medium'>Programas</h3>
        <p className='text-white mt-6 text-base'>Conocé nuestra historia</p>
        <p className='text-white mt-4 text-base'>Propósito V_Camp</p>
        <p className='text-white mt-4 text-base'>Ingresá a tu portal</p>
      </div>
      <div className='hidden tablet:flex mobile:flex-col mobile:justify-evenly mobile:h-52 mobile:mt-8 tablet:mb-12 '>
        <h3 className='text-letrafooter text-lg font-medium'>Contactanos</h3>
        <p className='text-white mt-6 text-base flex flex-row'>
          <img src={Mail} alt='' className='mr-2.5' />
          consultas@vcamp.com
        </p>
        <p className='text-white mt-6 text-base flex flex-row'>
          <img src={Phone} alt='' className='mr-2.5' />
          11 5 6788 2355
        </p>
        <div className='mt-[18px] flex flex-row mobile:justify-between'>
          <div className='mx-5 h-10 w-10 rounded-full flex items-center justify-center bg-letrafooter'>
            <img src={Facebook} className='mobile:w-4' alt='' />
          </div>
          <div className='mx-5 h-10 w-10 rounded-full flex items-center justify-center ml-2 mr-2 bg-letrafooter'>
            <img src={Instagram} className='mobile:w-4' alt='' />
          </div>
          <div className='mx-5 h-10 w-10 rounded-full flex items-center justify-center bg-letrafooter'>
            <img src={LinkedIn} className='mobile:w-4' alt='' />
          </div>
        </div>
      </div>
      <div className='w-full h-20 flex flex-row justify-evenly items-center tablet:hidden'>
        <div className='h-10 w-10  rounded-full flex items-center justify-center bg-letrafooter'>
          <img src={Facebook} className='w-4' alt='' />
        </div>
        <div className='h-10  w-10  rounded-full flex items-center justify-center ml-2 mr-2 bg-letrafooter'>
          <img src={Instagram} className='w-4' alt='' />
        </div>
        <div className='h-10  w-10  rounded-full flex items-center justify-center bg-letrafooter'>
          <img src={LinkedIn} className='w-4' alt='' />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
