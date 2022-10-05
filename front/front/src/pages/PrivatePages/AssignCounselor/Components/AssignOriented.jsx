import React from 'react'
/* import { useParams } from 'react-router-dom'; */


function AssignOriented( ) {

  return (
    
    <div className="py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
      <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'><img className='w-[140px] h-[140px] rounded-full' src={'' ? require(`../img/students/${''}`) : 'https://i.imgur.com/b08hxPY.png'} alt='avatar'/></div>
     <div className='laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
        <h2 className='text-2xl font-normal ml-6 '></h2>
        <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientador</h4>
    </div>
    <div className='flex flex-row '>
    <div className='w-1/2 px-6 '>
        <h5 className=' text-xs text-lightgray'>mail</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue'></p>
    </div>
    <div className='w-1/2 px-6 '>
    <h5 className=' text-xs text-lightgray'>Telefono</h5>
    <p className=' text-[16pxpx] leading-[26px] text-blue'></p>
    </div>
    </div>
      </div>
    </div>
    
  )
}
export default  AssignOriented;