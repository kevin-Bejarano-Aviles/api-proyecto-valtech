import React from "react";

function Button({type,name,handleFunction,disabled=false}) {

  return (

    <>
      <button className="h-10 w-[184px] rounded-lg flex justify-center items-center text-white font-medium  bg-greenbutton" /* faltaria la fuente */  type={type} onClick={handleFunction} disabled={disabled}>{name}</button>
    
    </>
  

  )
}

export default Button;