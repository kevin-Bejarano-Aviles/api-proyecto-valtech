import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import './styles/Calendar.css';
import './styles/CreateEventPage.css';
import iconSearch from '../../../assets/icons/privatePage/icon-search.svg';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <input
        className='mobile:w-full tablet:max-w-[320px] p-3 h-10 text-sm rounded-lg border-2 focus:outline-green'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <select
        className='h-10 rounded-lg border-2 focus:outline-green'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <input
        type='date'
        className='h-10 rounded-lg border-2 focus:outline-green'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTimeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <input
        type='time'
        className='h-10 rounded-lg border-2 focus:outline-green'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <textarea
        cols='60'
        rows='5'
        className='block rounded-lg border-2 focus:outline-green'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </>
  );
};

const MyAviserEventIdInput = (props) => {
  const [field, meta] = useField(props);
  const [selectedAdviser, setSelectedAdviser] = useState(null);

  const handleSelectedAdviser = event => {
    setSelectedAdviser(event.target.innerText);
  };

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{props.label}</label>
      <div className={`flex items-center h-10 rounded-lg cursor-pointer border-2`}>
        <div
          {...field}
          {...props}
          className={`mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate`}
          onClick={props.setIsInputVisibled}
        >
          <p className={`${selectedAdviser === null ? 'text-lightgray' : ''}`}>{selectedAdviser || 'Selecciona orientador'}</p>
        </div>
        <img src={iconSearch} alt='' className='px-2' />
      </div>
      <ul className={`absolute top-[72px] z-10 list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${props.isInputVisibled.adviser_event_id ? '' : 'hidden'}`}>
        {props.adviserObjectList.map(adviser => (
            <li
              key={adviser.id}
              value={adviser.id}
              className={`${adviser.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3 truncate cursor-pointer hover:font-bold hover:text-green`}
              onClick={(event) => handleSelectedAdviser(event)}
            >
              {adviser.fullName}
            </li>
        ))}
      </ul>
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

function CreateEventPage() {
  const [studentObjectList, setStudentObjectList] = useState([]);
  const [adviserObjectList, setAdviserObjectList] = useState([]);
  const [isInputVisibled, setIsInputVisibled] = useState({
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

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title='Orientados' />
        <main className='pb-12 mx-12'>
          <h1 className='mt-12 text-2xl'>Crear un evento</h1>
          <p className='text-lg'>Puedes crear un primer encuentro entre Orientadores y Orientados.</p>
          <Formik
            initialValues={{
              name: '',
              adviser_event_id: '',
              studentsId: '',
              date: '',
              time: '',
              duration: '',
              detail: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(200, 'Sólo se aceptan 200 caracteres o menos')
                .required('Requerido'),
              adviser_event_id: Yup.string().required('Requerido'),
              studentsId: Yup.array().required('Requerido'),
              date: Yup.string().required('Requerido'),
              time: Yup.string().required('Requerido'),
              duration: Yup.string().required('Requerido'),
              detail: Yup.string().required('Requerido'),
            })}
            onSubmit={(valores) => {
              console.log(valores);
              console.log('Formulario enviado...');
            }}
          >
            <Form>
              <section className='mt-12 mb-8'>
                <h2 className='my-4 font-medium'>01. Información sobre el evento</h2>
                <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                  <MyTextInput
                    label='Nombre del evento'
                    name='name'
                    placeholder='Ingresar nombre'
                  />

                  <MyAviserEventIdInput
                    label = 'Orientador participante'
                    name='adviser_event_id'
                    isInputVisibled={isInputVisibled}
                    setIsInputVisibled={() => setIsInputVisibled({
                      adviser_event_id: true,
                      studentsId: false,
                      date: false,
                      time: false,
                      duration: false
                    })}
                    adviserObjectList={adviserObjectList}
                  />

                  {/* <MySelect label='Orientador participante' name='adviser_event_id'>
                    {adviserObjectList.map(adviser => (
                      <option key={adviser.id} value={adviser.id}>{adviser.fullName}</option>
                    ))}
                  </MySelect> */}

                  <MySelect label='Orientado/s participante/s' name='studentsId' multiple>
                    {studentObjectList.map(student => (
                      <option key={student.id} value={student.id}>{student.fullName}</option>
                    ))}
                  </MySelect>
                </div>
              </section>
              <hr />
              <section className='mt-8 mb-8'>
                <h2 className='my-4 font-medium'>02. Días y Horarios disponibles</h2>
                <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                  <MyDateInput
                    label='Fecha'
                    name='date'
                    placeholder='Ingresar fecha'
                  />

                  <MyTimeInput
                    label='Horario'
                    name='time'
                    placeholder='Seleccionar horario'
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
            </Form>
          </Formik>
        </main>
      </div>
    </div>
  )
}

export default CreateEventPage;