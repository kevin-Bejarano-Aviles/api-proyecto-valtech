import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function useGet(){
    const [listStudent,setListStudent]=useState([]);
    const [loading,setLoading]=useState('pending')
    const [studentDeatil, setStudentDeatil] = useState();
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
            setListStudent(response.data?.data.students)
        }
        catch(err){
            console.log(err);
        }
    }

    const getOneStudent = async(id)=>{
       try{
            let options = {
                method: 'GET',
                headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
            };
            const response = await axios(`${baseUrl}/${id}`,options)
            setStudentDeatil(response.data?.data.student)
            console.log(response.data?.data.student);
        }
        catch(err){
            console.log(err);
        }
    }

    return{
        getAllStudentsList,
        getOneStudent,
        listStudent,
        studentDeatil
    }
}


export default useGet;