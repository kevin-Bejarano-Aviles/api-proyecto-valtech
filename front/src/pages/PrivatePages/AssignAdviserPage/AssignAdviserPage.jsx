import { React, useEffect, useState } from 'react';
import Menu from '../sharedPrivateComponents/menu/Menu';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import axios from 'axios';
import Button from '../sharedPrivateComponents/button/Button';
import { useParams, NavLink } from 'react-router-dom';
import Alert from '../sharedPrivateComponents/Alert';
import useGet from '../hooks/useGet';
import { Formik, Form, Field } from 'formik';

function AssignAdviserPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectOption, setSelectOption] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [viewButton, setViewButton] = useState(true);
  const [hideMessage, setHideMessage] = useState(true);
  const [hideCard, setHideCard] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const clickShowAlert = () => {
    setShowAlert(!showAlert);
  };

  const params = useParams();
  const idStudent = params.id;
  let token = localStorage.getItem('token');
  useEffect(() => {
    if (isVisible === !true) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  });

  /* I bring the oriented data*/
  const { studentDetail, getOneStudent } = useGet();

  useEffect(() => {
    getOneStudent(idStudent);
  }, []);
  /* I bring the data of the advisers  */

  const { adviserList, getAllAdvisers } = useGet();
  useEffect(() => {
    getAllAdvisers();
  }, []);

  //------

  const assignAdviser = async (idAdviser) => {
    try {
      let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: idAdviser,
      };
      const response = await axios(
        `http://localhost:8000/admin/advisers/student/${params.id}`,
        options
      );
      console.log(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
      console.log(err);
    }
  };

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

            <div className='min-w-[365px] py-4 flex flex-row mobile:h-[475px]  mobile:mx-auto  tablet:h-auto  mt-4  mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
              <div className='w-[178px] h-[178px] flex justify-center items-center laptop:border-r-[1px]  laptop:border-bordergray'>
                <img
                  className='w-[140px] h-[140px] rounded-full'
                  src={
                    studentDetail && studentDetail.avatar
                      ? require(`../../../assets/students/${
                          studentDetail && studentDetail.avatar
                        }`)
                      : 'https://i.imgur.com/b08hxPY.png'
                  }
                  alt='avatar'
                />
              </div>
              <div className=' laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col mobileL:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                <div className=' w-full mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                  <h2 className='text-2xl font-normal ml-6 '>
                    {studentDetail && studentDetail.fullName}
                  </h2>
                  <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                    Orientado
                  </h4>
                </div>
                <div className='flex flex-row mobile:flex-col mobile:h-auto tablet:flex-row'>
                  <div className='w-1/2 px-6 mobile:flex-col  tablet:flex-row'>
                    <h5 className='text-xs text-lightgray '>mail</h5>
                    <p className='text-[16pxpx] leading-[26px] text-blue '>
                      {studentDetail && studentDetail.email}
                    </p>
                    <h5 className='text-xs text-lightgray'>Colegio</h5>
                    <p className='text-[16pxpx] leading-[26px] text-blue'>
                      {studentDetail && studentDetail.school}
                    </p>
                  </div>
                  <div className='w-1/2 px-6 mobile:flex-col'>
                    <h5 className='text-xs text-lightgray'>Telefono</h5>
                    <p className='text-[16pxpx] leading-[26px] text-blue'>
                      {studentDetail && studentDetail.phoneNumber}
                    </p>
                    <h5 className='text-xs text-lightgray'>Programa</h5>
                    <p className='text-[16pxpx] leading-[26px] text-blue'>
                      {' '}
                      {studentDetail && studentDetail.program}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            {/* select adviser */}
            <h2 className='text-2xl text-blue  mt-8'>
              Selección de un Orientador Referente
            </h2>

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
                  <Form className='formulario'>
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
                          className='border-[3px] border-black'
                          name='idAdviser'
                          as='select'
                          onClick={() => setIsVisible(true)}
                        >
                          <option hidden value='Seleccionar orientador'>
                            Seleccionar orientador
                          </option>
                          {adviserList.map((elemento) => (
                            <option
                              onChange={(a) => {
                                const valueOption = a.target.value;
                                setSelectOption(valueOption);
                              }}
                              key={elemento.id}
                              value={[
                                `${elemento.id}`,
                                ` ${elemento.email}`,
                                ` ${elemento.phoneNumber}`,
                              ]}
                            >
                              {elemento.fullName}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className={isVisible ? 'block' : 'hidden'}>
                      {/* show the data of the adviser */}
                      <div className=' mt-20 mobile:mx-auto py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                        <div className='w-[178px] h-[178px] flex justify-center items-center laptop:border-r-[1px]  laptop:border-bordergray'>
                          <img
                            className='w-[140px] h-[140px] rounded-full'
                            src={
                              ''
                                ? require(`../../../assets/adviser/${''}`)
                                : 'https://i.imgur.com/b08hxPY.png'
                            }
                            alt={selectOption}
                          />
                        </div>
                        <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                          <div className=' mobile:left-40  lap_tablet:mx-auto  tablet:mx-auto'>
                            <h2 className='text-2xl font-normal ml-6 '>
                              Nombre Orientador
                            </h2>
                            <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                              Orientador
                            </h4>
                          </div>
                          <div className='flex flex-row  h-auto mobile:flex-col tablet:flex-row'>
                            <div className='max-w-1/2 pl-6 h-auto '>
                              <h5 className=' text-xs text-lightgray'>mail</h5>
                              <p className='w-auto h-auto text-[16pxpx] leading-[26px] text-blue flex justify-center items-center'>
                                Orientador@mail.com
                              </p>
                            </div>
                            <div className='max-w-1/2   px-6 mobile:flex-col tablet:flex-row'>
                              <h5 className=' text-xs text-lightgray'>
                                Telefono
                              </h5>
                              <p className=' text-[16pxpx] leading-[26px] text-blue '>
                                1125464851
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* buttons to send the data */}
                    <div
                      className='ml-10 mt-16 mb-8 flex flex-row '
                      onClick={() => setViewButton(false)}
                    >
                      <div
                        className={`${showAlert ? 'hidden' : 'block'} ${
                          hideCard ||
                          (studentDetail && studentDetail.adviserId === null)
                            ? 'block'
                            : 'hidden'
                        } `}
                        /* onClick={clickShowAlert} */
                      >
                        <div
                          className='relative left-[-40px]'
                          onClick={clickShowAlert}
                        >
                          <Button
                            type='submit'
                            name='Asignar orientador/a'
                            disabled={isEmpty}
                          />
                        </div>
                      </div>
                      <div className='hidden'>.</div>
                    </div>
                    {/*                     <div className={viewButton ? 'hidden' : 'block'}>
                      <div className='flex flex-row  relative bottom-10 items-center'>
                        <Button
                          type='submit'
                          name='Modificar orientador/a'
                          disabled={isEmpty}
                        />
                        <div className='ml-4 underline'>
                          <NavLink to={`/orientados/${params.id}`}>
                            Volver
                          </NavLink>
                        </div>
                      </div>
                    </div> */}
                  </Form>
                )}
              </Formik>
            </div>

            {/* I show the data of the selected adviser */}
            <div className={hideCard ? 'hidden' : 'block'}>
              {studentDetail && studentDetail.adviserId !== null ? (
                <div className=' mobile:mx-auto py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                  <div className='w-[178px] h-[178px] flex justify-center items-center laptop:border-r-[1px]  laptop:border-bordergray'>
                    <img
                      className='w-[140px] h-[140px] rounded-full'
                      src={
                        studentDetail && studentDetail.Adviser.avatar
                          ? require(`../../../assets/adviser/${
                              studentDetail && studentDetail.Adviser.avatar
                            }`)
                          : 'https://i.imgur.com/b08hxPY.png'
                      }
                      alt={selectOption}
                    />
                  </div>
                  <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                    <div className=' mobile:left-40  lap_tablet:mx-auto  tablet:mx-auto'>
                      <h2 className='text-2xl font-normal ml-6 '>
                        {studentDetail && studentDetail.Adviser.fullName}
                      </h2>
                      <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                        Orientador
                      </h4>
                    </div>
                    <div className='flex flex-row  h-auto mobile:flex-col tablet:flex-row'>
                      <div className='max-w-1/2 pl-6 h-auto '>
                        <h5 className=' text-xs text-lightgray'>mail</h5>
                        <p className='w-auto h-auto text-[16pxpx] leading-[26px] text-blue flex justify-center items-center'>
                          {studentDetail && studentDetail.Adviser.email}
                        </p>
                      </div>
                      <div className='max-w-1/2   px-6 mobile:flex-col tablet:flex-row'>
                        <h5 className=' text-xs text-lightgray'>Telefono</h5>
                        <p className=' text-[16pxpx] leading-[26px] text-blue '>
                          {studentDetail && studentDetail.Adviser.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
