import React from 'react';
import axios from 'axios';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import ProfilePicture from '../components/ProfilePicture';
import { Link, useNavigate } from 'react-router-dom';

function HeaderAdmin({ Titulo }) {
  const navigate = useNavigate();

  const getAll = async () => {
    try {
      let res = await axios.get('http://localhost:8000/admin/logOut', {withCredentials: true});
      console.log(res);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
        <div className='bg-blue w-full h-[112px] flex items-center'>

            <h1 className='text-2xl ml-[46px] text-white font-normal'>{Titulo}</h1>

            <div className='ml-[992px]'><ProfilePicture picture={ProfilePictureHeader} alt="User"/></div>

            <Link to='/login'>
              <button
                className='px-2 py-1 bg-gray-300 rounded-md'
                onClick={() => getAll()}
              >
                Cerrar sesión
              </button>
            </Link>
        </div>
  )
}
export default HeaderAdmin