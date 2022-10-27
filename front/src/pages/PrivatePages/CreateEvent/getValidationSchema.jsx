import * as Yup from 'yup';

export const getValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .max(200, 'Sólo se aceptan 200 caracteres o menos')
      .required('Requerido'),
    adviser_event_id: Yup.string().required('Requerido'),
    studentsId: Yup.array().of(Yup.string()).min(1, 'Requerido'),
    date: Yup.string().required('Requerido'),
    time: Yup.string().required('Requerido'),
    duration: Yup.string().required('Requerido'),
    detail: Yup.string().required('Requerido'),
  });
};
