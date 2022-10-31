import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const getValidationSchema = () => Yup.object().shape({
    fullName: Yup.string('Campo inválido')
      .min(2,'Entre 2 y 500 caracteres')
      .max(500,'')
      .required('Campo requerido'),
    email: Yup.string('Campo inválido')
      .email('Email inválido')
      .min(3,'Entre 3 y 500 caracteres')
      .max(500,'Entre 3 y 500 caracteres')
      .required('Campo requerido'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]\d{9,50}$/, 'Sólo números entre 10 y 50 dígitos').required('Campo requerido'),
    program: Yup.string().required('Selecciona una opción'),
    dni: Yup.string()
      .matches(/^[0-9]\d{7,50}$/, 'Sólo números entre 8 y 50 dígitos')
      .oneOf([Yup.ref('user')],'Los dni no coinciden').required('Campo requerido'),
    age: Yup.number('Ingresar solo numeros')
      .required('Campo requerido')
      .min(18,'Edad Mínima: 18')
      .max(99,'Edad Máxima: 99'),
    school: Yup.string('Campo inválido')
      .required('Campo requerido')
      .min(3,'Entre 3 y 500 caracteres')
      .max(500,'Entre 3 y 500 caracteres'),
    address: Yup.string('Campo inválido')
      .required('Campo requerido')
      .min(3,'Entre 3 y 500 caracteres')
      .max(500,'Entre 3 y 500 caracteres'),
    motive: Yup.string('Campo inválido')
      .required('Campo requerido')
      .min(3,'Entre 3 y 500 caracteres')
      .max(500,'Entre 3 y 500 caracteres'),
    user: Yup.string()
      .matches(/^[0-9]\d{7,50}$/, 'Sólo números entre 8 y 50 dígitos')
      .oneOf([Yup.ref('dni')],'Los dni no coinciden').required('Campo requerido'),
    pass: Yup.string()
      .required('Campo requerido')
      .min(8,'Mínimo 8 caracteres')
      .oneOf([Yup.ref('confirmPass')],'Las contraseñas no coinciden'),
    confirmPass: Yup.string()
      .min(8,'Mínimo 8 caracteres')
      .oneOf([Yup.ref('pass')],'Las contraseñas no coinciden')
      .required('Campo requerido'),
    avatar: Yup.mixed().required('Es requerido'),
  });