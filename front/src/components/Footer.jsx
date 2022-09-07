import React from 'react'
import Icon from '../img/vblanco.svg'
import Mail from '../img/MailIcon.svg'
import Phone from '../img/Phone.svg'
import Facebook from '../img/Facebook.svg'
import Instagram from '../img/Instagram.svg'
import LinkedIn from '../img/LinkedIn.svg'
function Footer() {
  return (
    <div className='bg-footer h-[314px] w-full flex flex-row'>
        <div className='flex-col h-52 w-52 ml-[281px] relative top-8'>
            <img className='' src={Icon} alt="" />
            <p className='text-white mt-8 text-base'>Conocé nuestra historia</p>
            <p className='text-white mt-4 text-base'>Propósito V_Camp</p>
            <p className='text-white mt-4 text-base'>Ingresá a tu portal</p>
        </div>
        <div className='flex-col h-52 w-52 ml-[170px] relative top-8'>
            <h3 className='text-letrafooter text-lg font-medium'>Programas</h3>
            <p className='text-white mt-6 text-base'>Conocé nuestra historia</p>
            <p className='text-white mt-4 text-base'>Propósito V_Camp</p>
            <p className='text-white mt-4 text-base'>Ingresá a tu portal</p>
        </div>
        <div className='flex-col h-52 w-52 ml-32 relative top-8'>
            <h3 className='text-letrafooter text-lg font-medium'>Contactanos</h3>
            <p className='text-white mt-6 text-base flex flex-row'><img src={Mail} alt="" className='mr-2.5' />consultas@vcamp.com</p>
            <p className='text-white mt-6 text-base flex flex-row'><img src={Phone} alt="" className='mr-2.5' />11 5 6788 2355</p>
            <div className='mt-[18px] flex flex-row'>
                <div className='h-8 w-8 rounded-full flex items-center justify-center bg-letrafooter'><img src={Facebook} alt="" /></div>
                <div className='h-8 w-8 rounded-full flex items-center justify-center ml-2 mr-2 bg-letrafooter'><img src={Instagram} alt="" /></div>
                <div className='h-8 w-8 rounded-full flex items-center justify-center bg-letrafooter'><img src={LinkedIn} alt="" /></div>
            </div>
        </div>
      
    </div>
  )
}
export default Footer
