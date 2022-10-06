import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

function AssignComponent() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const getAllStudents = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/admin/students/${params.id}`, { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      navigate('error');
      let message = err.response.statusText || 'Ocurrió un error';
    }
  };

  useEffect(() => {
    getAllStudents();
  },[]);

  return (
    
    <div className="py-4 flex flex-row  mt-4 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
      <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'><img className='w-[140px] h-[140px] rounded-full' src={user.avatar ? require(`../../../../assets/students/${user.avatar}`) : 'https://i.imgur.com/b08hxPY.png'} alt='avatar'/></div>
     <div className='laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
        <h2 className='text-2xl font-normal ml-6 '>{user.fullName}</h2>
        <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientado</h4>
    </div>
    <div className='flex flex-row '>
    <div className='w-1/2 px-6 '>
        <h5 className=' text-xs text-lightgray'>mail</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.email}</p>
        <h5 className=' text-xs text-lightgray'>Colegio</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.school}</p>
    </div>
    <div className='w-1/2 px-6 '>
    <h5 className=' text-xs text-lightgray'>Telefono</h5>
    <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.phoneNumber}</p>
    <h5 className=' text-xs text-lightgray'>Programa</h5>
    <p className=' text-[16pxpx] leading-[26px] text-blue'> {user.program}</p>
    </div>
    </div>
      </div>
    </div>
    
  )
}
export default  AssignComponent;
