import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import iconError from '../img/icon_warning.svg';
import iconArrow from '../img/list-control.svg';
import iconPlus from '../img/icon-plus.svg';
import addAvatar from '../img/add-avatar.svg';


function OrientedSignUpPage() {
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState(false);

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
      await axios('http://localhost:8000/admin/addStudent', options);
      // window.location.reload(true);
      navigate(`/orientados/${e.target.user.value}`);
    } catch (err) {
      let message = err.response.statusText || 'Ocurrió un error';
      console.log(message);
    }
  };

  // console.log(errors);
  // console.log(watch());

  const showSelectedImage = () => {
    const $selectedImage = document.getElementById('selectedImage');
    const $inputFile = document.getElementById('inputFile');
    const objectURL = URL.createObjectURL($inputFile.files[0]);
    $selectedImage.src = objectURL;
  };

  return (
    <div className='grid grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientado' />
        <main className='pb-12'>
          <form onSubmit={handleSubmit(onSubmit)} className='ml-12' id='form'>
          <section className='mt-12'> {/* Información básica */}
            <h2 className='my-4 text-2xl font-bold'>01. Información básica</h2>
            <div className='flex '>
              <label htmlFor='inputFile'>
                <input
                  {...register('avatar', {required: 'Error'})}
                  type='file'
                  accept='image/*'
                  id='inputFile'
                  hidden={true}
                  onChange={() => showSelectedImage()}
                />
                <img
                  src={addAvatar}
                  alt='avatar'
                  className='mr-4 w-[96px] h-[96px] cursor-pointer rounded-full'
                  id='selectedImage'
                />
                <img src={iconPlus} alt='Agregar imagen' className='relative bottom-6 left-[72px]' />
                <span className='flex gap-1 text-red-500'>
                  {errors.avatar ? (<img src={iconError} alt='' />) : ''}
                  {errors.avatar?.message}
                </span>
              </label>
              <div className='flex flex-col gap-3 mr-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='full-name'>Nombre y Apellido</label>
                  <input
                    {...register('fullName', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                        message: 'Campo inválido'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.fullName ? 'border-red-500' : ''}`}
                    type='text'
                    id='full-name'
                    placeholder='Ingresar nombre completo'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.fullName ? (<img src={iconError} alt='' />) : ''}
                    {errors.fullName?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='phone'>Teléfono</label>
                  <input
                    {...register('phoneNumber', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[0-9]{10,50}$/i,
                        message: 'Entre 10 y 50 dígitos'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    type='tel'
                    id='phone'
                    placeholder='Teléfono'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.phoneNumber ? (<img src={iconError} alt='' />) : ''}
                    {errors.phoneNumber?.message}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='mail'>Mail</label>
                  <input
                    {...register('mail', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,500}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.mail ? 'border-red-500' : ''}`}
                    type='mail'
                    id='mail'
                    placeholder='Ingresar mail'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.mail ? (<img src={iconError} alt='' />) : ''}
                    {errors.mail?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='program'>Programa</label>
                  <select
                    {...register('program', {
                      required: 'Seleccina una opción'
                    })}
                    className={`border-2 pl-1 pr-2 w-80 h-10 rounded-lg ${selectValue ? '' : 'text-gray-400'} appearance-none bg-no-repeat bg-[right_10px_center]`}
                    style={{backgroundImage: `url(${iconArrow})`}}
                    id='program'
                    onChange={() => setSelectValue(true)}
                  >
                    <option selected hidden value=''>Seleccionar opción</option>
                    <option value='orientacion-vocacional' className='text-black'>Orientación vocacional</option>
                    <option value='reorientacion-vocacional' className='text-black'>Reorientación vocacional</option>
                    <option value='taller-de-matematicas' className='text-black'>Taller de matemáticas</option>
                    <option value='metodos-de-estudio' className='text-black'>Métodos de estudio</option>
                  </select>
                  <span className='flex gap-1 text-red-500'>
                    {errors.program ? (<img src={iconError} alt='' />) : ''}
                    {errors.program?.message}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className='mt-12'> {/* Datos personales */}
            <h2 className='my-4 text-2xl font-bold'>02. Datos personales</h2>
            <div className='flex'>
              <div className='flex flex-col gap-3 mr-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='dni'>Número de DNI</label>
                  <input
                    {...register('dni', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[0-9]{8,50}$/i,
                        message: 'Entre 8 y 50 dígitos'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.dni ? 'border-red-500' : ''}`}
                    type='tel'
                    id='dni'
                    placeholder='Ingresar DNI'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.dni ? (<img src={iconError} alt='' />) : ''}
                    {errors.dni?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='school'>Colegio</label>
                  <input
                    {...register('school', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[A-Za-z.ÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                        message: 'Campo inválido'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.school ? 'border-red-500' : ''}`}
                    type='text'
                    id='school'
                    placeholder='Ingresar colegio'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.school ? (<img src={iconError} alt='' />) : ''}
                    {errors.school?.message}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='age'>Edad</label>
                  <input
                    {...register('age', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[0-9]{2}$/i,
                        message: 'Sólo números'
                      },
                      min: {
                        value: 10,
                        message: 'Mínimo valor: 10'
                      },
                      max: {
                        value: 99,
                        message: 'Máximo valor: 99'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.age ? 'border-red-500' : ''}`}
                    type='tel'
                    id='age'
                    placeholder='Ingresar edad'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.age ? (<img src={iconError} alt='' />) : ''}
                    {errors.age?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='address'>Domicilio</label>
                  <input
                    {...register('address', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[A-Za-z0-9.,ÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                        message: 'Campo inválido'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.address ? 'border-red-500' : ''}`}
                    type='text'
                    id='address'
                    placeholder='Ingresar domicilio'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.address ? (<img src={iconError} alt='' />) : ''}
                    {errors.address?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1 mt-3'>
              <label htmlFor='reason'>¿Por qué se acercó a nuestra institución?</label>
              <textarea
                {...register('motive', {
                  required: 'Campo requerido',
                  pattern: {
                    value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ., ]{2,500}$/,
                    message: 'Campo inválido'
                  }
                })}
                className={`border-2 w-[656px] p-2 rounded-lg ${errors.motive ? 'border-red-500' : ''}`}
                id='reason'
                cols='60'
                rows='5'
                placeholder='Escribe un comentario'
              ></textarea>
              <span className='flex gap-1 text-red-500'>
                {errors.motive ? (<img src={iconError} alt='' />) : ''}
                {errors.motive?.message}
              </span>
            </div>
          </section>
          <section className='mt-16'> {/* Crear usuario y contraseña */}
            <h2 className='my-4 text-2xl font-bold'>03. Crear usuario y contraseña</h2>
            <div className='flex'>
              <div className='flex flex-col gap-3 mr-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='username'>Usuario</label>
                  <input
                    {...register('user', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[0-9]{8,50}$/i,
                        message: 'Entre 8 y 50 dígitos'
                      },
                      validate: value =>
                        value === watch('dni') || "DNI no coincide"
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.user ? 'border-red-500' : ''}`}
                    type='tel'
                    id='username'
                    placeholder='Ingresar DNI del Orientado'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.user ? (<img src={iconError} alt='' />) : ''}
                    {errors.user?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='password'>Nueva contraseña</label>
                  <input
                    {...register('pass', {
                      required: 'Contraseña requerida',
                      minLength: {
                        value: 8,
                        message: 'Mínimo 8 caracteres'
                      }
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.pass ? 'border-red-500' : ''}`}
                    type='password'
                    id='new-password'
                    placeholder='Ingresar contraseña'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.pass ? (<img src={iconError} alt='' />) : ''}
                    {errors.pass?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='repeat-new-password'>Repetir contraseña</label>
                  <input
                    {...register('confirmPass', {
                      required: 'Campo requerido',
                      validate: value =>
                        value === watch('pass') || "The passwords do not match"
                    })}
                    className={`border-2 p-2 w-80 h-10 rounded-lg ${errors.confirmPass ? 'border-red-500' : ''}`}
                    type='password'
                    id='repeat-password'
                    placeholder='Repetir contraseña'
                  />
                  <span className='flex gap-1 text-red-500'>
                    {errors.confirmPass ? (<img src={iconError} alt='' />) : ''}
                    {errors.confirmPass?.message}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div className='flex items-center gap-4 mt-12'>
            <Button type='submit' name='Ingresar orientado' />
            <Link className='underline' to={'/orientados'}>Cancelar ingreso</Link>
          </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default OrientedSignUpPage;