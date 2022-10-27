import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../../../context/Context';

function useLoginAdmin() {
  const url = process.env.REACT_APP_API_URL;
  const baseUrl = `${url}/admin/auth/login`;
  const navigate = useNavigate();
  const { logIn } = useContext(Context);
  const login = () => {
    logIn();
    navigate('/login', { replace: true });
  };
  const [error, setErrorrMessage] = useState(null);
  const postAdmin = async (data) => {
    await axios
      .post(baseUrl, {
        email: data.email,
        pass: data.pass,
      })
      .then((response) => {
        login();
        localStorage.setItem('admin', JSON.stringify(response.data.data.admin));
        localStorage.setItem('token', response?.data.data.token);
      })
      .catch((error) => {
        console.log(error);
        setErrorrMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setErrorrMessage('');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    postAdmin,
    error,
  };
}

export default useLoginAdmin;
