import { Fragment } from 'react';
import { Link, Outlet} from 'react-router-dom';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';

function Oriented() {
  return (
    <Fragment>
      <HeaderAdmin Titulo={<Outlet/>} />
      <main className='ml-6'>
        <section> {/* Información básica */}
          <h2 className='my-4 text-xl font-bold'>01. Información básica</h2>
          <div className='flex'>
            <img
              src='https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352102-stock-illustration-default-placeholder-profile-icon.jpg'
              alt='avatar'
              className='mr-4 w-16 h-16'
            />
            <div className='mr-4'>
              <h3 className='font-semibold text-lg'>Julian Martinez</h3>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>EMAIL</p>
                <p className='font-semibold text-sm'>julian.martinez@gmail.com</p>
              </div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>TELEFONO</p>
                <p className='font-semibold text-sm'>1544806208</p>
              </div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>PROGRAMA POR INICIAR</p>
                <p className='font-semibold text-sm'>Orientación vocacional</p>
              </div>
            </div>
          </div>
        </section>
        <section> {/* Datos personales */}
          <h2 className='my-4 text-xl font-bold'>02. Datos personales</h2>
          <div className='flex'>
            <div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>NÚMERO DE DNI</p>
                <p className='font-semibold text-sm'>28456387</p>
              </div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>COLEGIO</p>
                <p className='font-semibold text-sm'>Nuestra señora del Valle</p>
              </div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>POR QUÉ SE ACERCÓ A NUESTRA INSTITUCIÓN</p>
                <p className='font-semibold text-sm'>Necesira orientación para elegir una carrera.</p>
              </div>
            </div>
            <div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>EDAD</p>
                <p className='font-semibold text-sm'>17 años</p>
              </div>
              <div className='my-2'>
                <p className='text-xs text-gray-400'>DOMICILIO</p>
                <p className='font-semibold text-sm'>Av. Córdoba 2445 piso 6 dpto C, CABA</p>
              </div>
            </div>
          </div>
        </section>
        <section className='mb-4'> {/* Crear usuario y contraseña */}
          <h2 className='my-4 text-xl font-bold'>03. Crear usuario y contraseña</h2>
          <div className='my-2'>
            <p className='text-xs text-gray-400'>USUARIO</p>
            <p className='font-semibold text-sm'>julian.martinez</p>
          </div>
          <div className='my-2'>
            <p className='text-xs text-gray-400'>CONTRASEÑA</p>
            <p className='font-semibold text-sm'>******</p>
          </div>
        </section>
        <Button type='button' name='Asignar orientador/a' />
      </main>
    </Fragment>
  )
}

export default Oriented;