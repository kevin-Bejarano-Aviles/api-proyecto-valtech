import React from 'react'
import {NavLink} from 'react-router-dom'
import Icon from '../img/vnegro.svg'
import IconHome from '../img/IconHome.svg'
import IconOrientados from '../img/IconOrientados.svg'
import IconEventos from '../img/IconEventos.svg'


function Menu() {
  const Active = ' text-red-700' /* const that i use later in NavLink classname */
  const Normal= "" 
   
  return (
   
    <div className='w-[234px] min-h-screen bg-white border-r border-bordergray z-20'>
    <div className='fixed'>
    <img className='ml-8 mr-auto mt-8 w-[166px] h-[41px] ' src={Icon} alt="" />
    <NavLink to ={'/inicio'}  className={({isActive})=>(isActive ? Active : Normal)}>
     <h3 className=' text-base mt-[67px] flex flex-row ml-8 font-normal '> 
     <img className='mr-2' src={IconHome} alt="" />Inicio</h3>
    </NavLink>
    <NavLink to ={'/orientados'} className={({isActive})=>(isActive ? Active : Normal)} >
     <h3 className='text-base mt-8 flex flex-row ml-8 font-normal '>
     <img className='mr-2' src={IconOrientados} alt="" />Orientados</h3>
    </NavLink>
    <NavLink to ={'/eventos'} className={({isActive})=>(isActive ? Active : Normal)}>
     <h3 className='text-base mt-8 flex flex-row ml-8 font-normal '> 
     <img className='mr-2' src={IconEventos} alt="" />Eventos</h3>
     </NavLink>
     </div>
   </div>
  
  )
}
export default Menu


