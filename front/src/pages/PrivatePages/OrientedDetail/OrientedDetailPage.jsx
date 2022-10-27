import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../sharedPrivateComponents/button/Button';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import useGet from '../hooks/useGet';

function Oriented() {
  const params = useParams();
  const idStudent = params.id;
  const [showAlert, setShowAlert] = useState(true);
  const { studentDetail, getOneStudent } = useGet();

  useEffect(() => {
    getOneStudent(idStudent);
  }, []);

  return (
    <div className='grid grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title='Orientados' />

        {studentDetail !== undefined ? (
          <main
            className={`max-w-max mx-auto px-8 laptop:mx-12 mt-6 flex flex-col gap-10 ${
              showAlert ? 'pb-24' : 'pb-7'
            }`}
          >
            <section>
              <h2 className='mb-4 text-2xl font-bold'>
                01. Información básica
              </h2>
              <div className='flex-col gap-3 tablet:flex-row tablet:gap-9 flex'>
                <img
                  src={
                    studentDetail.avatar
                      ? require(`../../../assets/students/${studentDetail.avatar}`)
                      : 'https://i.imgur.com/b08hxPY.png'
                  }
                  alt='avatar'
                  className='w-[96px] h-[96px] rounded-full'
                />
                <div className='flex flex-col gap-2'>
                  <h3 className='text-2xl'>{studentDetail.fullName}</h3>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>EMAIL</p>
                    <p>{studentDetail.email}</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>TELEFONO</p>
                    <p>{studentDetail.phoneNumber}</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>
                      PROGRAMA POR INICIAR
                    </p>
                    <p>{studentDetail.program}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-bold'>02. Datos personales</h2>
              <div className='flex-col gap-2 tablet:flex-row tablet:gap-4 flex'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>NÚMERO DE DNI</p>
                    <p>{studentDetail.dni}</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>COLEGIO</p>
                    <p>{studentDetail.school}</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>
                      POR QUÉ SE ACERCÓ A NUESTRA INSTITUCIÓN
                    </p>
                    <p>{studentDetail.motive}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>EDAD</p>
                    <p>{studentDetail.age} años</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-gray-400'>DOMICILIO</p>
                    <p>{studentDetail.address}</p>
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
                  <p>{studentDetail.user}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-gray-400'>CONTRASEÑA</p>
                  <p>••••••</p>
                </div>
              </div>
            </section>
            <Link to={`/orientados/${studentDetail.id}/asignar-orientador`}>
              <Button
                type='button'
                name={`${
                  studentDetail.adviser !== null
                    ? 'Visualizar orientador/a'
                    : 'Asignar orientador/a'
                }`}
              />
            </Link>
            {/* {
              (Date.parse(new Date()) - Date.parse('2022-09-21T23:20:30') <
              10000 ||
              showAlert) && (
              <Alert
                message='El orientado fue ingresado con éxito.'
                onclick={() => setShowAlert(false)}
              />
            )} */}
          </main>
        ) : null}
      </div>
    </div>
  );
}

export default Oriented;
