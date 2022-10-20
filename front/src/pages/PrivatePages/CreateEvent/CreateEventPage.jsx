import axios from 'axios';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import NameInput from './components/NameInput';
import AdviserEventIdInput from './components/AdviserEventIdInput';
import StudentsIdInput from './components/StudentsIdInput/StudentsIdInput';
import DateInput from './components/DateInput/DateInput';
import TimeInput from './components/TimeInput/TimeInput';
import DurationInput from './components/DurationInput';
import DetailInput from './components/DetailInput';
import Button from '../sharedPrivateComponents/button/Button';
import './CreateEventPage.css';
import useGet from '../hooks/useGet';
import usePost from '../hooks/usePost';

function CreateEventPage() {
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {getAllAdvisers,getAllStudentsList,listStudent,adviserList}=useGet();
  const {postEvent}=usePost();
  const [studentObjectList, setStudentObjectList] = useState([]);
  const [adviserObjectList, setAdviserObjectList] = useState([]);
  const [areInputVisible, setAreInputVisible] = useState({
    adviser_event_id: false,
    studentsId: false,
    date: false,
    time: false,
    duration: false
  });


  useEffect(() => {
    getAllStudentsList();
    getAllAdvisers();
  },[]);

//   const postEvent = async (values) => {
//     try {
//       let options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json; charset=utf-8'
//         ,'x-token':`Bearer ${token}`},
//         data: values,
//       };
//       const response = await axios(`${url}/admin/events`, options);
//       navigate('/eventos');
//     } catch (err) {
//       console.error(`${err.response.status}: ${err.response.statusText}`);
//     }
//   };

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
      duration: Yup.string().required('Requerido'),
      detail: Yup.string().required('Requerido'),
    }),
    onSubmit: values => {
      postEvent(values);
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
                  adviserObjectList={adviserList}
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
                  studentObjectList={listStudent}
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

                <DurationInput
                  label='Duración'
                  name='duration'
                  areInputVisible={areInputVisible}
                  formik={formik}
                  onChangeInputVisibility={() => setAreInputVisible({
                    adviser_event_id: false,
                    studentsId: false,
                    date: false,
                    time: false,
                    duration: true
                  })}
                />
              </div>
            </section>
            <hr />
            <section className='mt-8 mb-12'>
              <h2 className='my-4 font-medium'>03. Detalle</h2>
              <DetailInput
                label='Comentarios del evento'
                name='detail'
                areInputVisible={areInputVisible}
                formik={formik}
                onChangeInputVisibility={() => setAreInputVisible({
                  adviser_event_id: false,
                  studentsId: false,
                  date: false,
                  time: false,
                  duration: false
                })}
              />
            </section>
            <Button
              type='submit'
              name='Agendar evento'
              disabled={Object.values(formik.values).some(value => value === '')}
            />
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateEventPage;

