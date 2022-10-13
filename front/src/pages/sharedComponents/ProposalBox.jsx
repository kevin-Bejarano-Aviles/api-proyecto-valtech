import React from 'react';
import { Link } from 'react-router-dom';

export default function ProposalBox({ Title, description }) {
  return (
    <div className='flex tablet:align flex-col  mt-10 tablet:mt-0 w-[300px] tablet:w-[224px] laptop:w-[284px] h-60 bg-white rounded-lg drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]'>
      <h3 className=' text-green  text-[24px] leading-[29px] font-bold relative top-4  mr-auto font-Rubik ml-4'>
        {Title}
      </h3>
      <p className='h-16 mx-5 mr-auto p-2 relative top-8 text-[16px] leading-[19px] tablet:ml-4'>
        {description}
      </p>
      <div className='h-10 w-4/5 mx-auto tablet:w-[184px] rounded-lg border-[1px] mt-12  border-black flex items-center justify-center text-[16px] leading-[24px] text-blue font-medium tablet:ml-4'>
        <Link to='/'> Más Información</Link>
      </div>
    </div>
  );
}
