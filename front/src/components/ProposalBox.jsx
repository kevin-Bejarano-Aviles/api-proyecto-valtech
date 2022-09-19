import React from 'react'
import {Link} from 'react-router-dom'

export default function ProposalBox({Tittle, description}) {
  return (
    <div className='w-[120px]  tablet:w-[224px] laptop:w-[284px] h-60 bg-white rounded-lg drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]'>
        <h3 className=' text-green  text-[24px] leading-[29px] font-bold relative top-4 ml-auto mr-auto font-Rubik tablet:ml-4'>{Tittle}</h3>
        <p className='h-16 ml-auto mr-auto  relative top-8 text-[16px] leading-[19px] tablet:ml-4'>{description}</p>
        <div className='h-10 tablet:w-[184px] rounded-lg border-[1px] mt-12  border-black flex items-center justify-center text-[16px] leading-[24px] text-blue font-medium tablet:ml-4'> <Link to='/'> Más Información</Link></div>
    </div>
  )
}
