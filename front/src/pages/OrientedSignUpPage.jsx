import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
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
  const [formError, setFormError] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    console.log(formError);
    if (formError.message) getAllStudents();
  },[formError]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    // {
    //   defaultValues: {
    //     fullName: 'Julian Martinez',
    //     email: 'julian.martinez@gmail.com',
    //     phoneNumber: '01162386020',
    //     program: 'Orientacion vocacional',
    //     dni: '28456387',
    //     age: '18',
    //     school: 'Nuestra señora del valle',
    //     address: 'Av. Córdoba 2445 piso 6 dpto C, CABA',
    //     motive: 'Necesita orientación para elegir una carrera.',
    //     user: '28456387',
    //     pass: '12345678',
    //     confirmPass: '12345678'
    //   }
    // }
  );

  useEffect(() => {
    if (
      watch().address === '' ||
      watch().age === '' ||
      watch().avatar.length < 1 ||
      watch().confirmPass === '' ||
      watch().dni === '' ||
      watch().email === '' ||
      watch().fullName === '' ||
      watch().motive === '' ||
      watch().pass === '' ||
      watch().phoneNumber === '' ||
      watch().program === '' ||
      watch().school === '' ||
      watch().user === ''
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  },[watch()]);

  // Function to 'Ingresar orietado' button.
  const onSubmit = async (data, e) => {
    e.preventDefault();
    postStudent(data, e);
  };

  // Function to send a new student.
  const postStudent = async (data, e) => {
    try {
      let options = {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
          data: {
            ...data,
            avatar: e.target.avatar.files[0],
          }
      };
      const response = await axios('http://localhost:8000/admin/addStudent', options);
      localStorage.setItem('registrado',true)
      setFormError(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
      console.log(err);
      setFormError(err.response.data);
    }
  };

  // Function to bring all students.
  const getAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students', { withCredentials: true });
      const json = await response.data;
      const lastUserId = json[json.length-1].id;
      setTimeout(() => {
        navigate(`/orientados/${lastUserId}`);
      }, 1000);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  // Function to show the selected image by screen.
  const showSelectedImage = () => {
    const $selectedImage = document.getElementById('selectedImage');
    const $inputFile = document.getElementById('inputFile');
    const objectURL = URL.createObjectURL($inputFile.files[0]);
    $selectedImage.src = objectURL;
  };

  // Function to change the background color of the input elements.
  const changeBackgroundColor = e => {
    if (e.target.value) {
      e.target.classList.remove('bg-white');
      e.target.classList.add('bg-inputbackground');
    } else {
      e.target.classList.add('bg-white');
      e.target.classList.remove('bg-inputbackground');
    }
  };

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='pb-12 mx-12'>
          <form onSubmit={handleSubmit(onSubmit)} id='form'>
            <section className='mt-12'> {/* Basic information */}
              <h2 className='my-4 text-2xl font-medium'>01. Información básica</h2>
              <div className={`flex gap-4 mobile:flex-col ${(!formError.avatar) ? 'tablet:flex-row': ''}`}>
                <div className={`${(errors.avatar || formError.avatar) ? 'mobile:' : ''}`}>
                  <label htmlFor='inputFile'>
                    <input
                      {...register('avatar', {required: 'Requerido'})}
                      type='file'
                      accept='.png, .jpg, .jpeg, .gif'
                      id='inputFile'
                      hidden={true}
                      onChangeCapture={() => showSelectedImage()}
                    />
                    <div className='relative mobile:w-[96px]'>
                      <img
                        src={addAvatar}
                        alt='avatar'
                        className='w-[96px] h-[96px] cursor-pointer rounded-full'
                        id='selectedImage'
                      />
                      <img src={iconPlus} alt='Agregar imagen' className='absolute bottom-0 right-0' />
                    </div>
                  </label>
                  <span className='flex gap-1 text-red-500'>
                      {(errors.avatar || formError.avatar) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.avatar ? formError.avatar.msg : ''}
                      {errors.avatar?.message}
                  </span>
                </div>
                <div className='tablet:grow'>
                  <div className='flex gap-3 mobile:flex-col tablet:flex-row'>
                    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                      <label htmlFor='full-name'>Nombre y Apellido</label>
                      <input
                        {...register('fullName', {
                          required: 'Campo requerido',
                          pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                            message: 'Campo inválido'
                          }
                        })}
                        className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(errors.fullName || formError.fullName) ? 'border-red-500' : ''}`}
                        type='text'
                        id='full-name'
                        placeholder='Ingresar nombre completo'
                        onBlur={e => changeBackgroundColor(e)}
                      />
                      <span className='flex gap-1 text-red-500'>
                        {(errors.fullName || formError.fullName) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                        {formError.fullName ? formError.fullName.msg : ''}
                        {errors.fullName?.message}
                      </span>
                    </div>
                    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                      <label htmlFor='mail'>Mail</label>
                      <input
                        {...register('email', {
                          required: 'Campo requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,500}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(errors.email || formError.email) ? 'border-red-500' : ''}`}
                        type='mail'
                        id='mail'
                        placeholder='Ingresar mail'
                        onBlur={e => changeBackgroundColor(e)}
                      />
                      <span className='flex gap-1 text-red-500'>
                        {(errors.email || formError.email) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                        {formError.email ? formError.email.msg : ''}
                        {errors.email?.message}
                      </span>
                    </div>
                  </div>
                  <div className='flex gap-3 mobile:flex-col tablet:flex-row'>
                    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                      <label htmlFor='phone'>Teléfono</label>
                      <input
                        {...register('phoneNumber', {
                          required: 'Campo requerido',
                          pattern: {
                            value: /^[0-9]{10,50}$/i,
                            message: 'Entre 10 y 50 dígitos'
                          }
                        })}
                        className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(errors.phoneNumber || formError.phoneNumber) ? 'border-red-500' : ''}`}
                        type='tel'
                        id='phone'
                        placeholder='Teléfono'
                        onBlur={e => changeBackgroundColor(e)}
                      />
                      <span className='flex gap-1 text-red-500'>
                        {(errors.phoneNumber || formError.phoneNumber) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                        {formError.phoneNumber ? formError.phoneNumber.msg : ''}
                        {errors.phoneNumber?.message}
                      </span>
                    </div>
                    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                      <label htmlFor='program'>Programa</label>
                      <select
                        {...register('program', {
                          required: 'Selecciona una opción',
                        })}
                        className={`mobile:w-full tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400 appearance-none bg-no-repeat bg-[right_10px_center] border-2 ${(errors.program || formError.program) ? 'border-red-500' : ''}`}
                        style={{backgroundImage: `url(${iconArrow})`}}
                        id='program'
                        onBlur={e => changeBackgroundColor(e)}
                        onFocus={e => e.target.classList.add('text-black')}
                        onChangeCapture={e => e.target.classList.add('text-black')}
                      >
                        <option selected hidden value=''>Seleccionar opción</option>
                        <option value='Orientacion vocacional'>Orientación vocacional</option>
                        <option value='Reorientacion vocacional'>Reorientación vocacional</option>
                        <option value='Taller de matematicas'>Taller de matemáticas</option>
                        <option value='Metodos de estudio'>Métodos de estudio</option>
                      </select>
                      <span className='flex gap-1 text-red-500'>
                        {(errors.program || formError.program) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                        {formError.program ? formError.program.msg : ''}
                        {errors.program?.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className='mt-12'> {/* Personal information */}
              <h2 className='my-4 text-2xl font-medium'>02. Datos personales</h2>
              <div className='flex gap-4 mobile:flex-col'>
                <div className='flex gap-3 mobile:flex-col tablet:flex-row'>
                  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                    <label htmlFor='dni'>Número de DNI</label>
                    <input
                      {...register('dni', {
                        required: 'Campo requerido',
                        pattern: {
                          value: /^[0-9]{7,50}$/i,
                          message: 'Entre 7 y 50 dígitos'
                        }
                      })}
                      className={`border-2 p-2 mobile:w-full w-80 h-10 rounded-lg ${(errors.dni || formError.dni) ? 'border-red-500' : ''}`}
                      type='tel'
                      id='dni'
                      placeholder='Ingresar DNI'
                      onBlur={e => changeBackgroundColor(e)}
                    />
                    <span className='flex gap-1 text-red-500'>
                      {(errors.dni ||formError.dni) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.dni ? formError.dni.msg : ''}
                      {errors.dni?.message}
                    </span>
                  </div>
                  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
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
                      className={`border-2 p-2 mobile:w-full w-80 h-10 rounded-lg ${(errors.age || formError.age) ? 'border-red-500' : ''}`}
                      type='tel'
                      id='age'
                      placeholder='Ingresar edad'
                      onBlur={e => changeBackgroundColor(e)}
                    />
                    <span className='flex gap-1 text-red-500'>
                      {(errors.age || formError.age) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.age ? formError.age.msg : ''}
                      {errors.age?.message}
                    </span>
                  </div>
                </div>
                <div className='flex gap-3 mobile:flex-col tablet:flex-row'>
                  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                    <label htmlFor='school'>Colegio</label>
                    <input
                      {...register('school', {
                        required: 'Campo requerido',
                        pattern: {
                          value: /^[A-Za-z.ÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                          message: 'Campo inválido'
                        }
                      })}
                      className={`border-2 p-2 mobile:w-full w-80 h-10 rounded-lg ${(errors.school || formError.school) ? 'border-red-500' : ''}`}
                      type='text'
                      id='school'
                      placeholder='Ingresar colegio'
                      onBlur={e => changeBackgroundColor(e)}
                    />
                    <span className='flex gap-1 text-red-500'>
                      {(errors.school || formError.school) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.school ? formError.school.msg : ''}
                      {errors.school?.message}
                    </span>
                  </div>
                  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                    <label htmlFor='address'>Domicilio</label>
                    <input
                      {...register('address', {
                        required: 'Campo requerido',
                        pattern: {
                          value: /^[A-Za-z0-9.,ÁÉÍÓÚáéíóúÜüÑñ ]{2,500}$/,
                          message: 'Campo inválido'
                        }
                      })}
                      className={`border-2 p-2 mobile:w-full w-80 h-10 rounded-lg ${(errors.address || formError.address) ? 'border-red-500' : ''}`}
                      type='text'
                      id='address'
                      placeholder='Ingresar domicilio'
                      onBlur={e => changeBackgroundColor(e)}
                    />
                    <span className='flex gap-1 text-red-500'>
                      {(errors.address || formError.address) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.address ? formError.address.msg : ''}
                      {errors.address?.message}
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='reason'>¿Por qué se acercó a nuestra institución?</label>
                  <textarea
                    {...register('motive', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ., ]{2,500}$/,
                        message: 'Campo inválido'
                      }
                    })}
                    className={`border-2 mobile:w-full max-w-[656px] p-2 rounded-lg ${(errors.motive || formError.motive) ? 'border-red-500' : ''}`}
                    id='reason'
                    cols='60'
                    rows='5'
                    placeholder='Escribe un comentario'
                    onBlur={e => changeBackgroundColor(e)}
                  ></textarea>
                  <span className='flex gap-1 text-red-500'>
                    {(errors.motive || formError.motive) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.motive ? formError.motive.msg : ''}
                    {errors.motive?.message}
                  </span>
                </div>
              </div>
            </section>
            <section className='mt-16'> {/* Create a username and a password */}
              <h2 className='my-4 text-2xl font-medium'>03. Crear usuario y contraseña</h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='username'>Usuario</label>
                  <input
                    {...register('user', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[0-9]{7,50}$/i,
                        message: 'Entre 7 y 50 dígitos'
                      },
                      validate: value =>
                        value === watch('dni') || 'DNI no coincide'
                    })}
                    className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(errors.user || formError.user) ? 'border-red-500' : ''}`}
                    type='tel'
                    id='username'
                    placeholder='Ingresar DNI del Orientado'
                    onBlur={e => changeBackgroundColor(e)}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {(errors.user || formError.user) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.user ? formError.user.msg : ''}
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
                    className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(errors.pass || formError.pass) ? 'border-red-500' : ''}`}
                    type='password'
                    id='new-password'
                    placeholder='Ingresar contraseña'
                    onBlur={e => changeBackgroundColor(e)}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {(errors.pass || formError.pass) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.pass ? formError.pass.msg : ''}
                    {errors.pass?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='repeat-new-password'>Repetir contraseña</label>
                  <input
                    {...register('confirmPass', {
                      required: 'Campo requerido',
                      validate: value =>
                        value === watch('pass') || 'Las contraseñas no coinciden'
                    })}
                    className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(errors.confirmPass || formError.confirmPass) ? 'border-red-500' : ''}`}
                    type='password'
                    id='repeat-password'
                    placeholder='Repetir contraseña'
                    onBlur={e => changeBackgroundColor(e)}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {(errors.confirmPass || formError.confirmPass) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.confirmPass ? formError.confirmPass.msg : ''}
                    {errors.confirmPass?.message}
                  </span>
                </div>
              </div>
            </section>
            <div className='mobile:flex-col tablet:flex-row flex items-center gap-4 mt-12'>
              <Button type='submit' name='Ingresar orientado' disabled={isEmpty} />
              <a href='#' className='underline' onClick={() => navigate(-1)}>Cancelar ingreso</a>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default OrientedSignUpPage;