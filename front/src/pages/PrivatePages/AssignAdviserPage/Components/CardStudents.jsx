import React from 'react';

export default function CardStudents({
  avatar,
  ruta,
  fullName,
  email,
  school,
  phoneNumber,
  program,
}) {
  return (
    <div className='min-w-[365px] py-4 flex flex-row mobile:h-[475px]  mobile:mx-auto  tablet:h-auto  mt-4  mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
      <div className='w-[178px] h-[178px] flex justify-center items-center laptop:border-r-[1px]  laptop:border-bordergray'>
        <img
          className='w-[140px] h-[140px] rounded-full'
          src={
            avatar
              ? require(`../../../../assets/${ruta}/${avatar}`)
              : 'https://i.imgur.com/b08hxPY.png'
          }
          alt='avatar'
        />
      </div>
      <div className=' laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col mobileL:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
        <div className=' w-full mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
          <h2 className='text-2xl font-normal ml-6 '>{fullName}</h2>
          <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
            Orientado
          </h4>
        </div>
        <div className='flex flex-row mobile:flex-col mobile:h-auto tablet:flex-row'>
          <div className='w-1/2 px-6 mobile:flex-col  tablet:flex-row'>
            <h5 className='text-xs text-lightgray '>mail</h5>
            <p className='text-[16pxpx] leading-[26px] text-blue '>{email}</p>
            <h5 className='text-xs text-lightgray'>Colegio</h5>
            <p className='text-[16pxpx] leading-[26px] text-blue'>{school}</p>
          </div>
          <div className='w-1/2 px-6 mobile:flex-col'>
            <h5 className='text-xs text-lightgray'>Telefono</h5>
            <p className='text-[16pxpx] leading-[26px] text-blue'>
              {phoneNumber}
            </p>
            <h5 className='text-xs text-lightgray'>Programa</h5>
            <p className='text-[16pxpx] leading-[26px] text-blue'>{program}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
