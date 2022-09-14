import { useEffect, useState } from 'react';
import Oriented from './Oriented';
import axios from 'axios';

function OrientedList() {

  const [users, setUsers] = useState(null);

  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students');
      setUsers(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getAll();
  },[]);

  console.log(users);

  return (
    <ul>
      {
        !users ? 'Vacío' : (
          users.map(user => (
          <Oriented key={user.id} info={user} />
          ))
        )
      }
    </ul>
  )
}
export default OrientedList;