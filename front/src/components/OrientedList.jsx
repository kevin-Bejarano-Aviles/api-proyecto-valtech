import React from "react";
import { useEffect } from 'react';
import Oriented from "../components/Oriented";
import axios from 'axios';
import { useState } from "react";
function OrientedList() {
//PRIMER COMENTARIO
  //const [persons,setPersons] = useState([
    //{
      //name:'Julián Martinez',
      //institution: 'Inst. Inmaculada',
      //picture:'https://pbs.twimg.com/media/EUCh095XQAIXfbM.jpg'
    //}
  //])
//SEGUNDO COMENTARIO
  // state = {
  //   students: [],
  //   status: false
  // }
  // cargarStudents = () => {
  //   const url = Global.urlstudents;
  //   var request = "/students";
  //   axios.get(url + request).then(res =>{
  //     this.setState({
  //       students: res.data,
  //       status: true
  //     });
  //   });
  // }

const [users, setUsers] = useState();

const getAll = async () => {
  try {
    let res = await axios.get('http://localhost:8000/admin/students');
    let json = await res.data;
    setUsers(json);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getAll();
},[]);

  return (
    <ul>

      {
        users.map(user => <Oriented key={user.id} info={user} />)
      }
      {/* PRIMER COMENTARIO
      <ul>
      <li>
        {persons.map (person => {
        return <Oriented picture={person.picture} name={person.name} institution={person.institution} />
        })}
      </li>
      <li></li>
      </ul> */}
    {/* SEGUNDO COMENTARIO
    <Oriented></Oriented>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Institucion</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {this.state.status === true &&
            (
              this.state.students.map((student,i) => {
                return(
                  <tr key={i}>
                    <td>{student.name}</td>
                    <td>{student.institution}</td>
                    <td>{student.picture}</td>
                  </tr>
                );
              })
            )
            }
          </tbody>
        </table> */}
      
    </ul>
  )
}
export default OrientedList;