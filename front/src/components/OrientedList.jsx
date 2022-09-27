import { useEffect, useState ,useContext} from 'react';
import Oriented from './Oriented';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Context from '../context/Context';

function OrientedList() {
  const navigate = useNavigate();

  const {deslogearme} = useContext(Context);


  const [users, setUsers] = useState([]);
  const [cantUsers,setCantusers]=useState(0);

  const [seeMore, setSeeMore] = useState(false);
  
  const login = ()=>{
    deslogearme()
    navigate('/login',{replace:true})
  }
  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/students/', {withCredentials: true});
      setUsers(response.data);
    } catch (error) {
      login();
      console.log(error)
    }
  };

  useEffect(() => {
    getAll();
  },[]);
  console.log(users.length);
  console.log('no hay orientados'+ users);

  return (
    <div>
      <ul className='grid mobile:grid-cols-1 lap_tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mt-8 mb-2 max-w-max'>
        {
          users.length===0 ? 'No hay orientados' : (
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
          {
            users.length===0 ? '' : (seeMore ? <p>Ver menos orientados</p> : <p>Ver mas orientados</p>)
          }
        </span>
        <div className={users.length===0 ? 'hidden' : 'relative -z-10 bottom-[11px] h-3 bg-yellow'}></div>
      </div>
      }
    </div>
  )
}
export default OrientedList;