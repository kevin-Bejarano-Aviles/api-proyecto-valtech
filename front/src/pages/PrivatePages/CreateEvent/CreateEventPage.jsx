import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getValidationSchema } from './getValidationSchema';
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
  const { getAllAdvisers, getAllStudents, studentList, adviserList } = useGet();
  const { postEvent, errorCreateEventObject } = usePost();
  const initialValues = {
    adviser_event_id: false,
    studentsId: false,
    date: false,
    time: false,
    duration: false
  };
  const [areInputVisible, setAreInputVisible] = useState(initialValues);

  useEffect(() => {
    getAllStudents();
    getAllAdvisers();
  },[]);

  const handleAreInputVisible = newState => {
    setAreInputVisible(newState);
  };

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
    validationSchema: getValidationSchema(),
    onSubmit: values => {
      postEvent(values);
    }
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
                  errorCreateEventObject={errorCreateEventObject}
                  initialValues={initialValues}
                  handleAreInputVisible={handleAreInputVisible}
                />

                <AdviserEventIdInput
                  label='Orientador participante'
                  name='adviser_event_id'
                  adviserObjectList={adviserList}
                  areInputVisible={areInputVisible}
                  formik={formik}
                  errorCreateEventObject={errorCreateEventObject}
                  initialValues={initialValues}
                  handleAreInputVisible={handleAreInputVisible}
                />

                <StudentsIdInput
                  label='Orientado/s participante/s'
                  name='studentsId'
                  studentObjectList={studentList}
                  areInputVisible={areInputVisible}
                  formik={formik}
                  errorCreateEventObject={errorCreateEventObject}
                  initialValues={initialValues}
                  handleAreInputVisible={handleAreInputVisible}
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
                  errorCreateEventObject={errorCreateEventObject}
                  initialValues={initialValues}
                  handleAreInputVisible={handleAreInputVisible}
                />

                <TimeInput
                  label='Horario'
                  name='time'
                  areInputVisible={areInputVisible}
                  formik={formik}
                  initialValues={initialValues}
                  errorCreateEventObject={errorCreateEventObject}
                  handleAreInputVisible={handleAreInputVisible}
                />

                <DurationInput
                  label='Duración'
                  name='duration'
                  areInputVisible={areInputVisible}
                  formik={formik}
                  errorCreateEventObject={errorCreateEventObject}
                  initialValues={initialValues}
                  handleAreInputVisible={handleAreInputVisible}
                />
              </div>
            </section>
            <hr />
            <section className='mt-8 mb-12'>
              <h2 className='my-4 font-medium'>03. Detalle</h2>
              <DetailInput
                label='Comentarios del evento'
                name='detail'
                formik={formik}
                errorCreateEventObject={errorCreateEventObject}
                initialValues={initialValues}
                handleAreInputVisible={handleAreInputVisible}
              />
            </section>
            <Button
              type='submit'
              name='Agendar evento'
              disabled={!formik.isValid}
            />
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateEventPage;

