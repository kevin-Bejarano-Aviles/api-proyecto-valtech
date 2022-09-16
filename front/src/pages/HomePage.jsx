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
      <HeaderAdmin Titulo='¡Bienvenida, Susana!'/> </div>
      </div>
      <div className="flex items-center absolute bottom-[540px] left-[230px]">
        <h4 className="h-14 w-48 px-7 py-3 ml-[46px] mx-[750px] border-b-4 border-green">Nuevos orientados</h4>
        <Link to={'/orientados/alta-orientado'}><Button  type="button" name="Ingresar orientado"/></Link>
      </div>
      <div className="relative bottom-[540px] left-[265px]  ">
      <OrientedList/>
      <h6 className="h-4 w-[145px] pb-3 ml-[10px] border-b-8 border-yellow underline">Ver más orientados</h6>
      </div>
    </div>
  )
}

export default HomePage;
