import React from 'react';

export default function CardAdivser({ avatar, fullName, email, phoneNumber }) {
  return (
    <div className=' mobile:mx-auto py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
      <div className='w-[178px] h-[178px] flex justify-center items-center laptop:border-r-[1px]  laptop:border-bordergray'>
        <img
          className='w-[140px] h-[140px] rounded-full'
          src={
            avatar
              ? require(`../../../../assets/adviser/${avatar}`)
              : 'https://i.imgur.com/b08hxPY.png'
          }
          alt='avatar'
        />
      </div>
      <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
        <div className=' mobile:left-40  lap_tablet:mx-auto  tablet:mx-auto'>
          <h2 className='text-2xl font-normal ml-6 '>{fullName}</h2>
          <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
            Orientador
          </h4>
        </div>
        <div className='flex flex-row  h-auto mobile:flex-col tablet:flex-row'>
          <div className='max-w-1/2 pl-6 h-auto '>
            <h5 className=' text-xs text-lightgray'>mail</h5>
            <p className='w-auto h-auto text-[16px] leading-[26px] text-blue flex justify-center items-center'>
              {email}
            </p>
          </div>
          <div className='max-w-1/2   px-6 mobile:flex-col tablet:flex-row'>
            <h5 className=' text-xs text-lightgray'>Telefono</h5>
            <p className=' text-[16pxpx] leading-[26px] text-blue '>
              {phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
