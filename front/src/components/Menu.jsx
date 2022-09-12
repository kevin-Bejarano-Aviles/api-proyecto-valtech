import React from 'react'
import {Link} from 'react-router-dom'
import Icon from '../img/vnegro.svg'
import IconHome from '../img/IconHome.svg'
import IconOrientados from '../img/IconOrientados.svg'
import IconEventos from '../img/IconEventos.svg'


function Menu() {
  return (
   
        <div className='w-[234px] min-h-screen bg-white border-r border-bordergray'>
         
         <img className='ml-auto mr-auto mt-8 w-[166px] h-[41px] ' src={Icon} alt="" />
         <div><Link to ={'/inicio'}><h3 className='text-base mt-[67px] flex flex-row ml-8 font-normal '> <img className='mr-2' src={IconHome} alt="" />Inicio</h3></Link></div>
         <div><Link to ={'/orientados/:id/page'}><h3 className='text-base mt-8 flex flex-row ml-8 font-normal '> <img className='mr-2' src={IconOrientados} alt="" />Orientados</h3></Link></div>
         <div><Link to ={'/eventos'}><h3 className='text-base mt-8 flex flex-row ml-8 font-normal '> <img className='mr-2' src={IconEventos} alt="" />Eventos</h3></Link></div>
        </div>
  
  )
}
export default Menu
