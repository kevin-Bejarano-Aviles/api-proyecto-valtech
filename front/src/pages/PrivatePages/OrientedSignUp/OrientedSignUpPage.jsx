import {useFormik} from 'formik';
import { getValidationSchema } from './getValidationSchema';
import Button from '../sharedPrivateComponents/button/Button';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import PreviewImage from './components/PreviewImage';
import TextArea from './components/TextArea';
import TextInput from './components/TextInput';
import Select from './components/Select';
import programs from './programs.json';
import usePost from '../hooks/usePost';
import warningImg from '../../../assets/icons/icon_warning.svg'

function OrientedSignUpPage() {
	const {postStudent,errorSignUpObject}=usePost();

  const {handleSubmit,handleChange,handleBlur,setFieldValue,errors,values,isValid,touched}=useFormik({
	initialValues:{
		fullName: '',
		email: '',
		phoneNumber: '',
		program: '',
		dni: '',
		age: '',
		school: '',
		address: '',
		motive: '',
		user: '',
		pass: '',
		confirmPass: '',
		avatar:''
	},
	validationSchema: getValidationSchema(),
	onSubmit:(data)=>{
		postStudent(data);
	}
  })

  return (
    <div className='grid grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='pb-12 mx-12'>
          <form action="" onSubmit={handleSubmit}>
          <section className='mt-12'>
            <h2 className='my-4 text-2xl font-medium'>01. Información básica</h2>
			<div className='flex flex-col gap-4 tablet:flex-row'>
			
				<div className='flex flex-col'>
					 <PreviewImage file={values.avatar} change={(e)=>{
						setFieldValue('avatar',e.target.files[0])
					}}/>
					{ errorSignUpObject.avatar?.msg !== undefined ? (
						<div className='text-red-500 flex mt-2 w-full mobile:w-48'>
								<img src={warningImg} className='w-5' alt="warning" />
								<p className='ml-2'>{errorSignUpObject.avatar?.msg}</p>
							</div>
						) : null}
				</div>


				<div className='grow'>
					<div className='flex gap-3 flex-col tablet:flex-row'>
						<TextInput
							label='Nombre y Apellido'
							name='fullName'
							placeholder='Ingresar nombre completo'
							onChange={handleChange}
							onBlur={handleBlur}
							touched={touched.fullName}
							values={values.fullName}
							error={errors.fullName}
						/>

						<TextInput
							label='Mail'
							name='email'
							placeholder='Ingresar mail'
							onChange={handleChange}
							onBlur={handleBlur}
							values={values.email}
							touched={touched.email}
							error={errors.email}
							errorPost={errorSignUpObject.email?.msg}
						/>
					</div>
					<div className='flex gap-3 flex-col tablet:flex-row'>
						<TextInput
							label='Teléfono'
							name='phoneNumber'
							placeholder='Ingresar numero'
							onChange={handleChange}
							onBlur={handleBlur}
							touched={touched.phoneNumber}
							values={values.phoneNumber}
							error={errors.phoneNumber}
						/>
			
						<Select onChange={handleChange} error={errors.program} label='Programa' name='program' onBlur={handleBlur} touched={touched.program}>
							<option value="" selected="true" disabled="disabled">seleccione opcion</option>
							{
								programs.programs.map(program=>(
									<option value={program.value} className='bg-backgroundGray'>{program.name}</option>
								))
							}
						</Select>
					</div>
				</div>
			  </div>
            </section>
			<section className='mt-4'>
				<h2 className='text-2xl font-medium mb-5'>02. Datos personales</h2>
				<div>
					<div className='flex gap-4 flex-col'>
						<div className='flex gap-3 flex-col tablet:flex-row'>
							<TextInput
								label='Número de DNI'
								name='dni'
								placeholder='Ingresar dni'
								onChange={handleChange}
								onBlur={handleBlur}
								touched={touched.dni}
								values={values.dni}
								error={errors.dni}
								errorPost={errorSignUpObject.dni?.msg}
							/>
							<TextInput
								label='Ingresar edad'
								name='age'
								placeholder='Ingresar edad'
								onChange={handleChange}
								onBlur={handleBlur}
								touched={touched.age}
								values={values.age}
								error={errors.age}
							/>
						</div>
					</div>
					<div className='flex gap-3 flex-col tablet:flex-row'>
						<TextInput
							label='Colegio'
							name='school'
							placeholder='Ingresar colegio'
							onChange={handleChange}
							onBlur={handleBlur}
							touched={touched.school}
							values={values.school}
							error={errors.school}
						/>
						<TextInput
							label='Domicilio'
							name='address'
							placeholder='Ingresar domicilio'
							onChange={handleChange}
							onBlur={handleBlur}
							touched={touched.address}
							values={values.address}
							error={errors.address}
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
						onBlur={handleBlur}
						touched={touched.user}
						values={values.user}
						error={errors.user}
						errorPost={errorSignUpObject.user?.msg}
					/>
					<TextInput
						label='Contraseña'
						name='pass'
						placeholder='Ingresar contraseña'
						type='password'
						onChange={handleChange}
						onBlur={handleBlur}
						touched={touched.pass}
						values={values.pass}
						error={errors.pass}

					/>
					<TextInput
						label='Repetir Contraseña'
						name='confirmPass'
						placeholder='Repetir contraseña'
						type='password'
						onChange={handleChange}
						onBlur={handleBlur}
						touched={touched.confirmPass}
						values={values.confirmPass}
						error={errors.confirmPass}
					/>
				</div>
			</section>
			<Button type='submit' name='Ingresar orientado' disabled={!isValid}/>
          </form>
		 	
        </main>
      </div>
    </div>
  )
}

export default OrientedSignUpPage;