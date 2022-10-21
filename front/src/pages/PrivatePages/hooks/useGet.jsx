import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function useGet(){
    const [studentList,setStudentList]=useState([]);
    const [loading,setLoading]=useState('pending');
    const [studentDetail, setStudentDetail] = useState();
    const [errorMsgGetStudents,setErrorMsgGetStudents]=useState('');
    const [eventList,setEventsList]=useState([]);
    const [adviserList,setAdviserList]=useState([]);
    const navigate = useNavigate();
    const url=process.env.REACT_APP_API_URL;
    const baseUrl =`${url}/admin`;
    let token=localStorage.getItem('token');

    const getAllStudents = async () => {
        try{
            let options = {
                method: 'GET',
                headers: { 'Content-Type': 'multipart/form-data'
                ,"x-token":`Bearer ${token}`},
            };
            const response = await axios(`${baseUrl}/students`,options);
            setStudentList(response.data?.data.students);
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
            const response = await axios(`${baseUrl}/students/${id}`,options)
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
            const response = await axios(`${baseUrl}/events`,options);
            setEventsList(response.data?.data.events)
            console.log(response.data?.data.events);
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
            const response = await axios(`${baseUrl}/advisers`,options);
            setAdviserList(response.data?.data.advisers)
        }
        catch (err) {
            console.error(`${err.response.status}: ${err.response.statusText}`);
        }
    }

    const getLastStudentAndRedirect= async() => {
      try{
        let options = {
                        method: 'GET',
                        headers: { 'Content-Type': 'multipart/form-data'
                        ,"x-token":`Bearer ${token}`},
                    };
        console.log('llama a la funcion');
        const response = await axios(`${baseUrl}/students`,options);
        console.log(response.data.data.students);
        let detailStudent=await response.data.data.students;
        let lastUserId = detailStudent[detailStudent.length-1].id;
          setTimeout(() => {
              navigate(`/orientados/${lastUserId}`);
            },5000);
      }
      catch(err){
          console.log(err);
      }
  
    }

    return{
        getAllStudents,
        getOneStudent,
        getAllEvents,
        getAllAdvisers,
        getLastStudentAndRedirect,
        studentList,
        studentDetail,
        eventList,
        adviserList
    }

}


export default useGet