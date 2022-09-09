import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';

function OrientedSignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      avatar: '/avatar.png',
      fullName: 'Lautaro Coria',
      phoneNumber: '1128816544',
      mail: 'lautaro.coria@proton.me',
      program: 'ov',
      dni: '39370581',
      school: 'Alte. Brown',
      age: '26',
      address: 'Av. Córdoba 3751',
      motive: 'Porque sí...',
      user: 'lautaro.coria',
      pass: '123'
    }
  });

  const onSubmit = async (data, e) => {
    console.log(data);
    e.preventDefault();
    try {
      let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        data: JSON.stringify({
          avatar: e.target.avatar.value,
          fullName: e.target.fullName.value,
          phoneNumber: e.target.phoneNumber.value,
          mail: e.target.mail.value,
          program: e.target.program.value,
          dni: e.target.dni.value,
          school: e.target.school.value,
          age: e.target.age.value,
          address: e.target.address.value,
          motive: e.target.motive.value,
          user: e.target.user.value,
          pass: e.target.pass.value
        })
      };
      await axios('http://localhost:5000/oriented', options);
      window.location.reload(true);
    } catch (err) {
      let message = err.response.statusText || 'Ocurrió un error';
      console.log(message);
    }
  };

  console.log(errors);
  console.log(watch());

  return (
    <Fragment>
      <HeaderAdmin Titulo='Orientado' />
      <form onSubmit={handleSubmit(onSubmit)} className='ml-6' id='form'>
        <section> {/* Información básica */}
          <h2 className='my-4 text-xl font-bold'>01. Información básica</h2>
          <div className='flex '>
            <label htmlFor='add-avatar'>
              <input
                {...register('avatar')}
                type='file'
                accept='image/*'
                id='add-avatar'
                hidden={true}
              />
              <img
                src='https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352102-stock-illustration-default-placeholder-profile-icon.jpg'
                alt='avatar'
                className='mr-4 w-16 h-16'
              />
              <p>{errors.avatar?.message}</p>
            </label>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='full-name'>Nombre y Apellido</label>
                <input
                  {...register('fullName', {
                    required: 'Campo requerido.',
                    pattern: {
                      value: /^[A-Za-z ]{2,500}$/,
                      message: "Campo inválido."
                    }
                  })}
                  className='border-2'
                  type='text'
                  id='full-name'
                />
                <p>{errors.fullName?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='phone'>Teléfono</label>
                <input
                  {...register('phoneNumber', {required: 'This is required'})}
                  className='border-2'
                  type='number'
                  id='phone'
                />
                <p>{errors.phoneNumber?.message}</p>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label htmlFor='mail'>Mail</label>
                <input
                  {...register('mail', {required: 'This is required'})}
                  className='border-2'
                  type='mail'
                  id='mail'
                />
                <p>{errors.mail?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='program'>Programa</label>
                <select
                  {...register('program', {required: 'This is required'})}
                  className='border-2 pb-1'
                  id='program'
                  defaultValue={'default'}
                >
                  <option value='default' disabled>Seleccionar opción</option>
                  <option value='ov'>Orientación vocacional</option>
                  <option value='ro'>Reorientación vocacional</option>
                  <option value='tm'>Taller de matemáticas</option>
                  <option value='me'>Métodos de estudio</option>
                </select>
                <p>{errors.program?.message}</p>
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
                <input
                  {...register('dni', {required: 'This is required'})}
                  className='border-2'
                  type='number'
                  id='dni'
                />
                <p>{errors.dni?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='school'>Colegio</label>
                <input
                  {...register('school', {required: 'This is required'})}
                  className='border-2'
                  type='text'
                  id='school'
                />
                <p>{errors.school?.message}</p>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label htmlFor='age'>Edad</label>
                <input
                  {...register('age', {required: 'This is required'})}
                  className='border-2'
                  type='number'
                  id='age'
                />
                <p>{errors.age?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Domicilio</label>
                <input
                  {...register('address', {required: 'This is required'})}
                  className='border-2'
                  type='text'
                  id='address'
                />
                <p>{errors.address?.message}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='reason'>¿Por qué se acercó a nuestra institución?</label>
            <textarea
              {...register('motive', {required: 'This is required'})}
              className='max-w-xl border-2'
              id='reason'
              cols='60'
              rows='5'
            ></textarea>
            <p>{errors.motive?.message}</p>
          </div>
        </section>
        <section> {/* Crear usuario y contraseña */}
          <h2 className='my-4 text-xl font-bold'>03. Crear usuario y contraseña</h2>
          <div className='flex'>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='username'>Usuario</label>
                <input
                  {...register('user', {required: 'This is required'})}
                  className='border-2'
                  type='text'
                  id='username'
                />
                <p>{errors.user?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='password'>Nueva contraseña</label>
                <input
                  {...register('pass', {required: 'This is required'})}
                  className='border-2'
                  type='password'
                  id='new-password'
                />
                <p>{errors.pass?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='repeat-new-password'>Repetir contraseña</label>
                <input
                  className='border-2'
                  type='password'
                  id='repeat-password'
                />
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