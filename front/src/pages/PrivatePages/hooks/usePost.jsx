import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";



function usePost(){
  const navigate = useNavigate();
    const url=process.env.REACT_APP_API_URL
    const baseUrl= `${url}/admin/students`;
    const [errorSignUpObject,seteErrorSignUpObject]=useState({});
    const [navigationState,setNavigationState]=useState('pending')
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
		  const response = await axios(`${url}/admin/students`, options);
        console.log(response);
        setNavigationState('accept')

		} catch (err) {
            seteErrorSignUpObject(err.response?.data.data.errors)
            setNavigationState('refuse')
        }
	  }

    useEffect(()=>{
    if(navigationState==='accept'){
      redirectionDetailStudent();
    }
    },[navigationState])

    return {
        postStudent,
        errorSignUpObject
    }
}

export default usePost;