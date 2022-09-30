import { React, useEffect, useState }  from "react";
import Menu from '../components/Menu';
import HeaderAdmin from '../components/HeaderAdmin';
import AssingComponente from '../components/AssignComponent'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Button from '../components/Button'
import { useForm } from 'react-hook-form';
import { useParams, NavLink } from 'react-router-dom';
import Alert from '../components/Alert'

/* import AssignOriented from "../components/AssignOriented"; */

function AssignCounselorPage() {
  const [oriented, setOriented] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  const [selectOption, setSelectOption] = useState('')
  const [isEmpty, setIsEmpty] = useState(true);
  const [alert, setAlert] = useState(false)
  const clickAlert = () => {
    setAlert (!alert);
  }
  const [alertm, setAlertm] = useState(false)
  const clickAlertm = () => {
    setAlertm (!alertm);
  }
  const [viewButton, setViewButton] = useState(true)
/*   const clickButton = () => {
    setViewButton (!viewButton);
  } */

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ( isVisible === !true  ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  });

  const getAllOriented = async () => {
    try {
      let Orientador = await axios.get(`http://localhost:8000/admin/advisers`, { withCredentials: true });
      setOriented(Orientador.data);
      
    } catch (Orientador) {
      navigate('error');
      let message = Orientador.response.statusText || 'Ocurrió un error';
      console.log(message);
    }
  };

  useEffect(() => {
    getAllOriented();
  },[]);



  /* Put */
  const { register,handleSubmit } = useForm()
  
  const onSubmit = (data, e)=>{
    e.preventDefault();
    postOrientador(data);  
  };

  const postOrientador = async (data) => {
    try {
      let options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true,
          data: {...data}
      };
      console.log(options.data);
      const response = await axios(`http://localhost:8000/admin/assignAdviser/${params.id}`, options);
      console.log(response.data); 
      
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
      console.log(err);
      
    }
  };



  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
      <HeaderAdmin Titulo='Orientados' />
      <main className='mobile:max-w-max mobile:mx-auto laptop:mx-8  '>
         <section className=" mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row">
         <h2 className="text-2xl text-blue ml-[46px]  mt-8 ">Asignación de Orientador Referente</h2>
      <div className=" ">
          <AssingComponente/>
          
      </div>
         </section>
         <seccion>
         <h2 className="text-2xl text-blue ml-[46px]  mt-8">Selección de un Orientador Referente</h2>
         <h4 className="text-[14px] leading-4 text-blue ml-[46px]  mt-4">Referente</h4>
         
        <form  onSubmit={handleSubmit(onSubmit)}>
        <select
         {...register('idAdviser')}
        onChange={(a)=>{
          const valueOption = a.target.value;
          setSelectOption(valueOption);
        }}
/*         onChange={(a)=>{
          const valueOption = a.target.value;
          setSelectOption(valueOption);
        }} */
        onClick={()=>setIsVisible(true)}
        
        className="mt-2 ml-10 mobile:max-w-[320px] tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400  border-2"   >
        <option selected hidden value=''>Seleccionar orientador</option>
            {oriented.map (elemento=>(
             <option key={elemento.id} value={[`${elemento.id}`, ` ${elemento.email}`]} >{elemento.fullName}</option>
            ))}
        </select>
          
      

        <div  className={isVisible ? "block" : "hidden"}>
  
        {/* {oriented.map(info=>( */}
        <div className="py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
        <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'><img className='w-[140px] h-[140px] rounded-full' src={'' ? require(`../img/adviser/${''}`) : 'https://i.imgur.com/b08hxPY.png'} alt={selectOption}/></div>
        <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
        <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
        <h2 className='text-2xl font-normal ml-6 '></h2>
        <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientador</h4>
        </div>
        <div className='flex flex-row '>
        <div className='w-1/2 px-6 '>
        <h5 className=' text-xs text-lightgray'>mail</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue '>{selectOption}</p>
        </div>
        <div className='w-1/2 px-6 '>
        <h5 className=' text-xs text-lightgray'>Telefono</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue '>Taller de matematicas</p>
        </div>
        </div>
        </div>
        </div>
      {/*   ))} */}

        </div>

        <div className="ml-10 mt-16 mb-8 flex flex-row "  onClick={()=>setViewButton(false)}>
        <div  onClick={clickAlert}>
        <Button type='submit' name='Asignar orientador/a' disabled={isEmpty}  />
        </div>
        <div className="hidden">.</div>
        </div>
        <div className={viewButton ? "hidden" : "block"}>
          <div className="bg-blue" onClick={clickAlertm}>
          <Button type='submit' name='Modificar orientador/a' disabled={isEmpty}  /> 
          </div>
          <div>
            <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
          </div>
        </div>
        
        </form>
        <div className="mt-24 ml-10">
        {alert ? <Alert message='El orientado ya fue asignado a su referente.' onclick={() => clickAlert(false)}/> : ''}
        
        {alertm ? <Alert message='El orientado fue modificado.' onclick={() => clickAlertm(false)}/> : ''}
        </div>
        </seccion>
      </main>
      </div>

    </div>
  )
}

export default AssignCounselorPage; 

