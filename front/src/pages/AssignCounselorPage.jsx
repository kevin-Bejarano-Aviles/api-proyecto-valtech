import { React, useEffect, useState }  from "react";
import Menu from '../components/Menu';
import HeaderAdmin from '../components/HeaderAdmin';
import AssingComponente from '../components/AssignComponent'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import AssignOriented from "../components/AssignOriented";

function AssignCounselorPage() {
  const [oriented, setOriented] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate();

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
         
        <select   onChange={()=>setIsVisible(true)}   className="mt-2 ml-10 mobile:max-w-[320px] tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400  border-2" name="orientador" id="" >
        <option selected hidden value=''>Seleccionar orientador</option>
            {oriented.map (elemento=>(
             <option key={elemento.id} value={elemento.id} >{elemento.fullName}</option>
            ))}
        </select>
        <div  className={isVisible ? "block" : "hidden"}>
          <AssignOriented/>
        </div>
         </seccion>
      
      </main>
      </div>

    </div>
  )
}

export default AssignCounselorPage;