import axios from 'axios';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context/Context';

function useDelete() {
  const url = process.env.REACT_APP_API_URL;
  const [submitState, setSubmitState] = useState('');
  const token = localStorage.getItem('token');

  const { logOut } = useContext(Context);
  const navigate = useNavigate();

  const LogOut = () => {
    logOut();
    navigate('/login', { replace: true });
  };

  const deleteEvent = async (id) => {
    setSubmitState('pending');
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': `Bearer ${token}`,
        },
      };

      const response = await axios(`${url}/admin/events/${id}`, options);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };

  return {
    deleteEvent
  };
}

export default useDelete;
