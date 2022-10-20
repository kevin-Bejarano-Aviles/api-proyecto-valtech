import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function useGet(){
    const [listStudent,setListStudent]=useState([]);
    const [loading,setLoading]=useState('pending');
    const [studentDetail, setStudentDetail] = useState();
    const [errorMsgGetStudents,setErrorMsgGetStudents]=useState('');
    const [eventList,setEventsList]=useState([]);
    const [adviserList,setAdviserList]=useState([]);

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
            setEventsList(response.data?.data.events)
        }
        catch(err){
            console.log(err);
        }
    }

    const getAllAdvisers = async () => {
        try{
            let options = {
                method: 'GET',
                headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
            };
            const response = await axios(`${baseUrl}/advisers`,options)
            console.log(response);
            setAdviserList(response.data?.data.advisers)
        }
        catch (err) {
        console.error(`${err.response.status}: ${err.response.statusText}`);
        }
    }

    return{
        getAllStudentsList,
        getOneStudent,
        getAllEvents,
        getAllAdvisers,
        listStudent,
        studentDetail,
        eventList,
        adviserList
    }

}


export default useGet