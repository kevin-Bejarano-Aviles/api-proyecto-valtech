import { React, useEffect, useState } from 'react';
import Menu from '../sharedPrivateComponents/menu/Menu';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../sharedPrivateComponents/button/Button';
import { useForm } from 'react-hook-form';
import { useParams, NavLink } from 'react-router-dom';
import Alert from '../sharedPrivateComponents/Alert';
import useGet from '../hooks/useGet';
import usePut from '../hooks/usePut';
import { Formik, Form, Field } from 'formik';

function AssignAdviserPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectOption, setSelectOption] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [viewButton, setViewButton] = useState(true);
  const [hideMessage, setHideMessage] = useState(true);
  const [hideCard, setHideCard] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  let token = localStorage.getItem('token');

  const clickShowAlert = () => {
    setShowAlert(!showAlert);
  };

  const params = useParams();
  const idStudent = params.id;

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

  const assignAdviser = async (data) => {
    try {
      let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: { ...data },
      };
      console.log(options.data);
      const response = await axios(
        `http://localhost:8000/admin/advisers/student/${params.id}`,
        options
      );
      console.log(response.data);
    } catch (err) {
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
          <section className=' mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row'>
            <h2 className='text-2xl text-blue ml-[46px]  mt-8 '>
              Asignación de Orientador Referente
            </h2>
            <div>
              <div className='min-w-[365px] py-4 flex flex-row  mt-4 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
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
                <div className=' laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                  <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                    <h2 className='text-2xl font-normal ml-6 '>
                      {studentDetail && studentDetail.fullName}
                    </h2>
                    <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                      Orientado
                    </h4>
                  </div>
                  <div className='flex flex-row '>
                    <div className='w-1/2 px-6 '>
                      <h5 className='text-xs text-lightgray '>mail</h5>
                      <p className='text-[16pxpx] leading-[26px] text-blue '>
                        {studentDetail && studentDetail.email}
                      </p>
                      <h5 className='text-xs text-lightgray'>Colegio</h5>
                      <p className='text-[16pxpx] leading-[26px] text-blue'>
                        {studentDetail && studentDetail.school}
                      </p>
                    </div>
                    <div className='w-1/2 px-6 '>
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
            </div>
          </section>

          <section>
            {/* select adviser */}
            <h2 className='text-2xl text-blue ml-[46px]  mt-8'>
              Selección de un Orientador Referente
            </h2>

            <div className='ml-12'>
              <Formik
                initialValues={{
                  idAdviser: '',
                }}
                onSubmit={(data) => {
                  assignAdviser(data);
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
                      <div className='py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                        <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                          <img
                            className='w-[140px] h-[140px] rounded-full'
                            src={
                              ''
                                ? require(`../img/adviser/${''}`)
                                : 'https://i.imgur.com/b08hxPY.png'
                            }
                            alt={selectOption}
                          />
                        </div>
                        <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                          <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                            <h2 className='text-2xl font-normal ml-6 '>
                              Nombre
                            </h2>
                            <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                              Orientador
                            </h4>
                          </div>
                          <div className='flex flex-row '>
                            <div className='w-1/2 px-6 '>
                              <h5 className=' text-xs text-lightgray'>mail</h5>
                              <p className=' text-[16pxpx] leading-[26px] text-blue '>
                                {selectOption}
                              </p>
                            </div>
                            <div className='w-1/2 px-6 '>
                              <h5 className=' text-xs text-lightgray'>
                                Telefono
                              </h5>
                              <p className=' text-[16pxpx] leading-[26px] text-blue '>
                                Taller de matematicas
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
                        onClick={clickShowAlert}
                      >
                        <div className='relative left-[-40px]'>
                          <Button
                            type='submit'
                            name='Asignar orientador/a'
                            disabled={isEmpty}
                          />
                        </div>
                      </div>
                      <div className='hidden'>.</div>
                    </div>
                    <div className={viewButton ? 'hidden' : 'block'}>
                      <div className='flex flex-row ml-10 relative bottom-10 items-center'>
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
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/*                   

                </form>
              </div>
            </div>  */}

            {/* I show the data of the selected adviser */}
            <div className={hideCard ? 'hidden' : 'block'}>
              {studentDetail && studentDetail.adviserId !== null ? (
                <div className='c py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                  <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
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
                    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                      <h2 className='text-2xl font-normal ml-6 '>
                        {studentDetail && studentDetail.Adviser.fullName}
                      </h2>
                      <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                        Orientador
                      </h4>
                    </div>
                    <div className='flex flex-row  h-auto'>
                      <div className='max-w-1/2 pl-6 h-auto '>
                        <h5 className=' text-xs text-lightgray'>mail</h5>
                        <p className='w-auto h-auto text-[16pxpx] leading-[26px] text-blue flex justify-center items-center'>
                          {studentDetail && studentDetail.Adviser.email}
                        </p>
                      </div>
                      <div className='max-w-1/2   pr-6'>
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

// Changed the form with the select (UseForm) to a form with the select (Formik). It will be implemented in the code soon

/* import { React, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../components/Button";


const Af = () => {  */
/* const [formularioEnviado, cambiarFormularioEnviado] = useState(false); */
/* const [oriented, setOriented] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();  */
/*   let asd = document.getElementById('idAdviser');
  let valueText = asd.options[asd.selectedIndex].text;
 */

/* 
   useEffect(() => {
    if ( isVisible === !true  ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  });
  // Traigo los datos de los adviser
  const getAllOriented = async () => {
    try {
      let Orientador = await axios.get(`http://localhost:8000/admin/advisers`, {
        withCredentials: true,
      });
      setOriented(Orientador.data.advisers);
      // console.log(Orientador.data.advisers)
    } catch (Orientador) {
      navigate("error");
      let message = Orientador.response.statusText || "Ocurrió un error";
      console.log(message);
    }
  };

  // ----

  const params = useParams();
  const postOrientador = async (data) => {
    try {
      let options = {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        withCredentials: true,
        data: { ...data },
      };
      console.log(options.data);
      const response = await axios(
        `http://localhost:8000/admin/assignAdviser/${params.id}`,
        options
      );
      console.log(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
      console.log(err);
    }
  };

  useEffect(() => {
    getAllOriented();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
            idAdviser: "",
        }}

        
        onSubmit={(data) => {
          postOrientador(data);
        }}
      >
        {() => (
          <Form className="formulario">
            <div>
              <Field
                className="border-[3px] border-black"
                name="idAdviser"
                as="select"
                onClick={() => setIsVisible(true)} 
                
              >
                
                <option  selected hidden>
                  Seleccionar orientador
                </option>
                {oriented.map((elemento) => (
                  <option
                  onChange={(a)=>{
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
           

             <div className={isVisible ? "block" : "hidden"}>
              <div className="py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
                <div className="w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray">
                  <img
                    className="w-[140px] h-[140px] rounded-full"
                    src={
                      ""
                        ? require(`../img/adviser/${""}`)
                        : "https://i.imgur.com/b08hxPY.png"
                    }
                    alt={selectOption}
                  />
                </div>
                <div className="laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center">
                  <div className=" mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto">
                    <h2 className="text-2xl font-normal ml-6 ">c</h2>
                    <h4 className="text-[15px] leading-[22px]  ml-6 text-lightgray">
                      Orientador
                    </h4>
                  </div>
                  <div className="flex flex-row ">
                    <div className="w-1/2 px-6 ">
                      <h5 className=" text-xs text-lightgray">mail</h5>
                      <p className=" text-[16pxpx] leading-[26px] text-blue ">
                        {selectOption}email@arbusta.com
                      </p>
                    </div>
                    <div className="w-1/2 px-6 ">
                      <h5 className=" text-xs text-lightgray">Telefono</h5>
                      <p className=" text-[16pxpx] leading-[26px] text-blue ">
                        1156897432
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
                <Button
                  type="submit"
                  name="Modificar orientador/a"
                  disabled={isEmpty}
                />
              </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Af;
 */

{
  /* <section> */
}
{
  /* select adviser */
}
{
  /*             <h2 className='text-2xl text-blue ml-[46px]  mt-8'>
              Selección de un Orientador Referente
            </h2>
            <div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className={
                      hideCard || studentDetail.adviserId === null
                        ? 'block'
                        : 'hidden'
                    }
                  >
                    <div>
                      <label className='text-[14px] leading-4 text-blue ml-[46px]  mt-4'>
                        Referente
                      </label>
                    </div>
                    <select
                      {...register('idAdviser')}
                      onChange={(a) => {
                        const valueOption = a.target.value;
                        setSelectOption(valueOption);
                      }}
                      onClick={() => setIsVisible(true)}
                      className='mt-2 ml-10 mobile:max-w-[320px] tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400  border-2'
                    >
                      <option selected hidden value=''>
                        Seleccionar orientador
                      </option>
                      {adviserList.map((elemento) => (
                        <option
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
                    </select>
                  </div>

                  <div className={isVisible ? 'block' : 'hidden'}> */
}
{
  /* show the data of the adviser */
}
{
  /*                     <div className='py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                      <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                        <img
                          className='w-[140px] h-[140px] rounded-full'
                          src={
                            ''
                              ? require(`../img/adviser/${''}`)
                              : 'https://i.imgur.com/b08hxPY.png'
                          }
                          alt={selectOption}
                        />
                      </div>
                      <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                        <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                          <h2 className='text-2xl font-normal ml-6 '>Nombre</h2>
                          <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                            Orientador
                          </h4>
                        </div>
                        <div className='flex flex-row '>
                          <div className='w-1/2 px-6 '>
                            <h5 className=' text-xs text-lightgray'>mail</h5>
                            <p className=' text-[16pxpx] leading-[26px] text-blue '>
                              {selectOption}
                            </p>
                          </div>
                          <div className='w-1/2 px-6 '>
                            <h5 className=' text-xs text-lightgray'>
                              Telefono
                            </h5>
                            <p className=' text-[16pxpx] leading-[26px] text-blue '>
                              Taller de matematicas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */
}
{
  /* buttons to send the data */
}
{
  /*                   <div
                    className='ml-10 mt-16 mb-8 flex flex-row '
                    onClick={() => setViewButton(false)}
                  >
                    <div
                      className={`${showAlert ? 'hidden' : 'block'} ${
                        hideCard || studentDetail.adviserId === null
                          ? 'block'
                          : 'hidden'
                      } `}
                      onClick={clickShowAlert}
                    >
                      <Button
                        type='submit'
                        name='Asignar orientador/a'
                        disabled={isEmpty}
                      />
                    </div>
                    <div className='hidden'>.</div>
                  </div>
                  <div className={viewButton ? 'hidden' : 'block'}>
                    <div className='flex flex-row ml-10 relative bottom-10 items-center'>
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
                  </div>
                </form>
              </div>
            </div> */
}

{
  /* I show the data of the selected adviser */
}
{
  /*             <div className={hideCard ? 'hidden' : 'block'}>
              <div className={studentDetail.adviserId !== null ? 'block' : 'hidden'}>
                <div className='c py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg '>
                  <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                    <img
                      className='w-[140px] h-[140px] rounded-full'
                      src={
                        studentDetail.Adviser && studentDetail.Adviser.avatar
                          ? require(`../../../assets/adviser/${
                            studentDetail.Adviser && studentDetail.Adviser.avatar
                            }`)
                          : 'https://i.imgur.com/b08hxPY.png'
                      }
                      alt={selectOption}
                    />
                  </div>
                  <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                      <h2 className='text-2xl font-normal ml-6 '>
                        {studentDetail.Adviser && studentDetail.Adviser.fullName}
                      </h2>
                      <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>
                        Orientador
                      </h4>
                    </div>
                    <div className='flex flex-row  h-auto'>
                      <div className='max-w-1/2 pl-6 h-auto '>
                        <h5 className=' text-xs text-lightgray'>mail</h5>
                        <p className='w-auto h-auto text-[16pxpx] leading-[26px] text-blue flex justify-center items-center'>
                          {studentDetail.Adviser && studentDetail.Adviser.email}
                        </p>
                      </div>
                      <div className='max-w-1/2   pr-6'>
                        <h5 className=' text-xs text-lightgray'>Telefono</h5>
                        <p className=' text-[16pxpx] leading-[26px] text-blue '>
                          {studentDetail.Adviser && studentDetail.Adviser.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */
}
{
  /* button 'Volver' */
}
{
  /*               <div className={studentDetail.adviserId !== null ? 'block' : 'hidden'}>
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
            </div> */
}
{
  /* show alert */
}
{
  /*             <div className='mt-24 ml-10'>
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
          </section> */
}
