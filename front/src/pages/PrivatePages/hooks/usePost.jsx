import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useGet from "./useGet";


function usePost(){
    const {getLastStudentAndRedirect} =useGet();
    const navigate = useNavigate();
    const url=process.env.REACT_APP_API_URL
    const [errorSignUpObject,seteErrorSignUpObject]=useState({});
    const [navigationStateStudent,setNavigationStateStudent]=useState('');
    const [navigationStateEvent,setNavigationStateEvent]=useState('')
    const [sumbitState,setSumbitState]=useState('')
    const [errorCreateEventList,setErrorCreateEventList]=useState(null);
    let token=localStorage.getItem('token')

    const postStudent = async (data) => {
      setNavigationStateStudent('pending')
		try {
		  let options = {
			  method: 'POST',
			  headers: { 'Content-Type': 'multipart/form-data'
              ,"x-token":`Bearer ${token}`},
			  withCredentials: true,
			  data: data
		  };
		  const response = await axios(`${url}/admin/students`, options);
        setNavigationStateStudent('accept')

		} catch (err) {
            seteErrorSignUpObject(err.response?.data.data.errors)
            setNavigationStateStudent('reject')
        }
	  }

    const postEvent = async (values) => {
      setSumbitState('pending')
      try {
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8'
          ,'x-token':`Bearer ${token}`},
          data: values,
        };
        const response = await axios(`${url}/admin/events`, options);
        navigate('/eventos');
        setSumbitState('accept')
      } catch (err) {
        console.error(`${err.response.status}: ${err.response.statusText}`);
        setSumbitState('reject')
      }
    };

    useEffect(()=>{
    if(navigationStateStudent==='accept'){
      getLastStudentAndRedirect();
      setNavigationStateStudent('')
    }
    },[navigationStateStudent])

    useEffect(()=>{
      if(navigationStateEvent==='accept'){
          setSumbitState('')
      }
    },[navigationStateEvent])

 
    return {
        postEvent ,
        postStudent,
        errorSignUpObject,
        errorCreateEventList
    }
}

export default usePost;