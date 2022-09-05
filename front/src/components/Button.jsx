import React from "react";

function Button({type,name,handleFunction}) {

  return (

    <>
      <button className="h-10 w-[184px] rounded-lg flex justify-center items-center text-white font-medium text-base bg-greenbutton" /* faltaria la fuente */  type={type} onClick={handleFunction}>{name}</button>
    </>
  

  )
}

export default Button;