import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import Oriented from "../components/Oriented";


function HomePage() {

  const Array = () => {
    const [persons] = useState([
  
    {
      'name':'Julián Martinez',
      'institution': 'Inst. Inmaculada',
      'image':'https://pbs.twimg.com/media/EUCh095XQAIXfbM.jpg'
    }
  ])}

  return (
    <div>

      <h1>¡Bienvenida, Susana!</h1>

      <Button type="button" nombre="Agregar orientado"/>

      {Array.map (person => {
        return <Oriented image={person.image} name={person.name} institution={person.institution} />
      })}

    </div>
  )
}

export default HomePage;
