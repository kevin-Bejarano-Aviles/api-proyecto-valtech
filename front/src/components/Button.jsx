import React from "react";

function Button({type,nombre,handleFunction}) {
  //hice que la funcion no este aun para que no afecte en el renderizado

  return (
    <button className=" bg-sky-500 hover:bg-sky-700 text-white"  type={type}  onClick={handleFunction}>{nombre}</button>
  
  )
}

export default Button;