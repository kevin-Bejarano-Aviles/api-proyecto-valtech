import React from "react";
import Icon from '../img/vnegro.svg'
import Button from "./Button";

function Header() {
  return (
      <div className="bg-white h-[72px] flex items-center flex-row " >
        <img className="ml-[267px]" src={Icon} alt="icon" />
        <div className="ml-[577px]"><Button type="button" name="Ingresá a tu portal" /></div>
      </div>
  )
}

export default Header;