import { useEffect, useState } from "react";
import axios from "axios";

function usePut() {
    const [submitState,setSubmitState]=useState('pending')

    const url=process.env.REACT_APP_API_URL;
    const baseUrl =`${url}/admin`;
    const token=localStorage.getItem('token');
    const putCounselor=async(data,id)=>{
        try {
          let options = {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data'
                  ,"x-token":`Bearer ${token}`},
            withCredentials: true,
            data: data
          };
          const response = await axios(`${url}/admin/advisers/student/${id}`, options);
          setSubmitState('accept')
    
        } catch (err) {
            setSubmitState('refuse')
            console.log(err);
          }
      }
      return {
        putCounselor
      }

}

export default usePut;