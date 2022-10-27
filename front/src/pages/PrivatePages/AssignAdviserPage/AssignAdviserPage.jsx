import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Menu from '../sharedPrivateComponents/menu/Menu';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Button from '../sharedPrivateComponents/button/Button';
import Alert from '../sharedPrivateComponents/Alert';
import useGet from '../hooks/useGet';
import CardStudents from './Components/CardStudents';
import CardAdivser from './Components/CardAdivser';
import CardShowAdviser from './Components/CardShowAdviser'

function AssignAdviserPage() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const params = useParams();
  const idStudent = params.id;
  const token = localStorage.getItem('token');
/*   const selectRef = useRef()
  const mostrarRef = useRef(null)
  
  const clickRef = () =>{
    alert(selectRef.current.value)
  } */



  const [cardAdviserIsVisible, setcardAdviserIsVisible] = useState(false);
  const [selectOption, setSelectOption] = useState('');
  const [sele, setSele] = useState()
  const [isEmpty, setIsEmpty] = useState(true);
  /*  const [viewButton, setViewButton] = useState(true); */
  const [hideMessage, setHideMessage] = useState(true);
  const [hideCard, setHideCard] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClickShowAlert = () => {
    setShowAlert(!showAlert);
  };


  useEffect(() => {
    setIsEmpty(!cardAdviserIsVisible);
  });

  /* I bring the oriented data */
  const { studentDetail, getOneStudent } = useGet();

  /* I bring the data of the advisers  */

  const { adviserList, getAllAdvisers } = useGet();

  //---

  useEffect(() => {
    getOneStudent(idStudent);
    getAllAdvisers();
    
  }, []);

  //------

  const assignAdviser = async (idAdviser) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: idAdviser,
      };
      const response = await axios(
        `${baseUrl}/admin/advisers/student/${params.id}`,
        options
      );
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };



  //-----------

  

//----------

/* const ref = useRef();


const myFunction = () => {
  const valueOption = (ref.current.value);
  setValor(valueOption)
  console.log(valor)
 } */
const [valor,setValor] = useState(1)
const {adviserDetail, getOneAdviser} = useGet()
useEffect(() => {
/*  const valueOfOption = ref */
  getOneAdviser(valor)
}, []);







  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr]  gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title='Orientados' />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-8  '>
          {/* I show the data of the oriented */}
          <section>
            <h2 className='text-2xl text-blue   mt-8 '>
              Asignación de Orientador Referente
            </h2>

            <CardStudents
              avatar={studentDetail && studentDetail.avatar}
              ruta='students'
              fullName={studentDetail && studentDetail.fullName}
              email={studentDetail && studentDetail.email}
              school={studentDetail && studentDetail.school}
              phoneNumber={studentDetail && studentDetail.phoneNumber}
              program={studentDetail && studentDetail.program}
            />
          </section>

          <section>
            {/* select adviser */}
            <h2 className='text-2xl text-blue  mt-8'>
              Selección de un Orientador Referente
            </h2>
            <div
              className={
                hideCard || (studentDetail && studentDetail.adviserId === null)
                  ? 'block'
                  : 'hidden'
              }
            >
              <h4>Referente</h4>
            </div>

            <div className=''>
              <Formik
                initialValues={{
                  idAdviser: '',
                }}
                onSubmit={(idAdviser) => {
                  assignAdviser(idAdviser);
                }}
              >
                {() => (
                  <Form className='formulario' >
                    <div
                      className={
                        hideCard ||
                        (studentDetail && studentDetail.adviserId === null)
                          ? 'block'
                          : 'hidden'
                      }
                    >
                      <div>
                        <Field
                          className='border-[1px] rounded-lg border-bordergray mt-4'
                          name='idAdviser'
                          as='select'
                          /* onClick={myFunction} */ 
                          onClick={() => setcardAdviserIsVisible(true)}    
                            
      
                        >
                          <option   hidden value={0}>
                            Seleccionar orientador
                          </option>
                          {adviserList.map((elemento) => (
                          
                          <option /* ref={ref}  key={elemento.id}  */                          
                          onChange={(e) => {
                            const valueOption = e.target.value;
                            setValor(valueOption); 
                          }}   
                          value={elemento.id}> {elemento.fullName}</option>
                        ))}

                       

                        </Field>
                      </div>
                    </div>


                    <div className={cardAdviserIsVisible ? 'block' : 'hidden'}>
                      {/* show the data of the adviser */}
                      <div className='mt-16'>
                        <CardShowAdviser
                          avatar={adviserDetail && adviserDetail.avatar}
                          fullName= {valor && valor}
                          email={adviserDetail && adviserDetail.email}
                          phoneNumber={adviserDetail && adviserDetail.phoneNumber}
                        />
                      </div>
                    </div>
                    {/* buttons to send the data */}
                    <div
                      className='ml-10 mt-16 mb-8 flex flex-row '
                      /* onClick={() => setViewButton(false)} */
                    >
                      <div
                        className={`${showAlert ? 'hidden' : 'block'} ${
                          hideCard ||
                          (studentDetail && studentDetail.adviserId === null)
                            ? 'block'
                            : 'hidden'
                        } `}
                      >
                        <div className='relative left-[-40px]'>
                          <Button
                            type='submit'
                            name='Asignar orientador/a'
                            disabled={isEmpty}
                            /* handleFunction={handleClickShowAlert} */
                          />
                        </div>
                      </div>
                      <div className='hidden'>.</div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* I show the data of the selected adviser */}
            <div className={hideCard ? 'hidden' : 'block'}>
              {studentDetail && studentDetail.adviserId !== null ? (
                <CardAdivser
                  avatar={studentDetail && studentDetail.Adviser.avatar}
                  fullName={studentDetail && studentDetail.Adviser.fullName}
                  email={studentDetail && studentDetail.Adviser.email}
                  phoneNumber={studentDetail && studentDetail.phoneNumber}
                />
              ) : (
                ''
              )}

              {/* button 'Volver' */}
              <div
                className={
                  studentDetail && studentDetail.adviserId !== null
                    ? 'block'
                    : 'hidden'
                }
              >
                <div className='flex flex-row ml-10 mt-16 relative bottom-10 items-center'>
                  <Button
                    type='button'
                    handleFunction={() => setHideCard(true)}
                    name='Modificar orientador/a'
                  />
                  <div className='ml-4 underline'>
                    <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/* show alert */}
            <div className='mt-24 ml-10'>
              <div className={!hideMessage ? 'hidden' : 'block'}>
                {showAlert ? (
                  <Alert
                    message='El orientado ya fue asignado a su referente.'
                    onclick={() => setHideMessage(false)}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AssignAdviserPage;
