import React from 'react';

function Button({type,name,handleFunction,disabled=false,classN=false}) {
  let size = classN ?'text-xl tablet:text-lg tablet:h-10 tablet:w-[184px] h-16 w-[200px]' : 'h-10 w-[184px]' 
  let claseButon= ` rounded-lg flex justify-center items-center text-white font-medium  bg-green ${size}`
  return (
    <>
      <button className={`${claseButon} ${disabled===true && 'disabled:bg-disabledbutton'}`} type={type} onClick={handleFunction} disabled={disabled}>{name}</button>
    </>
  )
}

export default Button;