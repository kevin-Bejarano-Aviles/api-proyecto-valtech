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
  } = useForm(
    // {
    //   defaultValues: {
    //     fullName: 'Lautaro Coria',
    //     phoneNumber: '1128816544',
    //     mail: 'lautaro.coria@proton.me',
    //     program: 'orientacion-vocacional',
    //     dni: '39370581',
    //     school: 'Alte. Brown',
    //     age: '26',
    //     address: 'Av. Córdoba 3751',
    //     motive: 'Porque sí...',
    //     user: 'lautaro.coria',
    //     pass: '123'
    //   }
    // }
  );

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

  // console.log(errors);
  // console.log(watch());

  return (
    <Fragment>
      <HeaderAdmin Titulo='Orientado' />
      <form onSubmit={handleSubmit(onSubmit)} className='ml-6' id='form'>
        <section> {/* Información básica */}
          <h2 className='my-4 text-xl font-bold'>01. Información básica</h2>
          <div className='flex '>
            <label htmlFor='add-avatar'>
              <input
                {...register('avatar', {required: 'Imagen requerida'})}
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
              <p className='text-red-500'>{errors.avatar?.message}</p>
            </label>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='full-name'>Nombre y Apellido</label>
                <input
                  {...register('fullName', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                      message: 'Campo inválido'
                    }
                  })}
                  className={`border-2 ${errors.fullName ? 'border-red-500' : ''}`}
                  type='text'
                  id='full-name'
                />
                <p className='text-red-500'>{errors.fullName?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='phone'>Teléfono</label>
                <input
                  {...register('phoneNumber', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[0-9]{10,50}$/i,
                      message: 'Entre 10 y 50 dígitos'
                    }
                  })}
                  className={`border-2 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  type='number'
                  id='phone'
                />
                <p className='text-red-500'>{errors.phoneNumber?.message}</p>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label htmlFor='mail'>Mail</label>
                <input
                  {...register('mail', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,500}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className={`border-2 ${errors.mail ? 'border-red-500' : ''}`}
                  type='mail'
                  id='mail'
                />
                <p className='text-red-500'>{errors.mail?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='program'>Programa</label>
                <select
                  {...register('program')}
                  className='border-2 pb-1'
                  id='program'
                >
                  <option value='orientacion-vocacional'>Orientación vocacional</option>
                  <option value='reorientacion-vocacional'>Reorientación vocacional</option>
                  <option value='taller-de-matematicas'>Taller de matemáticas</option>
                  <option value='metodos-de-estudio'>Métodos de estudio</option>
                </select>
                <p className='text-red-500'>{errors.program?.message}</p>
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
                  {...register('dni', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[0-9]{8,50}$/i,
                      message: 'Entre 8 y 50 dígitos'
                    }
                  })}
                  className={`border-2 ${errors.dni ? 'border-red-500' : ''}`}
                  type='number'
                  id='dni'
                />
                <p className='text-red-500'>{errors.dni?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='school'>Colegio</label>
                <input
                  {...register('school', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[A-Za-z.ÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                      message: 'Campo inválido'
                    }
                  })}
                  className={`border-2 ${errors.school ? 'border-red-500' : ''}`}
                  type='text'
                  id='school'
                />
                <p className='text-red-500'>{errors.school?.message}</p>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label htmlFor='age'>Edad</label>
                <input
                  {...register('age', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[0-9]{2}$/i,
                      message: 'Sólo números'
                    },
                    min: {
                      value: 18,
                      message: 'Mínimo valor: 18'
                    },
                    max: {
                      value: 99,
                      message: 'Máximo valor: 99'
                    }
                  })}
                  className={`border-2 ${errors.age ? 'border-red-500' : ''}`}
                  type='number'
                  id='age'
                />
                <p className='text-red-500'>{errors.age?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Domicilio</label>
                <input
                  {...register('address', {
                    required: 'Campo requerido',
                    pattern: {
                      value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                      message: 'Campo inválido'
                    }
                  })}
                  className={`border-2 ${errors.address ? 'border-red-500' : ''}`}
                  type='text'
                  id='address'
                />
                <p className='text-red-500'>{errors.address?.message}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='reason'>¿Por qué se acercó a nuestra institución?</label>
            <textarea
              {...register('motive', {
                required: 'Campo requerido',
                pattern: {
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ. ]{2,500}$/,
                  message: 'Campo inválido'
                }
              })}
              className={`border-2 max-w-xl ${errors.motive ? 'border-red-500' : ''}`}
              id='reason'
              cols='60'
              rows='5'
            ></textarea>
            <p className='text-red-500'>{errors.motive?.message}</p>
          </div>
        </section>
        <section> {/* Crear usuario y contraseña */}
          <h2 className='my-4 text-xl font-bold'>03. Crear usuario y contraseña</h2>
          <div className='flex'>
            <div className='mr-4'>
              <div className='flex flex-col'>
                <label htmlFor='username'>Usuario</label>
                <input
                  {...register('user', {required: 'Campo requerido'})}
                  className={`border-2 ${errors.user ? 'border-red-500' : ''}`}
                  type='text'
                  id='username'
                />
                <p className='text-red-500'>{errors.user?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='password'>Nueva contraseña</label>
                <input
                  {...register('pass', {
                    required: 'Contraseña requerida',
                    minLength: {
                      value: 8,
                      message: 'Mínimo 8 caracteres'
                    }
                  })}
                  className={`border-2 ${errors.pass ? 'border-red-500' : ''}`}
                  type='password'
                  id='new-password'
                />
                <p className='text-red-500'>{errors.pass?.message}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='repeat-new-password'>Repetir contraseña</label>
                <input
                  {...register('confirmPass', {
                    required: 'Campo requerido',
                    validate: value =>
                      value === watch('pass') || "The passwords do not match"
                  })}
                  className={`border-2 ${errors.confirmPass ? 'border-red-500' : ''}`}
                  type='password'
                  id='repeat-password'
                />
                <p className='text-red-500'>{errors.confirmPass?.message}</p>
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