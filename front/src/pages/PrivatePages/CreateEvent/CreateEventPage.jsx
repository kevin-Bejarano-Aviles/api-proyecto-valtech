import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import './styles/Calendar.css';
import './styles/CreateEventPage.css';

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
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <select
        className='list-none w-full h-10 overflow-x-auto rounded-lg border-2 focus:outline-green'
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
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={props.name} className='text-sm'>{label}</label>
      <select
        type='date'
        className='list-none w-full h-10 overflow-x-auto rounded-lg border-2 focus:outline-green'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

function CreateEventPage() {
  const [studentObjectList, setStudentObjectList] = useState([]);
  const [adviserObjectList, setAdviserObjectList] = useState([]);
  const url = process.env.REACT_APP_API_URL;

  const getAllAdvisersFromAPI = async () => {
    try {
      const response = await axios.get(`${url}/admin/advisers`, { withCredentials: true });
      setAdviserObjectList(response.data.advisers);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  const getAllStudentsFromAPI = async () => {
    try {
      const response = await axios.get(`${url}/admin/students`, { withCredentials: true });
      setStudentObjectList(response.data.students);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  useEffect(() => {
    getAllStudentsFromAPI();
    getAllAdvisersFromAPI();
  },[]);

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='pb-12 mx-12'>
          <h1 className='mt-12 text-2xl'>Crear un evento</h1>
          <p className='text-lg'>Puedes crear un primer encuentro entre Orientadores y Orientados.</p>
          <Formik
            initialValues={{
              name: '',
              adviser_event_id: '',
              students: ''
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(200, 'Sólo se aceptan 200 caracteres o menos')
                .required('Requerido'),
              adviser_event_id: Yup.string().required('Requerido'),
              students: Yup.array().required('Requerido'),
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

                  <MySelect label='Orientador participante' name='adviser_event_id'>
                    {adviserObjectList.map(adviser => (
                      <option key={adviser.id} value={adviser.id}>{adviser.fullName}</option>
                    ))}
                  </MySelect>

                  <MySelect label='Orientado/s participante/s' name='students' multiple>
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
                  <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                    <label htmlFor='date' className='text-sm'>Fecha</label>
                    <div
                      className={`mobile:w-full tablet:max-w-[320px] flex justify-between items-center pl-3 pr-2 h-10 text-sm rounded-lg border-2 cursor-pointer ${formError.date ? 'border-red-500' : ''} ${dateStyle ? 'text-black bg-inputbackground' : 'text-lightgray'} ${isDateVisibled ? 'border-green' : ''}`}
                    >
                      <div {...register('date')} id='date' className='select-none'>Ingresar fecha</div>
                      <img src={iconCalendar} alt='' className='px-2 w-[32px]' />
                    </div>
                    <Calendar calendarType='US' locale='rm-sursilv' onChange={onChange} value={date} className={isDateVisibled ? 'block' : 'hidden'} />
                    <span className='flex gap-1 text-red-500'>
                      {formError.date ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.date ? formError.date.msg : ''}
                    </span>
                  </div>
                  <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                    <label htmlFor='time' className='relative -z-10 text-sm'>Horario</label>
                    <div
                      className={`mobile:w-full tablet:max-w-[320px] flex justify-between items-center pl-3 pr-2 h-10 text-sm rounded-lg border-2 cursor-pointer ${formError.time ? 'border-red-500' : ''} ${timeStyle ? 'text-black bg-inputbackground' : 'text-lightgray'} ${isTimeVisibled ? 'border-green' : ''}`}
                      onClick={e => {
                        setIsTimeVisibled(!isTimeVisibled);
                        setIsStudentVisibled(false);
                        setIsAdviserVisibled(false);
                        setIsDurationVisibled(false);
                        setIsDateVisibled(false);
                      }}
                    >
                      <div {...register('time')} id='time' className='select-none truncate'>Seleccionar horario</div>
                      <img src={iconArrow} alt='' className='px-2 w-[32px]' />
                    </div>
                    <div className={`absolute top-[72px] z-10 flex list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${isTimeVisibled ? '' : 'hidden'}`}>
                      <ul className='overflow-auto basis-1/2' id='hour'>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>00</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>01</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>02</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>03</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>04</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>05</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>06</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>07</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>08</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>09</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>10</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>11</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>12</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>13</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>14</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>15</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>16</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>17</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>18</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>19</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>20</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>21</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>22</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>23</li>
                      </ul>
                      <ul className='overflow-auto basis-1/2' id='minute'>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>00</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>01</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>02</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>03</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>04</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>05</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>06</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>07</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>08</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>09</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>10</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>11</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>12</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>13</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>14</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>15</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>16</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>17</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>18</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>19</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>20</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>21</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>22</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>23</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>24</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>25</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>26</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>27</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>28</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>29</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>30</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>31</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>32</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>33</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>34</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>35</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>36</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>37</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>38</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>39</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>40</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>41</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>42</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>43</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>44</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>45</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>46</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>47</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>48</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>49</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>50</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>51</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>52</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>53</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>54</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>55</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>56</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>57</li>
                        <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>58</li>
                        <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>59</li>
                      </ul>
                    </div>
                    <span className='flex gap-1 text-red-500'>
                      {formError.time ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.time ? formError.time.msg : ''}
                    </span>
                  </div>
                  <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                    <label htmlFor='duration' className='relative -z-10 text-sm'>Duración</label>
                    <div
                      className={`mobile:w-full tablet:max-w-[320px] flex justify-between items-center pl-3 pr-2 h-10 text-sm rounded-lg border-2 cursor-pointer ${formError.duration ? 'border-red-500' : ''} ${durationStyle ? 'text-black bg-inputbackground' : 'text-lightgray'} ${isDurationVisibled ? 'border-green' : ''}`}
                      onClick={() => {
                        setIsDurationVisibled(!isDurationVisibled);
                        setIsStudentVisibled(false);
                        setIsAdviserVisibled(false);
                        setIsTimeVisibled(false);
                        setIsDateVisibled(false);
                      }}
                    >
                      <div {...duration} id='duration' className='select-none truncate'>Seleccionar duración</div>
                      <img src={iconArrow} alt='' className='px-2 w-[32px]' />
                    </div>
                    <div className={`absolute top-[72px] flex list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${isDurationVisibled ? '' : 'hidden'}`}>
                      <ul className='overflow-auto basis-full'>
                        <li
                          className={`${styleItem} bg-white`}
                          value='15'
                          onClick={e => handleSelectedDuration(e)}>
                            00:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='30'
                          onClick={e => handleSelectedDuration(e)}>
                            00:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='45'
                          onClick={e => handleSelectedDuration(e)}>
                            00:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='60'
                          onClick={e => handleSelectedDuration(e)}>
                            01:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='75'
                          onClick={e => handleSelectedDuration(e)}>
                            01:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='90'
                          onClick={e => handleSelectedDuration(e)}>
                            01:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='105'
                          onClick={e => handleSelectedDuration(e)}>
                            01:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='120'
                          onClick={e => handleSelectedDuration(e)}>
                            02:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='135'
                          onClick={e => handleSelectedDuration(e)}>
                            02:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='150'
                          onClick={e => handleSelectedDuration(e)}>
                            02:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='165'
                          onClick={e => handleSelectedDuration(e)}>
                            02:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='180'
                          onClick={e => handleSelectedDuration(e)}>
                            03:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='195'
                          onClick={e => handleSelectedDuration(e)}>
                            03:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='210'
                          onClick={e => handleSelectedDuration(e)}>
                            03:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='225'
                          onClick={e => handleSelectedDuration(e)}>
                            03:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='240'
                          onClick={e => handleSelectedDuration(e)}>
                            04:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='255'
                          onClick={e => handleSelectedDuration(e)}>
                            04:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='270'
                          onClick={e => handleSelectedDuration(e)}>
                            04:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='285'
                          onClick={e => handleSelectedDuration(e)}>
                            04:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='300'
                          onClick={e => handleSelectedDuration(e)}>
                            05:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='315'
                          onClick={e => handleSelectedDuration(e)}>
                            05:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='330'
                          onClick={e => handleSelectedDuration(e)}>
                            05:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='345'
                          onClick={e => handleSelectedDuration(e)}>
                            05:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='360'
                          onClick={e => handleSelectedDuration(e)}>
                            06:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='375'
                          onClick={e => handleSelectedDuration(e)}>
                            06:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='390'
                          onClick={e => handleSelectedDuration(e)}>
                            06:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='405'
                          onClick={e => handleSelectedDuration(e)}>
                            06:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='420'
                          onClick={e => handleSelectedDuration(e)}>
                            07:00 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='435'
                          onClick={e => handleSelectedDuration(e)}>
                            07:15 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='450'
                          onClick={e => handleSelectedDuration(e)}>
                            07:30 hs
                        </li>
                        <li
                          className={`${styleItem} bg-white`}
                          value='465'
                          onClick={e => handleSelectedDuration(e)}>
                            07:45 hs
                        </li>
                        <li
                          className={`${styleItem} bg-bgStudents`}
                          value='480'
                          onClick={e => handleSelectedDuration(e)}>
                            08:00 hs
                        </li>
                      </ul>
                    </div>
                    <span className='flex gap-1 text-red-500'>
                      {formError.duration ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                      {formError.duration ? formError.duration.msg : ''}
                    </span>
                  </div>
                </div>
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