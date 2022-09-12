import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import {Outlet} from 'react-router-dom'
function Orienteds() {
  return (
    <div>
          <HeaderAdmin Titulo={<Outlet/>} />
    </div>
  )
}

export default Orienteds;