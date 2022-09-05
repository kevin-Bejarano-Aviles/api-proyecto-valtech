import React from "react";

function Button({type,nombre,handleFunction}) {
  //hice que la funcion no este aun para que no afecte en el renderizado

  return (
    <div className="bg-green-500">
    <button  type={type} onClick={handleFunction}>{nombre}</button>
  </div>
  )
}

export default Button;