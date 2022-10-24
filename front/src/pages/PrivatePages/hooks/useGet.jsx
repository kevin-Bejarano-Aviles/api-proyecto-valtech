import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Context from "../../../context/Context";
import axios from "axios";


function useGet(){

    const url=process.env.REACT_APP_API_URL;
    const baseUrl =`${url}/admin`;
    let token=localStorage.getItem('token');

    const { logOut } = useContext(Context);

    const [studentList,setStudentList]=useState([]);
    const [loading,setLoading]=useState('pending');
    const [studentDetail, setStudentDetail] = useState();
    const [errorMsgGetStudents,setErrorMsgGetStudents]=useState('');
    const [eventList,setEventsList]=useState([]);
    const [adviserList,setAdviserList]=useState([]);
    const navigate = useNavigate();

    const options= {
        method: 'GET',
        headers: { 'Content-Type': 'multipart/form-data'
        ,"x-token":`Bearer ${token}`},
    };
    
    const LogOut = () => {
        logOut();
        navigate('/login', { replace: true })
    }

    const getAllStudents = async () => {
        try{
            
            const response = await axios(`${baseUrl}/students`,options);
            setStudentList(response.data?.data.students);
        }
        catch(err){
            let status=err.response.status;
            if(status===401){
                LogOut();
            }
        }
    };

    const getOneStudent = async(id)=>{
       try{
            const response = await axios(`${baseUrl}/students/${id}`,options)
            setStudentDetail(response.data?.data.student)
        }
        catch(err){
            let status=err.response.status;
            if(status===401){
                LogOut();
            }
        }
    };

    const getAllEvents=async()=>{
        try{
            const response = await axios(`${baseUrl}/events`,options);
            setEventsList(response.data?.data.events)
        }
        catch(err){
            let status=err.response.status;
            if(status===401){
                LogOut();
            }
        }
    };

    const getAllAdvisers = async () => {
        try{
            const response = await axios(`${baseUrl}/advisers`,options);
            setAdviserList(response.data?.data.advisers)
        }
        catch (err) {
            let status=err.response.status;
            if(status===401){
                LogOut();
            }        }
    };

    const getLastStudentAndRedirect= async() => {
      try{
        const response = await axios(`${baseUrl}/students`,options);
        let detailStudent=await response.data.data.students;
        let lastUserId = detailStudent[detailStudent.length-1].id;
          setTimeout(() => {
              navigate(`/orientados/${lastUserId}`);
            },5000);
      }
      catch(err){
        let status=err.response.status;
        if(status===401){
            LogOut();
        }      
        }
  
    };

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