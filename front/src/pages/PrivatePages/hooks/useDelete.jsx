import { useState,useEffect } from "react";
import axios from "axios";


function useDelete( ) {
    const url=process.env.REACT_APP_API_URL
    const [sumbitState,setSumbitState]=useState('')
    let token=localStorage.getItem('token');

    const deleteEvent=async (id)=>{
        setSumbitState('pending')
        try {
            let options = {
              method: 'DELETE',
              headers: { 'Content-Type': 'multipart/form-data'
                    ,"x-token":`Bearer ${token}`}
            };
            const response = await axios(`${url}/admin/events/${id}`, options);
            setSumbitState('accept')
      
          } catch (err) {
              setSumbitState('refuse')
            }
    }



    return {
        deleteEvent
    }

}

export default useDelete;