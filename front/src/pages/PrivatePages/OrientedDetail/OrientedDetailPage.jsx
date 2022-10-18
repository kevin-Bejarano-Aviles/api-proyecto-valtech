import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams,Link,useNavigate} from 'react-router-dom';
import Button from '../sharedPrivateComponents/button/Button';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import Alert from '../sharedPrivateComponents/Alert';


function Oriented() {
  const params = useParams();
  const url=process.env.REACT_APP_API_URL
  const baseUrl =`${url}/admin/students/${params.id}`
  const [user, setUser] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  const getAllStudents = async () => {
    try {
      const res = await axios.get(

        baseUrl,
        { withCredentials: true }
      );
      console.log(res.data.data.student);
    } catch (err) {
      console.log('error');
    }
  };

  useEffect(() => {
    getAllStudents();
  });

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title='Orientados' />
        {/* <main
          className={`mobile:max-w-max mobile:mx-auto mobile:px-8 laptop:mx-12 mt-6 flex flex-col gap-10 ${
            showAlert ? 'pb-24' : 'pb-7'
          }`}
        >
          <section>
            <h2 className='mb-4 text-2xl font-bold'>01. Información básica</h2>
            <div className='mobile:flex-col mobile:gap-3 tablet:flex-row tablet:gap-9 flex'>
              <img
                src={
                  user.avatar
<<<<<<< HEAD
                  ? require(`../../../assets/students/${user.avatar}`)
=======
                    ? require(`../../../assets/students/${user.avatar}`)
>>>>>>> serrano-DEVJ1-81/refactoriza-codigo-con-formik-y-yup
                    : 'https://i.imgur.com/b08hxPY.png'
                }
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
          <section>
            {' '}
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
                  <p className='text-xs text-gray-400'>
                    POR QUÉ SE ACERCÓ A NUESTRA INSTITUCIÓN
                  </p>
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
          <section>
            <h2 className='mb-4 text-2xl font-bold'>
              03. Usuario y contraseña
            </h2>
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
            <Button
              type='button'
              name={`${
                user.adviser !== null
                  ? 'Visualizar orientador/a'
                  : 'Asignar orientador/a'
              }`}
            />
          </Link>
          {(Date.parse(new Date()) - Date.parse('2022-09-21T23:20:30') <
            10000 ||
            showAlert) && (
            <Alert
              message='El orientado fue ingresado con éxito.'
              onclick={() => setShowAlert(false)}
            />
          )}
        </main> */}
      </div>
    </div>
  );
}

export default Oriented;
