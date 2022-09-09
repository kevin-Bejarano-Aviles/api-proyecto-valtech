import React from "react";
import Oriented from "../components/Oriented";
import { useState } from "react";

function OrientedList() {

  const [persons,setPersons] = useState([
    {
      name:'Julián Martinez',
      institution: 'Inst. Inmaculada',
      picture:'https://pbs.twimg.com/media/EUCh095XQAIXfbM.jpg'
    }
  ])

  return (
    <div>

      <ul>

      <li>
        {persons.map (person => {
        return <Oriented picture={person.picture} name={person.name} institution={person.institution} />
        })}
      </li>

      <li></li>
       
      </ul>

    </div>
  )
}
export default OrientedList;
