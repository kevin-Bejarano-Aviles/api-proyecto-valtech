import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/HeaderPublic';
import Banner from '../components/Banner';

function Welcome() {
  return (
    <div>
      <Header/>
      <Banner/>
      <div className='w-full flex justify-center items-center h-80 mobile:h-auto mobile:p-2.5'>
        <div className='mt-10 ml-5 tablet:mx-0 tablet:w-3/5  text-blue pb-2'>
          <h1 className='pb-2 text-blue font-bold text-xl'>Misión</h1>
          <p className='pb-2 text-lg	'>Acompañamos a las personas en sus procesos de transformación personal y profesional para que logren construir una vida con sentido </p>        
          <p className='pb-2 font-bold py-5'> Quienes viven la experiencia V_Camp aprenden a:</p>        
          <ul className='pl-4'>
            <li className='list-disc text-colorList'>
              <span><p className='text-lg text-blue'>
                Conocerse, Valorarse y hacerse cargo de su potencial.
              </p></span>
              
            </li>

            <li className='list-disc	text-colorList'>
              <span><p className='text-lg text-blue'>Construir su proposito.</p></span>
            </li>

            <li className='list-disc	text-colorList'>
              <span>
                <p className='text-blue text-lg'>Crear su propia carrera personalprofesional.
              </p>
              </span>
              
            </li>
          </ul>
        </div>
      </div>
      {/* aca iria lo de la propuesta */}
      <div className='w-full flex flex-col justify-center items-center h-44 mobile:h-64'>
          <p className='text-blue font-medium font mobile:text-[22px] tablet:text-[32px]'>Viví tu transformación personal.</p>
          <p className='text-blue font-bold mx-auto text-center text-[28px]	tablet:text-[44.8px]'>Viví tu experiencia V_Camp.</p>
        </div>
      <Footer/>
    </div>
  )
}

export default Welcome;