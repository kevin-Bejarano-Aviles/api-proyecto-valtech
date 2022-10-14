import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';
import axios from 'axios'

import Button from '../../PrivatePages/sharedPrivateComponents/button/Button';

import warningImg from '../../../assets/icons/icon_warning.svg'
import ilustration from '../../../assets/ilustration/login/ilustration.svg';
import title from '../../../assets/logo/vnegro.svg'
import Context from '../../../context/Context';

function LoginPage() {

  const [errorMessage,setErrorrMessage]=useState('')

  const url=process.env.REACT_APP_API_URL
  const baseUrl =`${url}/admin/auth/login`
  const navigate = useNavigate();
  const {logIn} = useContext(Context);
  const login = ()=>{
    logIn()
    navigate('/login',{replace:true})
  }

  const DisplayingErrorMessagesSchema=Yup.object({
      email:Yup.string().email('Debe ser un email valido').required('El campo email no debe estar vacio'),
      pass:Yup.string().required('El campo contraseña no debe estar vacio'),
    })


  useEffect(() => {
    if(errorMessage){
      const timer=setTimeout(()=>{
        setErrorrMessage('')
      },8000);
      return ()=> clearTimeout(timer)
    }
  },[errorMessage]);

  const deskTopviewIlustration='laptop:static laptop:bg-graybackground laptop:h-screen laptop:w-3/5 laptop:flex laptop:flex-col laptop:justify-center'
  const deskTopviewForm='laptop:drop-shadow-none laptop:backdrop-blur-none laptop:bg-transparent laptop:flex laptop:flex-col laptop:justify-center laptop:items-start laptop:h-screen laptop:w-4/5 laptop:ml-20'

  const tabletviewIlustration='tablet:static  tablet:bg-graybackground tablet:h-screen tablet:w-3/5 tablet:flex tablet:flex-col tablet:justify-center '
  const tabletviewsForm='tablet:drop-shadow-none tablet:backdrop-blur-none tablet:bg-transparent tablet:flex tablet:flex-col tablet:justify-center laptop:items-start tablet:h-screen tablet:w-4/5 tablet:ml-14 '

  const inputDesktopView='bg-graybackground h-10  mt-2  pl-3 rounded-lg   focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 desktop:w-96 tablet:w-96 '

  const inputMobileView='w-72'

  return (
    <div className={`flex flex-col tablet:flex-row`}>
      
      <div className={`fixed z-0 left-0 right-0 top-24 bottom-0 ${deskTopviewIlustration} ${tabletviewIlustration}`}>
        <img className='w-32 laptop:w-48 ' src={title} alt='v-camp'/>
        <img className='w-full tablet:w-full laptop:w-full' src={ilustration} alt='ilustracion'/>
      </div>

      <Formik
        initialValues={{
          email:'',
          pass:'',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (data)=>{
          await axios.post(baseUrl,{
                email:data.email,
                pass:data.pass,
              },{withCredentials:true})
              .then(response=>{
                login();
                localStorage.setItem('admin', JSON.stringify(response.data.adminLog));
              })
              .catch(error => {
                setErrorrMessage(error.response.data.message)
              })
        }}
        >
          {(errors) =>(
      <Form className={`flex flex-col items-center h-screen justify-center	z-0 bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg ${deskTopviewForm} ${tabletviewsForm}`} >
        <h2 className='text-3xl	font-bold mb-8 text-zinc-600'>Ingresá a tu portal</h2>
        <label className='flex flex-col mt-2 mb-5'>
          <p className='font-bold desktop:font-normal tablet:font-normal text-zinc-600 text-lg'>Email</p>
          <Field name='email' className={`${'border-slate-300'} ${inputDesktopView} ${inputMobileView}`} type='text' placeholder='ingresa email'/>
        </label>

       <ErrorMessage name='email'>
        {
          msg =>
            <div className='flex text-red-500'>
            <img className='mr-2' src={warningImg} alt=''/>
            <p className='font-bold desktop:font-normal tablet:font-normal'>{msg}</p>
          </div>
        }
       </ErrorMessage>
       <label className='flex flex-col mt-2 mb-5'>
        <p className='font-bold desktop:font-normal tablet:font-normal text-zinc-600 text-lg'>Contraseña</p>
        <Field name='pass' className={`border-slate-300 ${inputDesktopView} ${inputMobileView}`} type='password' placeholder='ingresa contraseña'/>
      </label>

      <ErrorMessage name='pass'>
        {
          msg =>
            <div className='flex text-red-500'>
            <img className='mr-2' src={warningImg} alt=''/>
            <p className='font-bold desktop:font-normal tablet:font-normal'>{msg}</p>
          </div>
        }
       </ErrorMessage>


        {
            errorMessage &&
            <div className={`flex text-red-500`}>
            <img className='mr-2' src={warningImg} alt=''/>
            <p className='font-bold tablet:font-normal'>{errorMessage}</p>
        </div>
        }
        

          <div className='mt-5'>
            <Button type='submit' name='log in' disabled={errors.isValid ? false : true}/>        
          </div>
        </Form>
      )}
      </Formik>
    
    </div>
  )
}

export default LoginPage;
