import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../../../context/Context';

function usePut() {
  const [submitState, setSubmitState] = useState('pending');

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const { logOut } = useContext(Context);
  const navigate = useNavigate();
  const LogOut = () => {
    logOut();
    navigate('/login', { replace: true });
  };
  const assignAdviser = async (idAdviser,idStudent) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: idAdviser,
      };
      const response = await axios(
        `${baseUrl}/admin/student/${idStudent}/adviser`,
        options
      );
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  }; 
  return {
    assignAdviser
  };
}

export default usePut;
