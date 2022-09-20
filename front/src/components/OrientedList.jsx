import { useEffect, useState } from 'react';
import Oriented from './Oriented';
import axios from 'axios';

function OrientedList() {
  const [cantUsers,setCantusers]=useState(0);

  const [users, setUsers] = useState(null);

  const [seeMore, setSeeMore] = useState(false);

  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students', {withCredentials: true});
      setUsers(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getAll();
  },[]);


  return (
    <div>
      <ul className='grid mobile:grid-cols-1 lap_tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mt-8 mb-2 max-w-max'>
        {
          !users ? 'No hay orientados' : (
            users.map((user, index) => (
              index <= 8 ? <Oriented info={user}/> : seeMore ? <Oriented info={user}/> : ''
            ))
          )
        }
      </ul>
      {      
      <div className='max-w-max'>
        <span
          className='ml-2 h-4 max-w-max underline cursor-pointer'
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? 'Ver menos orientados' : 'Ver más orientados'}
        </span>
        <div className='relative -z-10 bottom-[11px] h-3 bg-yellow'></div>
      
      </div>
      }
    </div>
  )
}
export default OrientedList;