import React from 'react';
import {NavLink} from 'react-router-dom';

export default function MenuComponent() {
   
        const navLinkStyles = ({ isActive}) => {
         return{
          font: 'rubik',
          fontWeight: '400',
          color: isActive ? '#0BA4A0' : '#2E384D',
          backgroundColor: isActive ? '#D5F4DD' : 'white',
          fill: isActive ? '#0BA4A0' : '#2E384D',
          borderLeft: isActive ? 'solid 4px #0BA4A0' : 'white',
          borderRight: isActive ? 'solid 1px #E4E4F0' : 'solid 1px #E4E4F0',
        }
    }
  return (

<ul className='w-full'>
<li className='w-full'>
    <NavLink to ={'/inicio'} className="flex items-center  h-[56px]" style={navLinkStyles} >
      <div className='ml-8'>
        <svg  width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
           <path d="M18 19.9999H4C3.73478 19.9999 3.48043 19.8946 3.29289 19.707C3.10536 19.5195 3 19.2651 3 18.9999V9.99992H0L10.327 0.61192C10.5111 0.444398 10.7511 0.351562 11 0.351562C11.2489 0.351563 11.4889 0.444398 11.673 0.61192L22 9.99992H19V18.9999C19 19.2651 18.8946 19.5195 18.7071 19.707C18.5196 19.8946 18.2652 19.9999 18 19.9999ZM5 17.9999H17V8.15692L11 2.70292L5 8.15692V17.9999Z" />
        </svg>
      </div>
      <div className='ml-[9px]'>
        Inicio
      </div>
    </NavLink>
 </li>
   <li className='w-full'>
     <NavLink to ={'/orientados'} className="flex items-center  h-[56px]" style={navLinkStyles} >
      <div className='ml-8'>
        <svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
         <g clip-path="url(#clip0_19_8758)">
            <path d="M14 14.252V16.342C13.0949 16.022 12.1263 15.9239 11.1754 16.0558C10.2245 16.1877 9.3192 16.5459 8.53543 17.1002C7.75166 17.6545 7.11234 18.3888 6.67116 19.2414C6.22998 20.094 5.99982 21.04 6 22L4 21.999C3.99969 20.7779 4.27892 19.5729 4.8163 18.4764C5.35368 17.3799 6.13494 16.4209 7.10022 15.673C8.0655 14.9251 9.18918 14.4081 10.3852 14.1616C11.5811 13.9152 12.8177 13.9457 14 14.251V14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" />
         </g>
         <defs>
            <clipPath id="clip0_19_8758">
              <rect width="24" height="24" />
            </clipPath>
         </defs>
        </svg>
      </div>
      <div className='ml-[9px]'>
        Orientados
     </div>
    </NavLink>
 </li>
 <li className='w-full'>
    <NavLink to ={'/eventos'} className="flex items-center  h-[56px]" style={navLinkStyles}>
    <div className='ml-8'>
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H5V0H7V2H13V0H15V2ZM13 4H7V6H5V4H2V8H18V4H15V6H13V4ZM18 10H2V18H18V10Z"/>
    </svg>
    </div>
    <div className='ml-[9px]'>
    Eventos
    </div>
    </NavLink>
 </li>
</ul>
    
  )
}
