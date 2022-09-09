import React from 'react'
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg'
import ProfilePicture from '../components/ProfilePicture'
import Icon from '../img/vnegro.svg'
import IconHome from '../img/IconHome.svg'
import IconOrientados from '../img/IconOrientados.svg'
import IconEventos from '../img/IconEventos.svg'


function HeaderAdmin({Titulo}) {
  return (
    <div className='flex flex-row'>
        <div className='w-[234px] h-screen bg-white border-r border-bordergray'>
          <img className='ml-auto mr-auto mt-8 w-[166px] h-[41px] ' src={Icon} alt="" />
         <div><h3 className='text-base mt-[67px] flex flex-row ml-8 font-normal '> <img className='mr-2' src={IconHome} alt="" />Inicio</h3></div>
         <div><h3 className='text-base mt-8 flex flex-row ml-8 font-normal '> <img className='mr-2' src={IconOrientados} alt="" />Orientados</h3></div>
         <div><h3 className='text-base mt-8 flex flex-row ml-8 font-normal '> <img className='mr-2' src={IconEventos} alt="" />Eventos</h3></div>
        </div>
        <div className='bg-blue w-full h-[112px] flex items-center'>
            <h1 className='text-2xl ml-[46px] text-white font-normal'>{/* {Titulo} */} Holaaaa</h1>
            <div className='ml-[992px]'><ProfilePicture picture={ProfilePictureHeader} alt="User"/></div>    
        </div>
    </div>
  )
}
export default HeaderAdmin