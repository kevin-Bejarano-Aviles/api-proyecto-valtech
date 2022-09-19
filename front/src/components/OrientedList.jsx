import { useEffect, useState } from 'react';
import Oriented from './Oriented';
import axios from 'axios';

function OrientedList() {

  const [users, setUsers] = useState(null);

  const [viewBottom, SetviewBottom] = useState(false);

  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students', {withCredentials: true});
      setUsers(response.data);
      if(users.length > 9){
        SetviewBottom(true)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getAll();
  },[]);

  console.log(users);

  return (
    <>
    <ul>
      {
        !users ? 'No hay orientados' : (
          users.map(user => (
          <Oriented info={user}/> 
          ))
        )
      }
    </ul>
    {viewBottom && 
      <h6 className="h-4 w-[145px] pb-3 ml-[10px] border-b-8 border-yellow underline">Ver más orientados</h6>
    }
    </>
  )
}
export default OrientedList;