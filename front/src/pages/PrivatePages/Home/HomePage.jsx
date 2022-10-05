import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import OrientedList from '../../../components/OrientedList';
import HeaderAdmin from '../../../components/HeaderAdmin';
import Menu from '../../../components/Menu';
import CardText from './CardText';
import Context from '../../../context/Context';
import axios from 'axios';

function HomePage() {


  const admin = JSON.parse(localStorage.getItem('admin'));
  let adminFirstName = admin.fullName.split(' ')[0];

  const navigate = useNavigate();

  const {deslogearme} = useContext(Context);

  const [users, setUsers] = useState([]);

  
  const login = ()=>{
    deslogearme()
    navigate('/login',{replace:true})
  }
  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students/', {withCredentials: true});
      setUsers(response.data.students);
    } catch (error) {
      login();
    }
  };

  useEffect(() => {
    getAll();
  },[]);


  return (
    <div className='grid grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo={`¡Bienvenida, ${adminFirstName}!`} />
        <main className='max-w-max mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='flex-col gap-4 lap_tablet:flex-row flex items-center justify-between'>
            <h4 className='flex items-center justify-center h-[58px] w-[187px] py-3 border-b-4 border-green'>
              Nuevos orientados
            </h4>
            <Link to={'/orientados/alta-orientado'}>
              <Button  type='button' name='Ingresar orientado'/>
            </Link>
          </div>
          <OrientedList users={users}/>
          <div className='relative mt-16'>
            <h2 className='mb-4 h-[26px] w-[135px] pb-3 border-b-8 text-2xl font-medium text-blue '>Novedades</h2>
            <div className='grid-cols-1 lap_tablet:grid-cols-2 desktop:grid-cols-3 gap-4 cursor-pointer grid'>
              <CardText title='¿Usás inteligentemente tu tiempo?' />
              <CardText title='¿Estás todavía con dudas sobre qué carrera seguir?' />
              <CardText title='¿Qué querés aportar?' />
            </div>
            <div className='hidden lap_tablet:flex absolute top-[136px] -right-6 justify-center items-center w-12 h-12 text-xl border-2 border-blue rounded-full cursor-pointer'>&#62;</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage;