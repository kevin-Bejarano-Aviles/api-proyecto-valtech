import React from "react";
import Icon from '../img/vnegro.svg'
import Button from "./Button";

function Header() {
  return (
    <div className="bg-green-400 h-80">
      <header className="bg-white h-[72px] flex items-center flex-row " >
        <img className="ml-[267px]" src={Icon} alt="icon" />
        <div className="ml-[577px]"><Button type="button" name="Ingresá a tu portal" /></div>
      </header>
    </div>
  )
}

export default Header;