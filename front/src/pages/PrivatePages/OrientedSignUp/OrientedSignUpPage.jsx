import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Form, Field ,ErrorMessage, useField, useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Button from '../sharedPrivateComponents/button/Button';
import warningImg from '../../../assets/icons/icon_warning.svg'
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import PreviewImage from './components/PreviewImage';
import iconError from '../../../assets/icons/icon_warning.svg';
// import iconArrow from '../../../assets/icons/privatePage';
import programs from './programs.json';

const TextInput = ({ error,label, ...props }) => {
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px] mb-8'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <input
        className='mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2  focus:outline-green' 
		onChange={props.onChange}
		values={props.values}
		{...props}
	  />
      {error ? (
        <div className='text-red-500 flex mt-2'>
				<img src={warningImg} alt="warning" />
				<p className='ml-2'>{error}</p>
			</div>
      ) : null}
    </div>
  );
};

const TextArea = ({error, label, ...props }) => {
	return (
	  <div className='flex flex-col gap-1 mb-8'>
		<label htmlFor={props.name} className='text-sm'>{label}</label>
		<textarea
            className={`border-2 mobile:w-full max-w-[656px] p-2 rounded-lg ${error ? 'border-red-500' : ''}`}
		  	{...props}
		/>
		{ error? (
		  <div className='text-red-500 flex mt-2'>
				  <img src={warningImg} alt="warning" />
				  <p className='ml-2'>{error}</p>
			  </div>
		) : null}
	  </div>
	);
  };

const MySelect = ({error, label, ...props }) => {
	return (
	  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
		<label htmlFor={props.name} className='text-sm'>{label}</label>
		<select
        	className={`mobile:w-full tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400 appearance-none bg-no-repeat bg-[right_10px_center] border-2 ${(error) ? 'border-red-500' : ''}`}		  
		  	{...props}
		/>
		{ error ? 
		  <div className='text-red-500'>{error}</div>
		 : null}
	  </div>
	);
  };


function OrientedSignUpPage() {
  const url=process.env.REACT_APP_API_URL
  const navigate = useNavigate();

  const validationSchemaForm=Yup.object({
    fullName:Yup.string('Campo inválido')
    .min(2,'Entre 2 y 500 caracteres')
    .max(500,'')
    .required('Campo requerido'),
    email:Yup.string('Campo inválido').email('Email inválido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres').required('Campo requerido'),
    phoneNumber:Yup.number('Ingresar solo numeros').test('len', 'Entre 10 y 50 digitos', val => val.toString().length >= 10 && val.toString().length<=50),
    program:Yup.string().required('Selecciona una opción'),
	dni:Yup.number('Ingresar solo numeros').test('len', 'Entre 7 y 50 digitos', val => val.toString().length >= 7 && val.toString().length<=50).oneOf([Yup.ref('user')],'Los dni no coinciden'),
    age:Yup.number('Ingresar solo numeros').required('Campo requerido').min(18,'Mínimo valor: 18').max(99,'Máximo valor: 99'),
    school:Yup.string('Campo inválido').required('Campo requerido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres'),
    address:Yup.string('Campo inválido').required('Campo requerido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres'),
    motive:Yup.string('Campo inválido').required('Campo requerido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres'),
    user:Yup.number().required('Campo requerido').test('len', 'Entre 7 y 50 digitos', val => val.toString().length >= 7 && val.toString().length<=50).oneOf([Yup.ref('dni')],'Los dni no coinciden'),
    pass:Yup.string().required('Campo requerido').min(8,'Mínimo 8 caracteres').oneOf([Yup.ref('confirmPass')],'Las contraseñas no coinciden'),
    confirmPass:Yup.string().min(8,'Mínimo 8 caracteres').oneOf([Yup.ref('pass')],'Las contraseñas no coinciden').required('Campo requerido'),
	avatar:Yup.mixed().required('Es requerido'),
})
  
  // Function to 'Ingresar orietado' button.


  // Function to send a new student.
  const postStudent = async (data) => {
    try {
      let options = {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
          data: {
            ...data
          }
      };
      const response = await axios(`${url}/admin/students`, options);
	  console.log(response.data);
      localStorage.setItem('registrado',true)
	  getAllStudents()
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  // Function to bring all students.
  const getAllStudents = async () => {
    try {
      const response = await axios.get(`${url}/admin/students`, { withCredentials: true });
      const json = await response.data;
      const lastUserId = json[json.length-1].id;
      setTimeout(() => {
        navigate(`/orientados/${lastUserId}`);
      }, 1000);
    } catch (err) {
		console.log(err);
    //   console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  // Function to show the selected image by screen.


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

  const {handleSubmit,handleChange,errors,values,setFieldValue}=useFormik({
	initialValues:{
		fullName: 'Maria garcia',
		email: 'Maria.garcia@gmail.com',
		phoneNumber: '01162386020',
		program: 'Orientacion vocacional',
		dni: '28456389',
		age: '21',
		school: 'Nuestra señora del valle',
		address: 'Av. Córdoba 2445 piso 6 dpto C, CABA',
		motive: 'Necesita orientación para elegir una carrera.',
		user: '28456389',
		pass: '12345677',
		confirmPass: '12345677',
		avatar:''
	},
	validationSchema:validationSchemaForm,
	onSubmit:async (data) => {
		console.log(data);
		try {
		  let options = {
			  method: 'POST',
			  headers: { 'Content-Type': 'multipart/form-data' },
			  withCredentials: true,
			  data: data
		  };
		  const response = await axios(`${url}/admin/students`, options);
		  console.log(response.data);
		} catch (err) {
		  console.error(`${err.response.status}: ${err.response.statusText}`);
		  console.log(err);
		}
	  }
	
  })

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='pb-12 mx-12'>
          
          <form action="" onSubmit={handleSubmit}>
          <section className='mt-12'>
            <h2 className='my-4 text-2xl font-medium'>01. Información básica</h2>
			<div className='flex flex-col gap-4 tablet:flex-row'>
			
				<div className='flex mobile:flex-col'>
					 <PreviewImage file={values.avatar} change={(e)=>{
						setFieldValue('avatar',e.target.files[0])
					}}/>
					
				</div>

				<div className='tablet:grow'>
					<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
						<TextInput
							label='Nombre y Apellido'
							name='fullName'
							placeholder='Ingresar nombre completo'
							onChange={handleChange}
							values={values.fullName}
							error={errors.fullName}
						/>

						<TextInput
							label='Mail'
							name='email'
							placeholder='Ingresar mail'
							onChange={handleChange}
							values={values.email}
							error={errors.email}
						/>
					</div>
					<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
						<TextInput
							label='Teléfono'
							name='phoneNumber'
							placeholder='Ingresar nombre completo'
							onChange={handleChange}
							values={values.phoneNumber}
							error={errors.phoneNumber}
						/>
			
						<MySelect onChange={handleChange} error={errors.program} label='Programa' name='program'>
							{
								programs.programs.map(program=>(
									<option value={program.value}>{program.name}</option>
								))
							}
						</MySelect>
					</div>
				</div>
			  </div>
            </section>
			<section className='mt-4'>
				<h2 className='text-2xl font-medium'>02. Datos personales</h2>
				<div>
					<div className='flex gap-4 mobile:flex-col'>
						<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
							<TextInput
								label='Número de DNI'
								name='dni'
								placeholder='Ingresar dni'
								onChange={handleChange}
								values={values.dni}
								errors={errors.dni}

								
							/>
							<TextInput
								label='Ingresar edad'
								name='age'
								placeholder='Ingresar edad'
								onChange={handleChange}
								values={values.age}
								errors={errors.age}
							/>
						</div>
					</div>
					<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
						<TextInput
							label='Colegio'
							name='school'
							placeholder='Ingresar colegio'
							onChange={handleChange}
							values={values.school}
							errors={errors.school}
						/>
						<TextInput
							label='Domicilio'
							name='address'
							placeholder='Ingresar domicilio'
							onChange={handleChange}
							values={values.address}
							errors={errors.address}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<TextArea
							label='¿Por qué se acercó a nuestra institución?'
							name='motive'
							placeholder='Escribe un comentario'
							onChange={handleChange}
							value={values.motive}
							error={errors.motive}
						/>
					</div>
				</div>
			</section>
			<section>
				<h2 className='my-4 text-2xl font-medium'>03. Crear usuario y contraseña</h2>
				<div className='flex flex-col gap-3'>
					<TextInput
						label='Repetir Dni del orientado'
						name='user'
						placeholder='Ingresar DNI del Orientado'
						onChange={handleChange}
						values={values.user}
						error={errors.user}
					/>
					<TextInput
						label='Contraseña'
						name='pass'
						placeholder='Ingresar contraseña'
						onChange={handleChange}
						values={values.pass}
						error={errors.pass}

					/>
					<TextInput
						label='Repetir Contraseña'
						name='confirmPass'
						placeholder='Repetir contraseña'
						onChange={handleChange}
						values={values.confirmPass}
						error={errors.confirmPass}
					/>
				</div>
			</section>
			<Button type='submit' name='Ingresar orientado' />
          </form>
		 	
        </main>
      </div>
    </div>
  )
}

export default OrientedSignUpPage;