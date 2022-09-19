import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import OrientedList from "../components/OrientedList";
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';


function HomePage() {

  return (

    <div className="">
    <div className="flex flex-grow">
      <div>
    <Menu/>
    </div>
    <div>
    <HeaderAdmin Titulo='¡Bienvenida, Susana!'/>
    </div>
    </div>
    <div className="flex items-center absolute bottom-[540px] left-[230px]">
      <h4 className="h-14 w-48 px-7 py-3 ml-[46px] mx-[750px] border-b-4 border-green">Nuevos orientados</h4>
      <Link to={'/orientados/alta-orientado'}><Button  type="button" name="Ingresar orientado"/></Link>
    </div>
    <div className="relative bottom-[540px] left-[265px]">
    <OrientedList/>
    </div>
  <div>
    <h2 className='h-[26px] w-[135px] pb-3 border-b-8 text-2xl font-medium text-blue '>Novedades</h2>
    <div className="flex flex-row items-start gap-[24px]">
    <div className='h-[252px] w-[320px] relative top-5 rounded-lg border-[1px] border-slate-300 drop-shadow-[0_0_10px_rgba(135,152,173,0.1)] p-[32px] '>
        <h3 className=' text-blue w-[245px] text-[24px] leading-[29px] font-bold relative top-4 ml-auto mr-auto font-Rubik'>¿Usás inteligentemente tu tiempo?</h3>
        <p className='h-16 ml-auto mr-auto w-[251px] relative top-8 text-slate-400 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className='h-4 w-[61px] pb-3 border-b-8 border-yellow underline relative top-5'> <Link to='/'>Ver más</Link></div>
    </div>
    <div className='h-[252px] w-[320px] relative top-5 rounded-lg border-[1px] border-slate-300 drop-shadow-[0_0_10px_rgba(135,152,173,0.1)] p-[32px]'>
        <h3 className=' text-blue w-[245px] text-[24px] leading-[29px] font-bold relative top-4 ml-auto mr-auto font-Rubik'>¿Estás todavía con dudas sobre qué carrera seguir?</h3>
        <p className='h-16 ml-auto mr-auto w-[251px] relative top-8 text-slate-400  '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className='h-4 w-[61px] pb-3 border-b-8 border-yellow underline relative top-5'> <Link to='/'>Ver más </Link></div>
    </div>
    <div className="h-[252px] w-[320px] relative top-5 rounded-lg border-[1px] border-slate-300 drop-shadow-[0_0_10px_rgba(135,152,173,0.1)] p-[32px]">
        <h3 className=' text-blue w-[245px] text-[24px] leading-[29px] font-bold relative top-4 ml-auto mr-auto font-Rubik'>¿Qué querés aportar?</h3>
        <p className='h-16 ml-auto mr-auto w-[251px] relative top-8 text-slate-400 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className='h-4 w-[61px] pb-3 border-b-8 border-yellow underline relative top-5'> <Link to='/'>Ver más</Link></div>
    </div>
    </div>
    </div>
  </div>

  )
}

export default HomePage;
