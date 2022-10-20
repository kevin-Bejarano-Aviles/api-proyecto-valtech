import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";



function usePost(){
  const navigate = useNavigate();
    const url=process.env.REACT_APP_API_URL
    const baseUrl= `${url}/admin/students`;
    const [errorSignUpObject,seteErrorSignUpObject]=useState({});
    const [navigationStateStudent,setNavigationStateStudent]=useState('pending');
    const [navigationStateEvents,setNavigationStateEvent]=useState('pending')

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
        console.log(response);
        setNavigationStateStudent('accept')

		} catch (err) {
            seteErrorSignUpObject(err.response?.data.data.errors)
            setNavigationStateStudent('refuse')
        }
	  }

    const postEvent =async (data)=>{
      try {
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
          withCredentials: true,
          data: data
        };
        const response = await axios(`${url}/admin/events`, options);
          console.log(response);
          setNavigationStateEvent('accept')
  
      } catch (err) {
              seteErrorSignUpObject(err.response?.data.data.errors)
              setNavigationStateEvent('refuse')
          }

    }

    useEffect(()=>{
    if(navigationState==='accept'){
      redirectionDetailStudent();
      setNavigationState('pending')
    }
    },[navigationStateStudent])

    useEffect(()=>{

    },[])

    return {
        postEvent ,
        postStudent,
        errorSignUpObject
    }
}

export default usePost;