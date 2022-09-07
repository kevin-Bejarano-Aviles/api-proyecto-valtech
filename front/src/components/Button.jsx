import React from "react";

function Button({type,name,handleFunction,disabled=false}) {
  let claseButon= "h-10 w-[184px] rounded-lg flex justify-center items-center text-white font-medium  bg-greenbutton"
  return (

    <>
      <button className={`${claseButon} ${disabled===true && 'disabled:bg-emerald-400	'}`} type={type} onClick={handleFunction} disabled={disabled}>{name}</button>

    </>
  

  )
}

export default Button;