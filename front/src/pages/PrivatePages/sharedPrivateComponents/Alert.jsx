import React from 'react';
import iconCheck from '../../../assets/icons/icon-check.svg';
import iconClose from '../../../assets/icons/privatePage/icon-close.svg';

function Alert(title, message, onclick) {
  return (
    <div
      className='
      mobile:bottom-3 mobile:w-[300px]
      tablet:bottom-5 tablet:w-[500px]
      laptop:w-[600px]
      desktop:w-[768px]
      fixed flex justify-between p-4 text-sm text-white bg-blue rounded-lg
    '
    >
      <div className='flex gap-6'>
        <img src={iconCheck} alt='' className='self-start' />
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold'>{title}</h2>
          <p>{message}</p>
        </div>
      </div>
      <img
        className='cursor-pointer self-start'
        src={iconClose}
        alt=''
        onClick={onclick}
      />
    </div>
  );
}

export default Alert;
