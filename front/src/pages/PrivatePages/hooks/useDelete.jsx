import { useState, useEffect } from 'react';
import axios from 'axios';

function useDelete() {
  const url = process.env.REACT_APP_API_URL;
  const [submitState, setSubmitState] = useState('');
  const token = localStorage.getItem('token');

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
      setSubmitState('accept');
    } catch (err) {
      setSubmitState('refuse');
    }
  };

  return {
    deleteEvent,
  };
}

export default useDelete;
