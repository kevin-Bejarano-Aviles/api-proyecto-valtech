import React from "react";

function Button({type,name,handleFunction}) {
  //hice que la funcion no este aun para que no afecte en el renderizado

  return (

    <div >
    <button className="h-10 w-[184px] rounded-lg flex justify-center items-center text-white font-medium text-base bg-greenbutton" /* faltaria la fuente */  type={type} onClick={handleFunction}>{name}</button>
   </div>

/*     <button className=" bg-sky-500 hover:bg-sky-700 text-white"  type={type}  onClick={handleFunction}>{nombre}</button> */
  

  )
}

export default Button;