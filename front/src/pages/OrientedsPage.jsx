import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import OrientedList from "../components/OrientedList";

function Orienteds() {
  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
         <Menu />
        <div>
          <HeaderAdmin Titulo={`Orientados`} />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
          <h2 className='flex items-center justify-center h-[32px] w-[305px] border-b-8 pt-5 border-backgroundGray text-2xl'>
               Nuevos usuarios a orientar
            </h2>
            <Link to={'/orientados/alta-orientado'}>
              <Button  type='button' name='Ingresar orientado'/>
            </Link>
          </div>

              <div className="relative mt-8">
              <Search placeholder={`Buscar orientado por nombre y apellido`}/>

              <OrientedList/>
              </div>
              
              









          
        </main>
      </div>
    </div>
  )
}

export default Orienteds;