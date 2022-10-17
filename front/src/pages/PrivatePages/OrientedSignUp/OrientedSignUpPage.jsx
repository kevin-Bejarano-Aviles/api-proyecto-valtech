import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Form, Field ,ErrorMessage, useField, useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Button from '../sharedPrivateComponents/button/Button';
import warningImg from '../../../assets/icons/icon_warning.svg'
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import iconError from '../../../assets/icons/icon_warning.svg';
// import iconArrow from '../../../assets/icons/privatePage';
import programs from './programs.json';
import iconPlus from '../../../assets/icons/icon-plus.svg';
import addAvatar from '../../../assets/icons/privatePage/add-avatar.svg';

const showSelectedImage = () => {

    const $selectedImage = document.getElementById('selectedImage');
    const $avatar = document.getElementById('avatar');
    const objectURL = URL.createObjectURL($avatar.files[0]);
    $selectedImage.src = objectURL;
	// setFieldValue(e.target.files[0])
	//investigar como setear los 
};


// const MyFileInput = ({children, ...props }) => {
	
// 	return (
// 	  <div className='flex mobile:flex-col'>
// 		<label htmlFor={props.name} className='text-sm'>
// 		<input
//         	type='file'
//             accept='.png, .jpg, .jpeg, .gif'
// 	        hidden={true}
// 			id={props.name}
// 			onChangeCapture={(e)=>{
// 				showSelectedImage()
// 				setFile(e.target.files[0])
// 			}}
// 			{...props}
//         />
// 		{children}
// 		</label>
// 	  </div>
// 	);
//   };

const MyTextInput = ({ error,label, ...props }) => {
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px] mb-8'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <input
        className='mobile:w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 focus:outline-green' 
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

const MyTextArea = ({ label, ...props }) => {
	return (
	  <div className='flex flex-col gap-1 mb-8'>
		<label htmlFor={props.name} className='text-sm'>{label}</label>
		<textarea
            className={`border-2 mobile:w-full max-w-[656px] p-2 rounded-lg ${meta.touched && meta.error ? 'border-red-500' : ''}`}
		  	{...props}
		/>
		{/* {meta.touched && meta.error ? (
		  <div className='text-red-500 flex mt-2'>
				  <img src={warningImg} alt="warning" />
				  <p className='ml-2'>{meta.error}</p>
			  </div>
		) : null} */}
	  </div>
	);
  };

const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
	  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
		<label htmlFor={props.name} className='text-sm'>{label}</label>
		<select
        	className={`mobile:w-full tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400 appearance-none bg-no-repeat bg-[right_10px_center] border-2 ${(meta.touched && meta.error) ? 'border-red-500' : ''}`}		  
			{...field}
		  	{...props}
		/>
		{meta.touched && meta.error ? (
		  <div className='text-red-500'>{meta.error}</div>
		) : null}
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
      console.error(`${err.response.status}: ${err.response.statusText}`);
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

  const {handleSubmit,handleChange,errors,values}=useFormik({
	initialValues:{
		fullName: 'Julian Martinez',
		email: 'julian.martinez@gmail.com',
		phoneNumber: '01162386020',
		program: 'Orientacion vocacional',
		dni: '28456387',
		age: '18',
		school: 'Nuestra señora del valle',
		address: 'Av. Córdoba 2445 piso 6 dpto C, CABA',
		motive: 'Necesita orientación para elegir una carrera.',
		user: '28456387',
		pass: '12345678',
		confirmPass: '12345678',
		avatar:''
	},
	validationSchema:validationSchemaForm,
	onSubmit:(values)=>{
		console.log(values);
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
				{/* <MyFileInput name='avatar'>
					<div className='relative mobile:w-[96px]'>
                      <img
                        src={addAvatar}
                        alt='avatar'
                        className='w-[96px] h-[96px] cursor-pointer rounded-full'
                        id='selectedImage'
                      />
                      <img src={iconPlus} alt='Agregar imagen' className='absolute bottom-0 right-0' />
                    </div>
				</MyFileInput> */}

				<div className='tablet:grow'>
					<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
						<MyTextInput
							label='Nombre y Apellido'
							name='fullName'
							placeholder='Ingresar nombre completo'
							onChange={handleChange}
							values={values.fullName}
							error={errors.fullName}
						/>

						<MyTextInput
							label='Mail'
							name='email'
							placeholder='Ingresar mail'
							onChange={handleChange}
							values={values.email}
							error={errors.email}
						/>
					</div>
					<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
						<MyTextInput
							label='Teléfono'
							name='phoneNumber'
							placeholder='Ingresar nombre completo'
							onChange={handleChange}
							values={values.phoneNumber}
						/>
			
						{/* <MySelect label='Programa' name='program'>
							{
								programs.programs.map(program=>(
									<option value={program.value}>{program.name}</option>
								))
							}
						</MySelect> */}
					</div>
				</div>
			  </div>
            </section>
			{/* <section className='mt-4'>
				<h2 className='text-2xl font-medium'>02. Datos personales</h2>
				<div>
					<div className='flex gap-4 mobile:flex-col'>
						<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
							<MyTextInput
								label='Número de DNI'
								name='dni'
								placeholder='Ingresar dni'
							/>
							<MyTextInput
								label='Ingresar edad'
								name='age'
								placeholder='Ingresar edad'
							/>
						</div>
					</div>
					<div className='flex gap-3 mobile:flex-col tablet:flex-row'>
						<MyTextInput
							label='Colegio'
							name='school'
							placeholder='Ingresar colegio'
						/>
						<MyTextInput
							label='Domicilio'
							name='address'
							placeholder='Ingresar domicilio'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<MyTextArea
							label='¿Por qué se acercó a nuestra institución?'
							name='motive'
							placeholder='Escribe un comentario'
						/>
					</div>
				</div>
			</section>
			<section>
				<h2 className='my-4 text-2xl font-medium'>03. Crear usuario y contraseña</h2>
				<div className='flex flex-col gap-3'>
					<MyTextInput
						label='Repetir Dni del orientado'
						name='user'
						placeholder='Ingresar DNI del Orientado'
					/>
					<MyTextInput
						label='Contraseña'
						name='pass'
						placeholder='Ingresar contraseña'
					/>
					<MyTextInput
						label='Repetir Contraseña'
						name='confirmPass'
						placeholder='Repetir contraseña'
					/>
				</div>
			</section> */}
			<Button type='submit' name='Ingresar orientado' />
          </form>
		 	
        </main>
      </div>
    </div>
  )
}

export default OrientedSignUpPage;