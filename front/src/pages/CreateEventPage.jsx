import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import iconError from '../img/icon_warning.svg';
import iconArrow from '../img/list-control.svg';
import iconSearch from '../img/icon-search.svg';
import iconCalendar from '../img/icon-calendar.svg';
import Calendar from 'react-calendar';
import '../Calendar.css';

function CreateEventPage() {
  // hooks for validations
  const [formError, setFormError] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  // hooks for APIs
  const [students, setStudents] = useState([]);
  const [advisers, setAdvisers] = useState([]);
  // hooks to send data
  const [selectedAdviser, setSelectedAdviser] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTime, setSelectedTime] = useState(['00', '00']);
  const [selectedDuration, setSelectedDuration] = useState('0');
  // hooks to show or hide elements
  const [isStudentVisibled, setIsStudentVisibled] = useState(false);
  const [isAdviserVisibled, setIsAdviserVisibled] = useState(false);
  const [isTimeVisibled, setIsTimeVisibled] = useState(false);
  const [isDurationVisibled, setIsDurationVisibled] = useState(false);
  const [isDateVisibled, setIsDateVisibled] = useState(false);
  // hooks for styles
  const [studentsStyle, setStudentsStyle] = useState(false);
  const [adviserStyle, setAdviserStyle] = useState(false);
  const [nameStyle, setNameStyle] = useState(false);
  const [timeStyle, setTimeStyle] = useState(false);
  const [durationStyle, setDurationStyle] = useState(false);
  const [detailStyle, setDetailStyle] = useState(false);
  const [dateStyle, setDateStyle] = useState(false);
  // hook for Calendar component
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    const selectedDay = ("0" + date.getDate()).slice(-2);
    const selectedMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    const selectedYear = date.getFullYear();
    setDate(date);
    setValue('date', `${selectedYear}-${selectedMonth}-${selectedDay}`);
    const dateElement = document.getElementById('date');
    dateElement.innerText = `${selectedDay}/${selectedMonth}/${selectedYear}`;
    setDateStyle(true);
  };
  // complementary hook
  let [cont, setCont] = useState(0);
  // styles for time input
  const styleItem = 'h-10 flex items-center pl-3 truncate cursor-pointer hover:font-bold hover:text-green';
  // useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents();
    getAllAdvisers();
  },[]);

  useEffect(() => {
    console.log(formError);
  },[formError]);

  useEffect(() => {
    let selectedNames = [];

    for (let element of selectedStudents) {
      selectedNames = [...selectedNames, students.filter(student => student.id === element.id)[0].fullName];
    }

    const element = document.getElementById('students');

    if (selectedNames.length === 0) {
      element.innerText = 'Seleccionar orientados';
      setStudentsStyle(false);
    } else {
      element.innerText = selectedNames.join(', ');
      setStudentsStyle(true);
    }
  },[selectedStudents]);

  useEffect(() => {
    if (cont === 0) {
      document.getElementById('time').innerText = 'Seleccionar horario'
    } else {
      document.getElementById('time').innerText = `${selectedTime.join(':')} hs`;
    }
    setCont(cont+1);
  },[selectedTime]);

  const { register, handleSubmit, watch, setValue } = useForm();
  const name = register('name');
  const duration = register('duration');
  const detail = register('detail');

  useEffect(() => {
    if (
      watch().name === '' ||
      typeof watch().adviser_event_id === 'undefined' ||
      (typeof watch().students === 'undefined' || watch().students.length === 0) ||
      watch().date === '' ||
      typeof watch().time === 'undefined' ||
      typeof watch().duration === 'undefined' ||
      watch().detail === ''
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    console.log(watch());
  },[watch()]);

  // Function to 'Ingresar orietado' button.
  const onSubmit = async (data, e) => {
    e.preventDefault();
    data.time = selectedTime.join(':');
    postEvent(data, e);
  };

  // Function to send a new student.
  const postEvent = async (data, e) => {
    try {
      let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true,
          data: {...data}
      };
      console.log(options.data);
      const response = await axios('http://localhost:8000/admin/addEvent', options);
      // console.log(response.data);
      // setFormError(response.data);
      navigate('/eventos');
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
      console.log(err);
      // setFormError(err.response.data);
    }
  };

  // Function to bring all students.
  const getAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students', { withCredentials: true });
      setStudents(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  // Function to bring all advisers.
  const getAllAdvisers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/advisers', { withCredentials: true });
      setAdvisers(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  const editSelectedStudents = e => {
    if (e.target.checked) {
      setSelectedStudents([...selectedStudents, {id: parseInt(e.target.id)}]);
      setValue('students', [...selectedStudents, {id: parseInt(e.target.id)}]);
    } else {
      setSelectedStudents(selectedStudents.filter(student => student.id !== parseInt(e.target.id)));
      setValue('students', selectedStudents.filter(student => student.id !== parseInt(e.target.id)));
    }
  };

  const handleSelectedAdviser = e => {
    setValue('adviser_event_id', e.target.value);
    setSelectedAdviser(e.target.value);
    document.getElementById('adviser').innerText = e.target.innerText;
    setIsAdviserVisibled(false);
    setAdviserStyle(true);
  };

  const handleSelectedTime = e => {
    if (e.target.parentElement.id === 'hour') {
      setSelectedTime([e.target.innerText, selectedTime[1]]);
      setValue('time', [e.target.innerText, selectedTime[1]]);
    } else {
      setSelectedTime([selectedTime[0], e.target.innerText]);
      setValue('time', [selectedTime[0], e.target.innerText])
    }
    setTimeStyle(true);
  };

  const handleSelectedDuration = e => {
    setValue('duration', e.target.value);
    document.getElementById('duration').innerText = e.target.innerText;
    setDurationStyle(true);
    setIsDurationVisibled(false);
    setSelectedDuration(e.target.value);
  };

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='pb-12 mx-12'>
          <h1 className='mt-12 text-2xl'>Crear un evento</h1>
          <p className='text-lg'>Puedes crear un primer encuentro entre Orientadores y Orientados.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className='mt-12 mb-8'> {/* Event information */}
              <h2 className='my-4 font-medium'>01. Información sobre el evento</h2>
              <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='event-name' className='text-sm'>Nombre del evento</label>
                  <input
                    className={`mobile:w-full tablet:max-w-[320px] p-3 h-10 text-sm rounded-lg border-2 focus:outline-green ${formError.name ? 'border-red-500' : ''} ${nameStyle ? 'bg-inputbackground' : ''}`}
                    type='text'
                    id='event-name'
                    placeholder='Ingresar nombre'
                    {...name}
                    onChange={e => {
                      name.onChange(e);
                      if (e.target.value) {
                        setNameStyle(true);
                      } else {
                        setNameStyle(false);
                      }
                    }}
                    onFocus={e => {
                      setIsAdviserVisibled(false);
                      setIsStudentVisibled(false);
                      setIsTimeVisibled(false);
                      setIsDurationVisibled(false);
                      setIsDateVisibled(false);
                    }}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {formError.name ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.name ? formError.name.msg : ''}
                  </span>
                </div>
                <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='adviser' className='text-sm'>Orientador participante</label>
                  <div className={`flex items-center h-10 rounded-lg cursor-pointer border-2 ${isAdviserVisibled ? 'border-green' : ''} ${adviserStyle ? 'text-black bg-inputbackground' : 'text-lightgray'}`}>
                    <div
                      {...register('adviser_event_id')}
                      id='adviser'
                      className={`mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate ${formError.adviser_event_id ? 'border-red-500' : ''}`}
                      onClick={e => {
                        setIsAdviserVisibled(!isAdviserVisibled);
                        setIsStudentVisibled(false);
                        setIsTimeVisibled(false);
                        setIsDurationVisibled(false);
                        setIsDateVisibled(false);
                      }}
                    >
                      Seleccionar orientador
                    </div>
                    <img src={iconSearch} alt='' className='px-2' />
                  </div>
                  <ul className={`absolute top-[72px] z-10 list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${isAdviserVisibled ? '' : 'hidden'}`}>
                    {advisers.map(adviser => (
                        <li
                          key={adviser.id}
                          value={adviser.id}
                          className={`${adviser.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3 truncate cursor-pointer hover:font-bold hover:text-green`}
                          onClick={e => handleSelectedAdviser(e)}
                        >
                          {adviser.fullName}
                        </li>
                    ))}
                  </ul>
                  <span className='flex gap-1 text-red-500'>
                    {formError.adviser_event_id ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.adviser_event_id ? formError.adviser_event_id.msg : ''}
                  </span>
                </div>
                <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='students' className='text-sm'>Orientado/s participante/s</label>
                  <div
                    className={`${formError.students ? 'border-red-500' : ''} ${isStudentVisibled ? 'border-green' : ''} ${studentsStyle ? 'bg-inputbackground' : ''} flex items-center h-10 border-2 rounded-lg overflow-hidden cursor-pointer`}
                  >
                    <div
                      {...register('students')}
                      className={`mobile:w-full tablet:max-w-[320px] pl-2 text-sm truncate select-none ${studentsStyle ? 'text-black' : 'text-lightgray'}`}
                      id='students'
                      onClick={() => {
                        setIsStudentVisibled(!isStudentVisibled);
                        setIsAdviserVisibled(false);
                        setIsTimeVisibled(false);
                        setIsDurationVisibled(false);
                        setIsDateVisibled(false);
                      }}
                    >
                      Seleccionar orientados
                    </div>
                    <img src={iconSearch} alt='' className='px-2' />
                  </div>
                  <ul className={`${isStudentVisibled ? 'block' : 'hidden'} absolute z-10 top-[72px] w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg`}>
                    {students.map(student => (
                      <li key={student.id} className={`${student.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3`}>
                        <input
                          className='input-checked'
                          type='checkbox'
                          id={student.id}
                          onClick={e => editSelectedStudents(e)}
                        />
                        <label
                          htmlFor={student.id}
                          className='relative pl-6 w-full cursor-pointer label-checked'
                        >
                          {student.fullName}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <span className='flex gap-1 text-red-500'>
                    {formError.students ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.students ? formError.students.msg : ''}
                  </span>
                </div>
              </div>
            </section>
            <hr />
            <section className='mt-8 mb-8'> {/* Available days and times */}
              <h2 className='my-4 font-medium'>02. Días y Horarios disponibles</h2>
              <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='date' className='text-sm'>Fecha</label>
                  <div
                    className={`mobile:w-full tablet:max-w-[320px] flex justify-between items-center pl-3 pr-2 h-10 text-sm rounded-lg border-2 cursor-pointer ${formError.date ? 'border-red-500' : ''} ${dateStyle ? 'text-black bg-inputbackground' : 'text-lightgray'} ${isDateVisibled ? 'border-green' : ''}`}
                    onClick={() => {
                      setIsDateVisibled(!isDateVisibled);
                      setIsStudentVisibled(false);
                      setIsAdviserVisibled(false);
                      setIsDurationVisibled(false);
                      setIsTimeVisibled(false);
                    }}
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
            <hr />
            <section className='mt-8 mb-12'> {/* Create a username and a password */}
              <h2 className='my-4 font-medium'>03. Detalle</h2>
              <div className='flex flex-col gap-1'>
                <label htmlFor='detail' className='text-sm'>Comentarios del evento</label>
                <textarea
                  {...detail}
                  className={`border-2 mobile:w-full max-w-[656px] p-2 text-sm rounded-lg focus:outline-green ${formError.detail ? 'border-red-500' : ''} ${detailStyle ? 'bg-inputbackground text-black' : 'text-lightgray'}`}
                  id='detail'
                  cols='60'
                  rows='5'
                  placeholder='Escribir comentarios'
                  onChange={e => {
                    detail.onChange(e);
                    e.target.value ? setDetailStyle(true) : setDetailStyle(false);
                  }}
                  onFocus={e => {
                    setIsAdviserVisibled(false);
                    setIsStudentVisibled(false);
                    setIsTimeVisibled(false);
                    setIsDurationVisibled(false);
                    setIsDateVisibled(false);
                  }}
                ></textarea>
                <span className='flex gap-1 text-red-500'>
                  {formError.detail ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                  {formError.detail ? formError.detail.msg : ''}
                </span>
              </div>
            </section>
            <Button type='submit' name='Agendar evento' disabled={isEmpty} />
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateEventPage;