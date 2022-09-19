import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import OrientedList from '../components/OrientedList';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import CardText from '../components/CardText';

function HomePage() {
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div className='grid grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo={`¡Bienvenida, ${admin.fullName}!`} />
        <main className='pb-12 mx-12 mt-[150px] max-w-max'>
          <div className='flex items-center justify-between'>
            <h4 className='flex items-center justify-center h-[58px] w-[187px] py-3 border-b-4 border-green'>
              Nuevos orientados
            </h4>
            <Link to={'/orientados/alta-orientado'}>
              <Button  type='button' name='Ingresar orientado'/>
            </Link>
          </div>
          <OrientedList/>
          <div className='mt-16'>
            <h2 className='mb-4 h-[26px] w-[135px] pb-3 border-b-8 text-2xl font-medium text-blue '>Novedades</h2>
            <div className='relative flex gap-4 cursor-pointer'>
              <CardText title='¿Usás inteligentemente tu tiempo?' />
              <CardText title='¿Estás todavía con dudas sobre qué carrera seguir?' />
              <CardText title='¿Qué querés aportar?' />
              <div className='absolute left-[968px] top-[102px] flex justify-center items-center w-12 h-12 text-xl border-2 border-blue rounded-full'>&#62;</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage;
