import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';

function OrientedSignUpPage() {
  return (
    <Fragment>
      <HeaderAdmin Titulo='Orientado' />
      <form className='ml-6'>
        <section> {/* Información básica */}
          <h2 className='my-4 text-xl font-bold'>01. Información básica</h2>
          <div className='flex '>
            <label htmlFor='add-avatar'>
              <input type='file' accept='image/*' name='' id='add-avatar' hidden='true' />
              <img
                src='https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352102-stock-illustration-default-placeholder-profile-icon.jpg'
                alt='avatar'
                className='mr-4 w-16 h-16'
              />
            </label>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='full-name'>Nombre y Apellido</label>
                <input className='border-2' type='text' id='full-name' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='phone'>Teléfono</label>
                <input className='border-2' type='number' id='phone' />
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label htmlFor='mail'>Mail</label>
                <input className='border-2' type='mail' id='mail' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='program'>Programa</label>
                <select className='border-2 pb-1' id='program' name=''>
                  <option value='' selected disabled>Seleccionar opción</option>
                  <option value=''>Orientación vocacional</option>
                  <option value=''>Reorientación vocacional</option>
                  <option value=''>Taller de matemáticas</option>
                  <option value=''>Métodos de estudio</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <section> {/* Datos personales */}
          <h2 className='my-4 text-xl font-bold'>02. Datos personales</h2>
          <div className='flex'>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='dni'>Número de DNI</label>
                <input className='border-2' type='number' id='dni' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='school'>Colegio</label>
                <input className='border-2' type='text' id='school' />
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label htmlFor='age'>Edad</label>
                <input className='border-2' type='number' id='age' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Domicilio</label>
                <input className='border-2' type='text' id='address' />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='reason'>¿Por qué se acercó a nuestra institución?</label>
            <textarea className='max-w-xl border-2' name='' id='reason' cols='60' rows='5'></textarea>
          </div>
        </section>
        <section> {/* Crear usuario y contraseña */}
          <h2 className='my-4 text-xl font-bold'>03. Crear usuario y contraseña</h2>
          <div className='flex'>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='username'>Usuario</label>
                <input className='border-2' type='text' id='username' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='new-password'>Nueva contraseña</label>
                <input className='border-2' type='password' id='new-password' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='repeat-new-password'>Repetir contraseña</label>
                <input className='border-2' type='password' id='repeat-new-password' />
              </div>
            </div>
          </div>
        </section>
        <div className='flex items-center gap-4 mt-6'>
          <Button type='submit' name='Ingresar orientado' />
          <Link className='underline' to={'/orientados'}>Cancelar ingreso</Link>
        </div>
      </form>
    </Fragment>
  )
}

export default OrientedSignUpPage;