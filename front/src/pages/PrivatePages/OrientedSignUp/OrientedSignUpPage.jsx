import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Formik, Form, Field,ErrorMessage  } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Button from '../sharedPrivateComponents/button/Button';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import iconError from '../../../assets/icons/icon_warning.svg';
// import iconArrow from '../../../assets/icons/privatePage';
import iconPlus from '../../../assets/icons/icon-plus.svg';
import addAvatar from '../../../assets/icons/privatePage/add-avatar.svg';


function OrientedSignUpPage() {
  const url=process.env.REACT_APP_API_URL
  const navigate = useNavigate();

  

  const validationSchemaForm=Yup.object({
    fullName:Yup.string('Campo inválido')
    .min(2,'Entre 2 y 500 caracteres')
    .max(500,'')
    .required('Campo requerido'),
    email:Yup.string('Campo inválido').email('Email inválido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres').required('Campo requerido'),
    phoneNumber:Yup.number('Ingresar solo numeros').min(10,'Entre 10 y 50 dígitos').max(50,'Entre 10 y 50 dígitos'),
    program:Yup.string.required('Selecciona una opción'),
    dni:Yup.number().required('Campo requerido').min(7,'Entre 7 y 50 dígitos').max(50,'Entre 7 y 50 dígitos'),
    age:Yup.number('Ingresar solo numeros').required('Campo requerido').min(18,'Mínimo valor: 18').max(99,'Máximo valor: 99'),
    school:Yup.string('Campo inválido').required('Campo requerido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres'),
    address:Yup.string('Campo inválido').required('Campo requerido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres'),
    motive:Yup.string('Campo inválido').required('Campo requerido').min(3,'Entre 3 y 500 caracteres').max(500,'Entre 3 y 500 caracteres'),
    user:Yup.string().required('Campo requerido').min(7,'Entre 7 y 50 dígitos').max(50,'Entre 7 y 50 dígitos'),
    pass:Yup.string.required('Campo requerido').min(8,'Mínimo 8 caracteres').oneOf([Yup.ref('confirmPass')],'Las contraseñas no coinciden'),
    confirmPass:Yup.string.min(8,'Mínimo 8 caracteres').oneOf([Yup.ref('pass')],'Las contraseñas no coinciden').required('Campo requerido'),
  })



  
  // Function to 'Ingresar orietado' button.
  const onSubmit = async (data, e) => {
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
      const response = await axios(`${url}/admin/addStudent`, options);
      localStorage.setItem('registrado',true)
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  // Function to bring all students.
  const getAllStudents = async () => {
    try {
      const response = await axios.get(`${url}/admin/addStudents`, { withCredentials: true });
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
          <Formik
            initialValues={{
              fullName:'',
              email:'',
              phoneNumber:'',
              program:'',
              dni:'',
              age:'',
              school:'',
              address:'',
              motive:'',
              user:'',
              pass:'',
              confirmPass:''
            }}
            validationSchema={validationSchemaForm}
            onSubmit={(data)=>{
              onSubmit(data)
            }}
          >
          <Form action="">
            
          </Form>
          </Formik>
        </main>
      </div>
    </div>
  )
}

export default OrientedSignUpPage;