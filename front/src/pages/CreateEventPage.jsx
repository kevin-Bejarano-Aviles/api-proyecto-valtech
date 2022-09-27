import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import iconError from '../img/icon_warning.svg';
import iconArrow from '../img/list-control.svg';

function CreateEventPage() {
  const [formError, setFormError] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [students, setStudents] = useState([]);
  const [advisers, setAdvisers] = useState([]);
  const [isVisibled, setIsVisibled] = useState(false);
  const [studentListInput, setStudentListInput] = useState([]);

  useEffect(() => {
    getAllStudents();
    getAllAdvisers();
  },[]);

  useEffect(() => {
    console.log(formError);
  },[formError]);

  useEffect(() => {
    console.log('desde useEffect...');
    console.log(studentListInput);
  },[studentListInput]);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm(
    {
      // defaultValues: {
      //   adviser: '3',
      //   date: '2022-09-28',
      //   datail: 'Event detail',
      //   duration: '120',
      //   name: 'Event name',
      //   students: [],
      //   time: '17:00'
      // }
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    }
  );

  useEffect(() => {
    // if (
    //   watch().name === '' ||
    //   watch().adviser === '' ||
    //   watch().students === '' ||
    //   watch().date === '' ||
    //   watch().time === '' ||
    //   watch().duration === '' ||
    //   watch().detail === ''
    // ) {
    //   setIsEmpty(true);
    // } else {
    //   setIsEmpty(false);
    // }
    // console.log(watch());
    // console.log(errors);
  },[watch()]);

  // Function to 'Ingresar orietado' button.
  const onSubmit = async (data, e) => {
    e.preventDefault();
    data.students = studentListInput;
    console.log(data);
    // postStudent(data, e);
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
            students: e.target.students.value,
          }
      };
      console.log(options.data);
      // const response = await axios('http://localhost:8000/admin/addStudent', options);
      // setFormError(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
      console.log(err);
      setFormError(err.response.data);
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

  const getAllAdvisers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/advisers', { withCredentials: true });
      setAdvisers(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };
  // Function to change the background color of the input elements.
  const changeBackgroundColor = e => {
    if (e.target.value) {
      e.target.classList.remove('bg-white');
      e.target.classList.add('bg-inputbackground');
      e.target.classList.add('text-black');
    } else {
      e.target.classList.add('bg-white');
      e.target.classList.remove('bg-inputbackground');
    }
  };

  const editArray = (e) => {
    console.log(e.target.checked);
    e.target.checked ? addToArray(e.target.name) : removeFromArray(e.target.name);
  };

  const addToArray = (name) => {
    console.log(name);
    const newStudent = JSON.parse(name);
    const data = { id: newStudent.id};
    setStudentListInput([...studentListInput, data]);
  };

  const removeFromArray = (name) => {
    const newStudent = JSON.parse(name);
    const newStudentListInput = studentListInput.filter(student => student.id !== newStudent.id)
    setStudentListInput(newStudentListInput);
  };

  const openWindow = () => {
    setIsVisibled(!isVisibled);
  };

  const showStudents = (e) => {
    console.log('desde el metodo...');
    console.log(studentListInput);
    if(isVisibled) {
      let selectedStudents = [];
      let selectedNames = [];

      for (let object of studentListInput) {
        selectedStudents = [...selectedStudents, students.filter(student => student.id === object.id)[0]];
      }

      setValue('students', selectedStudents);

      for (let object of selectedStudents) {
        selectedNames = [...selectedNames, object.fullName];
      }

      // console.log(selectedNames);

      if (selectedNames.length === 0) {
        // console.log('es 0');
        // e.target.innerText = 'Seleccionar orientados';
        // e.target.classList.remove('text-black');
        // e.target.classList.add('text-lightgray');
        // e.target.parentElement.classList.remove('bg-inputbackground');
      } else {
        // console.log('es + de 0');
        let divElement = e.target.parentElement.parentElement.previousSibling.firstChild;
        divElement.innerText = selectedNames.join(', ');
        // e.target.classList.add('text-black');
        // e.target.parentElement.classList.add('bg-inputbackground');
      }
    }
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
                    {...register('name', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ ]{2,200}$/,
                        message: 'Min 2 caracteres'
                      }
                    })}
                    className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 text-sm rounded-lg border-2 ${(errors.name || formError.name) ? 'border-red-500' : ''}`}
                    type='text'
                    id='event-name'
                    placeholder='Ingresar nombre'
                    onBlur={e => changeBackgroundColor(e)}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {(errors.name || formError.name) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.name ? formError.name.msg : ''}
                    {errors.name?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='adviser' className='text-sm'>Orientador participante</label>
                  <select
                    {...register('adviser', {
                      required: 'Selecciona un orientador',
                    })}
                    className={`mobile:w-full tablet:max-w-[320px] pl-1 pr-2 h-10 text-sm rounded-lg text-lightgray appearance-none bg-no-repeat bg-[right_10px_center] border-2 cursor-pointer ${(errors.adviser || formError.adviser) ? 'border-red-500' : ''}`}
                    style={{backgroundImage: `url(${iconArrow})`}}
                    id='duration'
                    onBlur={e => changeBackgroundColor(e)}
                    onFocus={e => e.target.classList.add('text-black')}
                  >
                    <option selected hidden value=''>Seleccionar orientador</option>
                    {advisers.map(adviser => (
                        <option key={adviser.id} value={adviser.id}>{adviser.fullName}</option>
                    ))}
                  </select>
                  <span className='flex gap-1 text-red-500'>
                    {(errors.adviser || formError.adviser) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.adviser ? formError.adviser.msg : ''}
                    {errors.adviser?.message}
                  </span>
                </div>
                <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='students' className='text-sm'>Orientado/s participante/s</label>
                  <div
                    className={`flex items-center h-10 border-2 rounded-lg overflow-hidden cursor-pointer ${(errors.students || formError.students) ? 'border-red-500' : ''} ${isVisibled ? 'border-green' : ''}`}
                  >
                    <div
                      {...register('students', {
                        required: 'Campo requerido'
                      })}
                      className={`mobile:w-full tablet:max-w-[320px] pl-2 text-sm  text-lightgray truncate`}
                      id='students'
                      value={studentListInput}
                      onClick={(e) => openWindow()}
                    >
                      Seleccionar orientados
                    </div>
                    <img src={iconArrow} alt='' className='px-2 w-[32px]' />
                  </div>
                  <ul className={`${isVisibled ? 'block' : 'hidden'} absolute top-[72px] w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg`}>
                    {students.map(student => (
                      <li key={student.id} className={`${student.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3`}>
                        <input
                        className='hidden input-checked'
                          type='checkbox'
                          name={JSON.stringify(student)}
                          id={student.id}
                          onClick={(e) => {
                            editArray(e);
                            setTimeout(() => {
                              showStudents(e);
                            }, 500);
                          }}
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
                    {(errors.students || formError.students) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.students ? formError.students.msg : ''}
                    {errors.students?.message}
                  </span>
                </div>
              </div>
            </section>
            <hr />
            <section className='mt-8 mb-8'> {/* Available days and times */}
              <h2 className='my-4 font-medium'>02. Días y Horarios disponibles</h2>
              <div className='flex gap-4 mobile:flex-col lap_tablet:flex-row'>
                <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='date' className='text-sm'>Fecha</label>
                  <input
                    {...register('date', { required: false })}
                    className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 text-sm rounded-lg border-2 ${(errors.date || formError.date) ? 'border-red-500' : ''}`}
                    type='date'
                    id='date'
                    placeholder='Ingresar fecha'
                    onBlur={e => changeBackgroundColor(e)}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {(errors.date || formError.date) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.date ? formError.date.msg : ''}
                    {errors.date?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='time' className='text-sm'>Horario</label>
                  <input
                    {...register('time', { required: false })}
                    className={`mobile:w-full tablet:max-w-[320px] p-2 h-10 text-sm rounded-lg border-2 ${(errors.time || formError.time) ? 'border-red-500' : ''}`}
                    type='time'
                    min='00:00'
                    max='23:00'
                    id='time'
                    placeholder='Seleccionar horario'
                    onBlur={e => changeBackgroundColor(e)}
                  />
                  <span className='flex gap-1 text-red-500'>
                    {(errors.time || formError.time) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.time ? formError.time.msg : ''}
                    {errors.time?.message}
                  </span>
                </div>
                <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
                  <label htmlFor='duration' className='text-sm'>Duración</label>
                  <select
                    {...register('duration', {
                      required: false,
                    })}
                    className={`mobile:w-full tablet:max-w-[320px] pl-1 pr-2 h-10 text-sm rounded-lg text-lightgray appearance-none bg-no-repeat bg-[right_10px_center] border-2 ${(errors.duration || formError.duration) ? 'border-red-500' : ''}`}
                    style={{backgroundImage: `url(${iconArrow})`}}
                    id='duration'
                    onBlur={e => changeBackgroundColor(e)}
                    onFocus={e => e.target.classList.add('text-black')}
                    onChangeCapture={e => e.target.classList.add('text-black')}
                  >
                    <option selected hidden value=''>Seleccionar duración</option>
                    <option value='15'>00:15 hs</option>
                    <option value='30'>00:30 hs</option>
                    <option value='45'>00:45 hs</option>
                    <option value='60'>1:00 hs</option>
                    <option value='75'>1:15 hs</option>
                    <option value='90'>1:30 hs</option>
                    <option value='105'>1:45 hs</option>
                    <option value='120'>2:00 hs</option>
                    <option value='135'>2:15 hs</option>
                    <option value='150'>2:30 hs</option>
                    <option value='165'>2:45 hs</option>
                    <option value='180'>3:00 hs</option>
                    <option value='195'>3:15 hs</option>
                    <option value='210'>3:30 hs</option>
                    <option value='225'>3:45 hs</option>
                    <option value='240'>4:00 hs</option>
                    <option value='255'>4:15 hs</option>
                    <option value='270'>4:30 hs</option>
                    <option value='285'>4:45 hs</option>
                    <option value='300'>5:00 hs</option>
                    <option value='315'>5:15 hs</option>
                    <option value='330'>5:30 hs</option>
                    <option value='345'>5:45 hs</option>
                    <option value='360'>6:00 hs</option>
                    <option value='375'>6:15 hs</option>
                    <option value='390'>6:30 hs</option>
                    <option value='405'>6:45 hs</option>
                    <option value='420'>7:00 hs</option>
                    <option value='435'>7:15 hs</option>
                    <option value='450'>7:30 hs</option>
                    <option value='465'>7:45 hs</option>
                    <option value='480'>8:00 hs</option>
                  </select>
                  <span className='flex gap-1 text-red-500'>
                    {(errors.duration || formError.duration) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                    {formError.duration ? formError.duration.msg : ''}
                    {errors.duration?.message}
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
                  {...register('detail', {
                    required: false,
                    pattern: {
                      value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ., ]{2,500}$/,
                      message: 'Campo inválido'
                    }
                  })}
                  className={`border-2 mobile:w-full max-w-[656px] p-2 text-sm rounded-lg ${(errors.detail || formError.detail) ? 'border-red-500' : ''}`}
                  id='detail'
                  cols='60'
                  rows='5'
                  placeholder='Escribir comentarios'
                  onBlur={e => changeBackgroundColor(e)}
                ></textarea>
                <span className='flex gap-1 text-red-500'>
                  {(errors.detail || formError.detail) ? (<img src={iconError} className='self-start relative top-1' />) : ''}
                  {formError.detail ? formError.detail.msg : ''}
                  {errors.detail?.message}
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