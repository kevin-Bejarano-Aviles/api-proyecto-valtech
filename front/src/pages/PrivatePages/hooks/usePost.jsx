import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";




function usePost(){
    const url=process.env.REACT_APP_API_URL
    const [errorSignUpObject,seteErrorSignUpObject]=useState({});
    const [errorCreateEventList,setErrorCreateEventList]=useState(null);
    let token=localStorage.getItem('token')

    const redirectionDetailStudent = async () => {
      const navigate = useNavigate();
      console.log('se esta redireccionando');
      try{
          let options = {
              method: 'GET',
              headers: { 'Content-Type': 'multipart/form-data'
              ,"x-token":`Bearer ${token}`},
          };
          const response = await axios(`${url}/admin/students`,options)
          const detailStudent=await response.data.data.students;
          const lastUserId = detailStudent[detailStudent.length-1].id;
          setTimeout(() => {
              navigate(`/orientados/${lastUserId}`);
            },8000);
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
        //   Lllamar redirection
        redirectionDetailStudent()

		} catch (err) {
            seteErrorSignUpObject(err.response.data.data.errors)
        }
	  }
    return {
        postStudent,
        errorSignUpObject
    }
}

export default usePost;