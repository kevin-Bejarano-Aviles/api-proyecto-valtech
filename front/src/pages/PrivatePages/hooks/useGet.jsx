import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function useGet(){
    const [listStudent,setListStudent]=useState([]);
    const [loading,setLoading]=useState('pending');
    const [studentDetail, setStudentDetail] = useState();
    const [errorMsgGetStudents,setErrorMsgGetStudents]=useState('');
    const [eventList,setEventsList]=useState([])
    const url=process.env.REACT_APP_API_URL;
    const baseUrl =`${url}/admin`;
    let token=localStorage.getItem('token');

    const getAllStudentsList = async () => {
        try{
            let options = {
                method: 'GET',
                headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
            };
            const response = await axios(`${baseUrl}/students`,options)
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
            setStudentDetail(response.data?.data.student)
        }
        catch(err){
            console.log(err);
        }
    }

    const getAllEvents=async()=>{
        try{
            let options = {
                method: 'GET',
                headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
            };
            const response = await axios(`${baseUrl}/events`,options)
            console.log(response);
            setEventsList(response.data?.data.events)
        }
        catch(err){
            console.log(err);
        }
    }

    return{
        getAllStudentsList,
        getOneStudent,
        getAllEvents,
        listStudent,
        studentDetail,
        eventList
    }
}


export default useGet;