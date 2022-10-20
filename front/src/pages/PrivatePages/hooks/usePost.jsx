import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import useGet from "./useGet";


function usePost(){
    const navigate = useNavigate();
    const url=process.env.REACT_APP_API_URL
    const baseUrl= `${url}/admin/students`;
    const [errorSignUpObject,seteErrorSignUpObject]=useState({});
    const [navigationStateStudent,setNavigationStateStudent]=useState('pending');
    const [navigationStateEvent,setNavigationStateEvent]=useState('pending')
    const [sumbitState,setSumbitState]=useState('pending')
    const [errorCreateEventList,setErrorCreateEventList]=useState(null);
    let token=localStorage.getItem('token')

    const redirectionDetailStudent = async () => {
      try{
          let options = {
              method: 'GET',
              headers: { 'Content-Type': 'multipart/form-data'
              ,"x-token":`Bearer ${token}`},
          };
          const response = await axios(baseUrl,options)
          const detailStudent=await response.data.data.students;
          const lastUserId = detailStudent[detailStudent.length-1].id;
          setTimeout(() => {
              navigate(`/orientados/${lastUserId}`);
            },5000);
      }
      catch(err){
          console.log(err);
      }
  }

    const postStudent = async (data) => {
		try {
		  let options = {
			  method: 'POST',
			  headers: { 'Content-Type': 'multipart/form-data'
              ,"x-token":`Bearer ${token}`},
			  withCredentials: true,
			  data: data
		  };
		  const response = await axios(baseUrl, options);
        setNavigationStateStudent('accept')

		} catch (err) {
            seteErrorSignUpObject(err.response?.data.data.errors)
            setNavigationStateStudent('refuse')
        }
	  }

    const postEvent = async (values) => {
      try {
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8'
          ,'x-token':`Bearer ${token}`},
          data: values,
        };
        const response = await axios(`${url}/admin/events`, options);
        navigate('/eventos');
      } catch (err) {
        console.error(`${err.response.status}: ${err.response.statusText}`);
      }
    };

 

    useEffect(()=>{
    if(navigationStateStudent==='accept'){
      redirectionDetailStudent();
      setNavigationStateStudent('pending')
    }
    },[navigationStateStudent])

    useEffect(()=>{
      if(navigationStateEvent==='accept'){
          setNavigationStateEvent('´pending')
      }
    },[navigationStateEvent])

 
    return {
        postEvent ,
        postStudent,
        putCounselor,
        errorSignUpObject,
        errorCreateEventList
    }
}

export default usePost;