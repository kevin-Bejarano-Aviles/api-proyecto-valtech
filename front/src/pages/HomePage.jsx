import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import Oriented from "../components/Oriented";
import { Link } from "react-router-dom";


function HomePage() {

  const Array = () => {
    const [persons] = useState([

    {
      'name':'Julián Martinez',
      'institution': 'Inst. Inmaculada',
      'picture':'https://pbs.twimg.com/media/EUCh095XQAIXfbM.jpg'
    }
  ])}

  return (
    <div>

      <h1>¡Bienvenida, Susana!</h1>

      <Button type="button" nombre="Agregar orientado"/>

      {Array.map (person => {
        return <Oriented picture={person.picture} name={person.name} institution={person.institution} />
      })}

      <Link to={"/"}/>
    </div>
  )
}

export default HomePage;
