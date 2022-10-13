import { React, useEffect, useState }  from "react";
import Menu from '../../PrivatePages/sharedPrivateComponents/menu/Menu';
import HeaderAdmin from '../../PrivatePages/sharedPrivateComponents/header/HeaderAdmin';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Button from '../../PrivatePages/sharedPrivateComponents/button/Button'
import { useForm } from 'react-hook-form';
import { useParams, NavLink } from 'react-router-dom';
import Alert from '../../PrivatePages/sharedPrivateComponents/Alert'


function AssignAdviserPage() {
  const [userData, setUserData] = useState([]);
  const [adviserData, setAdviserData] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  const [selectOption, setSelectOption] = useState('')
  const [isEmpty, setIsEmpty] = useState(true);
  const [viewButton, setViewButton] = useState(true)
  const [hideMessage, setHideMessage] = useState (true)
  const [hideCard, setHideCard] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const clickShowAlert = () => {
    setShowAlert (!showAlert);
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

 /* I bring the oriented data*/

 const getAllStudents = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/admin/students/${params.id}`, { withCredentials: true });
    setUserData(res.data.student);
   } catch (err) {
    navigate('error');
    /* let message = err.response.statusText || 'Ocurrió un error'; */
   }
  };

   useEffect(() => {
     getAllStudents();
   },[]);


  /* I bring the data of the advisers  */

  const getAllAdvisers = async () => {
    try {
      let adviserData = await axios.get(`http://localhost:8000/admin/advisers`, { withCredentials: true });
      setAdviserData(adviserData.data.advisers);  
    } catch (adviserData) {
      navigate('error');
    }
  };

  useEffect(() => {
    getAllAdvisers();
  });



  /* sent the adviser who was assigned*/
  const { register,handleSubmit } = useForm()
  
  const onSubmit = (data, e)=>{
    e.preventDefault();
    assignAdviser(data);  
  };

  const assignAdviser = async (data) => {
    try {
      let options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true,
          data: {...data}
      };
      
      const response = await axios(`http://localhost:8000/admin/assignAdviser/${params.id}`, options);  
      console.log(response.data); 
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);   
    }
  };



  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr]  gap-0'>
      <Menu />
      <div>
      <HeaderAdmin Title='Orientados' />
      <main className='mobile:max-w-max mobile:mx-auto laptop:mx-8  '>
      {/* I show the data of the oriented */}
        <section className=" mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row">
          <h2 className="text-2xl text-blue ml-[46px]  mt-8 ">Asignación de Orientador Referente</h2>
           <div>
              <div className="min-w-[365px] py-4 flex flex-row  mt-4 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
                <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                  <img className='w-[140px] h-[140px] rounded-full' 
                   src={userData.avatar ? require(`./../../../assets/students/${userData.avatar}`) : 'https://i.imgur.com/b08hxPY.png'} 
                   alt='avatar'/>
                </div>
                <div className=' laptop:max-w-[823px] h-[178px] ml-8 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                      <h2 className='text-2xl font-normal ml-6 '>{userData.fullName}</h2>
                      <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientado</h4>
                    </div>
                     <div className='flex flex-row '>
                         <div className='w-1/2 px-6 '>
                           <h5 className='text-xs text-lightgray '>mail</h5>
                            <p className='text-[16pxpx] leading-[26px] text-blue '>{userData.email}</p>
                            <h5 className='text-xs text-lightgray'>Colegio</h5>
                           <p className='text-[16pxpx] leading-[26px] text-blue'>{userData.school}</p>
                         </div>
                         <div className='w-1/2 px-6 '>
                           <h5 className='text-xs text-lightgray'>Telefono</h5>
                            <p className='text-[16pxpx] leading-[26px] text-blue'>{userData.phoneNumber}</p>
                            <h5 className='text-xs text-lightgray'>Programa</h5>
                           <p className='text-[16pxpx] leading-[26px] text-blue'> {userData.program}</p>
                         </div>
                    </div>
                </div>
              </div>
           </div>
        </section>

        <section>
        {/* select adviser */}
        <h2 className="text-2xl text-blue ml-[46px]  mt-8">Selección de un Orientador Referente</h2> 
        <div>
          <div>  
            <form  onSubmit={handleSubmit(onSubmit)} >
              <div className={hideCard || (userData.adviserId === null) ? "block" : "hidden"}>
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
                    {adviserData.map (elemento=>(
                      <option key={elemento.id} value={[`${elemento.id}`, ` ${elemento.email}`, ` ${elemento.phoneNumber}`]} >
                        {elemento.fullName}
                      </option>
                    ))}
                </select>
              </div>
              
              <div  className={isVisible ? "block" : "hidden"}>
              {/* show the data of the adviser */}
                <div className="py-4 flex flex-row  mt-4 mb-6 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
                  <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                    <img 
                      className='w-[140px] h-[140px] rounded-full'
                      src={'' ? require(`../img/adviser/${''}`) : 'https://i.imgur.com/b08hxPY.png'}
                      alt={selectOption}/>
                  </div>
                  <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                      <h2 className='text-2xl font-normal ml-6 '>Nombre</h2>
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
              {/* buttons to send the data */}
              <div className="ml-10 mt-16 mb-8 flex flex-row "  onClick={()=>setViewButton(false)}>
                <div className={`${showAlert ? "hidden" : "block"} ${hideCard || (userData.adviserId === null) ? "block" : "hidden"} `}  onClick={clickShowAlert}>
                  <Button type='submit' name='Asignar orientador/a' disabled={isEmpty}  />
                </div>
                <div className="hidden">.</div>
              </div> 
              <div className={viewButton ? "hidden" : "block"}>
                <div className="flex flex-row ml-10 relative bottom-10 items-center">
                    <Button type='submit'  name='Modificar orientador/a' disabled={isEmpty}  /> 
                    <div className="ml-4 underline">
                    <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
                    </div>
                </div>
              </div>
            </form> 
          </div>
        </div>
          
        {/* I show the data of the selected adviser */}
         <div  className={hideCard ? "hidden" : "block"}>
               <div className={userData.adviserId !==null ? "block" : "hidden"}>
                  <div className="c py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center  border-2 border-graybackground rounded-lg ">
                    <div className='w-[178px] h-[178px] flex justify-center items-center border-r-[1px] border-bordergray'>
                      <img className='w-[140px] h-[140px] rounded-full' 
                      src={userData.Adviser && userData.Adviser.avatar ? require(`../../../assets/adviser/${userData.Adviser && userData.Adviser.avatar}`) : 'https://i.imgur.com/b08hxPY.png'}
                      alt={selectOption}/>
                    </div>
                  <div className='laptop:max-w-[823px] h-[178px] ml-8  mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center'>
                    <div className=' mobile:mx-auto lap_tablet:mx-auto  tablet:mx-auto'>
                      <h2 className='text-2xl font-normal ml-6 '>{userData.Adviser && userData.Adviser.fullName}</h2>
                      <h4 className='text-[15px] leading-[22px]  ml-6 text-lightgray'>Orientador</h4>
                    </div>
                    <div className='flex flex-row  h-auto'>
                      <div className='max-w-1/2 pl-6 h-auto '>
                        <h5 className=' text-xs text-lightgray'>mail</h5>
                        <p className='w-auto h-auto text-[16pxpx] leading-[26px] text-blue flex justify-center items-center'>{userData.Adviser && userData.Adviser.email}</p>
                      </div>
                      <div className='max-w-1/2   pr-6'>
                       <h5 className=' text-xs text-lightgray'>Telefono</h5>
                       <p className=' text-[16pxpx] leading-[26px] text-blue '>{userData.Adviser && userData.Adviser.phoneNumber}</p>
                     </div>
                    </div>
                  </div>
                 </div>
               </div>
               {/* button "Volver" */}
              <div className={userData.adviserId !==null ? "block" : "hidden"} >
                <div className="flex flex-row ml-10 mt-16 relative bottom-10 items-center">
                <Button type='button' handleFunction={() => setHideCard(true)}  name='Modificar orientador/a'/>
                  <div className="ml-4 underline">
                   <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
                   </div>
                </div>
             </div>
        </div>
         {/* show alert */}
        <div className="mt-24 ml-10">
          <div className={!hideMessage ? "hidden" : "block"}> 
            {showAlert ? <Alert message='El orientado ya fue asignado a su referente.' onclick={() => setHideMessage(false)}/> : ''}
          </div>
        </div>
        </section>
      </main>
      </div>
    </div>
  )
}

export default AssignAdviserPage; 


