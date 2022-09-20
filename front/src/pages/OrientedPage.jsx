import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function Oriented() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const getAllStudents = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/admin/students/${params.id}`, { withCredentials: true });
      setUser(res.data);
      console.log(user);
    } catch (err) {
      navigate('error');
      let message = err.response.statusText || 'Ocurrió un error';
      console.log(message);
    }
  };

  useEffect(() => {
    getAllStudents();
  },[]);

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 mt-6 flex flex-col gap-10 pb-12'>
          <section> {/* Basic information */}
            <h2 className='mb-4 text-2xl font-bold'>01. Información básica</h2>
            <div className='mobile:flex-col mobile:gap-3 tablet:flex-row tablet:gap-9 flex'>
              <img
                src={user.avatar ? require(`../img/students/${user.avatar}`) : 'https://i.imgur.com/b08hxPY.png'}
                alt='avatar'
                className='w-[96px] h-[96px] rounded-full'
              />
              <div className='flex flex-col gap-2'>
                <h3 className='text-2xl'>{user.fullName}</h3>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>EMAIL</p>
                  <p>{user.email}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>TELEFONO</p>
                  <p>{user.phoneNumber}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>PROGRAMA POR INICIAR</p>
                  <p>{user.program}</p>
                </div>
              </div>
            </div>
          </section>
          <section> {/* Personal information */}
            <h2 className='mb-4 text-2xl font-bold'>02. Datos personales</h2>
            <div className='mobile:flex-col mobile:gap-2 tablet:flex-row tablet:gap-4 flex'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>NÚMERO DE DNI</p>
                  <p>{user.dni}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>COLEGIO</p>
                  <p>{user.school}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>POR QUÉ SE ACERCÓ A NUESTRA INSTITUCIÓN</p>
                  <p>{user.motive}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>EDAD</p>
                  <p>{user.age} años</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>DOMICILIO</p>
                  <p>{user.address}</p>
                </div>
              </div>
            </div>
          </section>
          <section> {/* Create a user and a password */}
            <h2 className='mb-4 text-2xl font-bold'>03. Crear usuario y contraseña</h2>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <p className='text-xs text-gray-400'>USUARIO</p>
                <p>{user.user}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-xs text-gray-400'>CONTRASEÑA</p>
                <p>••••••</p>
              </div>
            </div>
          </section>
          <Link to={`/orientados/${user.id}/asignar-orientador`}>
            <Button type='button' name='Asignar orientador/a' />
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Oriented;