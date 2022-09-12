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
      <Menu/>
      <HeaderAdmin Titulo='¡Bienvenida, Susana!'/>
      </div>

      <div className="flex items-center my-3 ">
        <h4 className="h-16 w-48 bg- px-7 py-5 ml-[46px] mx-[750px] border-b-4 border-green">Nuevos orientados</h4>
        <Button  type="button" name="Ingresar orientado"/>
      </div>


      <OrientedList/>
      <Link to={"/inicio"}/>
    </div>
  )
}

export default HomePage;
