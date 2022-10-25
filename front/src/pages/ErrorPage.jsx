import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Header from './sharedComponents/HeaderPublic';
import Footer from './sharedComponents/Footer';
import ImgError from '../assets/ilustration/error/ImgError.svg';
import Proposal from './sharedComponents/Proposal';

export default function ErrorPage() {
  const { state } = useContext(Context);

  return (
    <div className='bg-white'>
      <header>
        <Header />
      </header>
      <div className='bg-imgheader h-[553px] w-full flex flex-col '>
        <img
          className='mt-[19px] h-[390px] w-[390px] ml-auto mr-auto'
          src={ImgError}
          alt='Error'
        />
        <h1 className='mt-[17px] text-center tablet:mx-auto text-3xl font-normal text-blue'>
          No encontramos la página que estás buscando
        </h1>
        <h2 className='mt-3.5 mx-auto text-center tablet:mx-0  font-normal text-blue text-xl tablet:text-2xl'>
          Prueba buscando en la
          <Link
            to={!state ? '/' : '/inicio'}
            className='text-green font-bold ml-2'
          >
            página de inicio
          </Link>
        </h2>
      </div>
      <Proposal />
      <Footer />
    </div>
  );
}
