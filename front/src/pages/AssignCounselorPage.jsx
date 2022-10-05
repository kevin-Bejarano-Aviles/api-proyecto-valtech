import { React, useEffect, useState }  from "react";
import Menu from '../components/Menu';
import HeaderAdmin from '../components/HeaderAdmin';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Button from '../components/Button'
import { useForm } from 'react-hook-form';
import { useParams, NavLink } from 'react-router-dom';
import Alert from '../components/Alert'


function AssignCounselorPage() {
  const [user, setUser] = useState([]);
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

  const [ocultar, setOcultar] = useState (true)

  const [ocultarCard, setOcultarCard] = useState(false)
  // const clickOcultarCard = () => {
  //   setOcultarCard (!ocultarCard);
  // }

   const [mostrar, setMostrar] = useState(false)
   const clickMostrar = () => {
     setMostrar (!mostrar);
 }




  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ( isVisible === !true  ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  });

 /* Traigo los datos del orietado*/

 const getAllStudents = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/admin/students/${params.id}`, { withCredentials: true });
    setUser(res.data.student);
    // console.log(res.data.student);
   } catch (err) {
    navigate('error');
    let message = err.response.statusText || 'Ocurrió un error';
    console.log(message);
   }
  };

   useEffect(() => {
     getAllStudents();
   },[]);









  /* Traigo los datos de los orietadores  */

  const getAllOriented = async () => {
    try {
      let Orientador = await axios.get(`http://localhost:8000/admin/advisers`, { withCredentials: true });
      setOriented(Orientador.data.advisers);
      // console.log(Orientador.data.advisers)
      
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
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr]  gap-0'>
      <Menu />
      <div>
      <HeaderAdmin Titulo='Orientados' />
      <main className='mobile:max-w-max mobile:mx-auto laptop:mx-8  '>
         <section className=" mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row">
         <h2 className="text-2xl text-blue ml-[46px]  mt-8 ">Asignación de Orientador Referente</h2>
      <div className=" ">

      <div className="py-4 flex flex-row  mt-4 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
      <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'><img className='w-[140px] h-[140px] rounded-full' src={user.avatar ? require(`../img/students/${user.avatar}`) : 'https://i.imgur.com/b08hxPY.png'} alt='avatar'/></div>
      <div className='laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
      <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
        <h2 className='text-2xl font-normal ml-6 '>{user.fullName}</h2>
        <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientado</h4>
      </div>
      <div className='flex flex-row '>
      <div className='w-1/2 px-6 '>
        <h5 className=' text-xs text-lightgray'>mail</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.email}</p>
        <h5 className=' text-xs text-lightgray'>Colegio</h5>
        <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.school}</p>
      </div>
      <div className='w-1/2 px-6 '>
      <h5 className=' text-xs text-lightgray'>Telefono</h5>
      <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.phoneNumber}</p>
      <h5 className=' text-xs text-lightgray'>Programa</h5>
      <p className=' text-[16pxpx] leading-[26px] text-blue'> {user.program}</p>
      </div>
      </div>
      </div>
      </div>
      </div>
        </section>


        <section>
        <h2 className="text-2xl text-blue ml-[46px]  mt-8">Selección de un Orientador Referente</h2> 
        <div>
          <div>  
            <form  onSubmit={handleSubmit(onSubmit)} id="1">
              <div className={ocultarCard || (user.adviserId === null) ? "block" : "hidden"}>
                <div>
                <label className='text-[14px] leading-4 text-blue ml-[46px]  mt-4'>Referente</label>
                </div>
                <select
                  {...register('idAdviser')}
                  onChange={(a)=>{
                    const valueOption = a.target.value;
                    setSelectOption(valueOption);
                  }}
    
                  onClick={()=>setIsVisible(true)}
                  className='mt-2 ml-10 mobile:max-w-[320px] tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400  border-2'   >
                    <option selected hidden value=''>Seleccionar orientador</option>
                    {oriented.map (elemento=>(
                      <option key={elemento.id} value={[`${elemento.id}`, ` ${elemento.email}`]} >
                        {elemento.fullName}
                      </option>
                    ))}
                </select>
              </div>

              <div  className={isVisible ? "block" : "hidden"}>
                
                <div className="py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
                  <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                    <img 
                      className='w-[140px] h-[140px] rounded-full'
                      src={'' ? require(`../img/adviser/${''}`) : 'https://i.imgur.com/b08hxPY.png'}
                      alt={selectOption}/>
                  </div>
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
              </div>
              <div className="ml-10 mt-16 mb-8 flex flex-row "  onClick={()=>setViewButton(false)}>
                <div className={`${alert ? "hidden" : "block"} ${ocultarCard || (user.adviserId === null) ? "block" : "hidden"} `}  onClick={clickAlert}>
                  <Button type='submit' name='Asignar orientador/a' disabled={isEmpty}  />
                </div>
                <div className="hidden">.</div>
              </div> 
              <div className={viewButton ? "hidden" : "block"}>
                <div className="flex flex-row ml-10 relative bottom-10 items-center">
                  <div>
                  <div  onClick={clickAlertm}>
                    <Button type='submit'  name='Modificar orientador/a' disabled={isEmpty}  /> 
                  </div></div>
                  <div className="ml-4 underline">
                    <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
                  </div>
                </div>
              </div>
            </form> 
          </div>
        </div>
          

        <div  className={ocultarCard ? "hidden" : "block"}>
        <div className={user.adviserId !==null ? "block" : "hidden"}>
          
           <div className="py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
            <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'><img className='w-[140px] h-[140px] rounded-full' src={user.Adviser && user.Adviser.avatar ? require(`../img/adviser/${user.Adviser && user.Adviser.avatar}`) : 'https://i.imgur.com/b08hxPY.png'} alt={selectOption}/></div>
            <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
            <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
            <h2 className='text-2xl font-normal ml-6 '></h2>
            <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientador</h4>
            </div>
            <div className='flex flex-row '>
            <div className='w-1/2 px-6 '>
            <h5 className=' text-xs text-lightgray'>mail</h5>
            <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.Adviser && user.Adviser.email}</p>
            </div>
            <div className='w-1/2 px-6 '>
            <h5 className=' text-xs text-lightgray'>Telefono</h5>
            <p className=' text-[16pxpx] leading-[26px] text-blue'>{user.Adviser && user.Adviser.phoneNumber}</p>
            </div>
            </div>
            </div>
            </div>
            </div>
           
           <div className={user.adviserId !==null ? "block" : "hidden"} >
           <div className="flex flex-row ml-10 mt-16 relative bottom-10 items-center">

           <Button type='button' handleFunction={() => setOcultarCard(true)}  name='Modificar orientador/a'/>

           <div className="ml-4 underline">
            <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
           </div>
           </div>
          </div>
          </div>


  


        <div className="mt-24 ml-10">
        <div className={!ocultar ? "hidden" : "block"}> 
        {alert ? <Alert message='El orientado ya fue asignado a su referente.' onclick={() => setOcultar(false)}/> : ''}
        </div>
{/*         <div>
        {alertm ? <Alert message='El orientado fue modificado.' onclick={() => clickAlertm(false)}/> : ''}
        </div> */}
        </div>
        </section>
         


      </main>
      </div>

    </div>
  )
}

export default AssignCounselorPage; 


