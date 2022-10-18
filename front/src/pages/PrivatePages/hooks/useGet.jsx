import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function useGet(){
    const [listStudent,setListStudent]=useState([])
    const [errorMsgGetStudents,setErrorMsgGetStudents]=useState('')
    const url=process.env.REACT_APP_API_URL;
    const baseUrl =`${url}/admin/students`;
    let token=localStorage.getItem('token');

    const getAllStudentsList = async () => {
        try{
            let options = {
                method: 'GET',
                headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
            };
            const response = await axios(baseUrl,options)
            setListStudent(response.data.data.students)
        }
        catch(err){
            console.log(err);
        }
    }

    return{
        getAllStudentsList
    }

}

export default useGet;