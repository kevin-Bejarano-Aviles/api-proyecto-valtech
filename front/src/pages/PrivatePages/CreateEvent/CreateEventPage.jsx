import axios from 'axios';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import NameInput from './components/NameInput';
import AdviserEventIdInput from './components/AdviserEventIdInput';
import StudentsIdInput from './components/StudentsIdInput/StudentsIdInput';
import DateInput from './components/DateInput/DateInput';
import TimeInput from './components/TimeInput/TimeInput';
import './CreateEventPage.css';

const MySelect = ({ label, ...props }) => {
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <select
        className='h-10 rounded-lg border-2 focus:outline-green'
      />
      {/* {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null} */}
    </div>
  );
};

const MyTextarea = ({ label, ...props }) => {
  return (
    <>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <textarea
        cols='60'
        rows='5'
        className='block rounded-lg border-2 focus:outline-green'
      />
      {/* {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null} */}
    </>
  );
};

function CreateEventPage() {
  const [studentObjectList, setStudentObjectList] = useState([]);
  const [adviserObjectList, setAdviserObjectList] = useState([]);
  const [areInputVisible, setAreInputVisible] = useState({
    adviser_event_id: false,
    studentsId: false,
    date: false,
    time: false,
    duration: false
  });
  const valuesForDurationInput = ['00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00'];
  const url = process.env.REACT_APP_API_URL;

  const getAllAdvisers = async () => {
    try {
      const response = await axios.get(`${url}/admin/advisers`, { withCredentials: true });
      setAdviserObjectList(response.data.advisers);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get(`${url}/admin/students`, { withCredentials: true });
      setStudentObjectList(response.data.students);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  useEffect(() => {
    getAllStudents();
    getAllAdvisers();
  },[]);

  const formik = useFormik({
    initialValues: {
      name: '',
      adviser_event_id: '',
      studentsId: '',
      date: '',
      time: '',
      duration: '',
      detail: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(200, 'Sólo se aceptan 200 caracteres o menos')
        .required('Requerido'),
      adviser_event_id: Yup.string().required('Requerido'),
      studentsId: Yup.array().of(Yup.string()).min(1, 'Requerido'),
      date: Yup.string().required('Requerido'),
      time: Yup.string().required('Requerido'),
      // duration: Yup.string().required('Requerido'),
      // detail: Yup.string().required('Requerido'),
    }),
    onSubmit: values => {
      console.log(values);
      console.log('Formulario enviado...');
    },
  });

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title='Orientados' />
        <main className='pb-12 mx-12'>
          <h1 className='mt-12 text-2xl'>Crear un evento</h1>
          <p className='text-lg'>Puedes crear un primer encuentro entre Orientadores y Orientados.</p>
          <form onSubmit={formik.handleSubmit}>
            <section className='mt-12 mb-8'>
              <h2 className='my-4 font-medium'>01. Información sobre el evento</h2>
              <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                <NameInput
                  label='Nombre del evento'
                  name='name'
                  formik={formik}
                  onChangeInputVisibility={() => setAreInputVisible({
                    adviser_event_id: false,
                    studentsId: false,
                    date: false,
                    time: false,
                    duration: false
                  })}
                />

                <AdviserEventIdInput
                  label='Orientador participante'
                  name='adviser_event_id'
                  adviserObjectList={adviserObjectList}
                  areInputVisible={areInputVisible}
                  formik={formik}
                  onChangeInputVisibility={() => setAreInputVisible({
                    adviser_event_id: true,
                    studentsId: false,
                    date: false,
                    time: false,
                    duration: false
                  })}
                />

                <StudentsIdInput
                  label='Orientado/s participante/s'
                  name='studentsId'
                  studentObjectList={studentObjectList}
                  areInputVisible={areInputVisible}
                  formik={formik}
                  onChangeInputVisibility={() => setAreInputVisible({
                    adviser_event_id: false,
                    studentsId: true,
                    date: false,
                    time: false,
                    duration: false
                  })}
                />
              </div>
            </section>
            <hr />
            <section className='mt-8 mb-8'>
              <h2 className='my-4 font-medium'>02. Días y Horarios disponibles</h2>
              <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                <DateInput
                  label='Fecha'
                  name='date'
                  areInputVisible={areInputVisible}
                  formik={formik}
                  onChangeInputVisibility={() => setAreInputVisible({
                    adviser_event_id: false,
                    studentsId: false,
                    date: true,
                    time: false,
                    duration: false
                  })}
                />

                <TimeInput
                  label='Horario'
                  name='time'
                  areInputVisible={areInputVisible}
                  formik={formik}
                  onChangeInputVisibility={() => setAreInputVisible({
                    adviser_event_id: false,
                    studentsId: false,
                    date: false,
                    time: true,
                    duration: false
                  })}
                />

                <MySelect label='Duración' name='duration'>
                  {valuesForDurationInput.map((value, index) => (
                    <option key={index + 1} value={value}>{value}</option>
                  ))}
                </MySelect>
              </div>
            </section>
            <hr />
            <section className='mt-8 mb-12'>
              <h2 className='my-4 font-medium'>03. Detalle</h2>
              <MyTextarea
                label='Comentarios del evento'
                name='detail'
                placeholder='Escribe un comentario'
              />
            </section>
            <button type='submit'>Enviar</button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateEventPage;