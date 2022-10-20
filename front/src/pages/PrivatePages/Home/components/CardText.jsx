import React from 'react';

function CardText({title}) {
  return (
    <div className='flex flex-col justify-between items-start h-[252px] w-[320px] rounded-lg border-[1px] border-slate-300 drop-shadow-[0_0_10px_rgba(135,152,173,0.1)] p-[32px] '>
      <h3 className='text-blue w-[245px] h-24 text-[24px] leading-[29px] font-medium ml-auto mr-auto font-Rubik'>
        {title}
      </h3>
      <p className=' ml-auto mr-auto w-[251px] text-slate-400'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className='h-4 pb-3 max-w-max underline'>
        <span className='ml-2 cursor-pointer'>Ver más &#62;</span>
        <div className='relative -z-10 bottom-[11px] h-3 bg-yellow' />
      </div>
    </div>
  );
}

export default CardText;