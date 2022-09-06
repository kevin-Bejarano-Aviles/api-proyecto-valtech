import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import OrientedList from "../components/OrientedList";


function HomePage() {

  return (
    <div>

      <h1 className="text-3xl ">¡Bienvenida, Susana!</h1>

      <Button  type="button" name="Agregar orientado"/>

      <OrientedList/>

      <Link to={"/"}/>

    </div>
  )
}

export default HomePage;
