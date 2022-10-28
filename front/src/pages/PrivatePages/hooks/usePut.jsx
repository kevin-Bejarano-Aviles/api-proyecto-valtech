import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../../../context/Context';

function usePut() {
  const [submitState, setSubmitState] = useState('pending');

  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const { logOut } = useContext(Context);
  const navigate = useNavigate();
  const LogOut = () => {
    logOut();
    navigate('/login', { replace: true });
  };
  const putCounselor = async (data, id) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: data,
      };
      const response = await axios(
        `${url}/admin/advisers/student/${id}`,
        options
      );
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };
  return {
    putCounselor,
  };
}

export default usePut;
