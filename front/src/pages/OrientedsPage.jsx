import React, { useContext, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Menu from "../components/Menu";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import OrientedList from "../components/OrientedList";
import { useState } from "react";
import Context from '../context/Context';
import axios from "axios";


//see orientedList
function Orienteds() {

  const navigate = useNavigate();

  const {deslogearme} = useContext(Context);

  const [usersList, setUsers] = useState([]);

  const [search,SetSearch] = useState('');

  const [showAll, setShowAll] = useState(true);


  const login = ()=>{
    deslogearme()
    navigate('/login',{replace:true})
  }
  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students/', {withCredentials: true});
      setUsers(response.data);
    } catch (error) {
      login();
      console.log(error)
    }
  };
  const handleSearch = (event)=>{
		//si el input esta vacio que muestre uno que cumpla con los criterios caso contrario mensaje de no se encontro el mensaje 
		SetSearch(event.target.value)
		if (search.length>1) {
		  setShowAll(false)
		}
		else{
		  setShowAll(true)
		}
	}

  useEffect(() => {
    getAll();
  },[]);

  let users = showAll ? usersList : usersList.filter(user=>(user.fullName.toLowerCase()).includes(search.toLowerCase()));

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
         <Menu />
        <div>
          <HeaderAdmin Titulo={`Orientados`} />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
          <div>
          <h2 className='flex items-center justify-center h-[32px] w-[305px] border-b-8 pt-5 border-backgroundGray text-2xl'>
               Nuevos usuarios a orientar
            </h2>
            </div>
            <div className="w-full flex justify-end py-3">
            <Link to={'/orientados/alta-orientado'}>
              <Button  type='button' name='Ingresar orientado'/>
            </Link>
            </div>
          </div>

              <div className="relative mt-8">
              <Search placeholder={`Buscar orientado por nombre y apellido`} handleChange={handleSearch}/>
              
              <OrientedList asignOriented={true} users={users}/>
              </div>
              
        </main>
      </div>
    </div>
  )
}

export default Orienteds;