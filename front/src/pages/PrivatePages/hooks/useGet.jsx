import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Context from "../../../context/Context";


function useGet(){

    const url=process.env.REACT_APP_API_URL;
    const baseUrl =`${url}/admin`;
    const token=localStorage.getItem('token');
    const { logOut } = useContext(Context);

    const [studentList,setStudentList]=useState([]);
    const [eventList,setEventsList]=useState([]);
    const [adviserList,setAdviserList]=useState([]);
    const [studentDetail, setStudentDetail] = useState();
    const [initRange,setInitRange]=useState(0);
    const [totalEventPages,seTotalEventPages]=useState(0);
    const [totalEventsShow,setTotalEventshow]=useState(0);

    const [loading,setLoading]=useState('pending');
    const [errorMsg,setErrorMsg]=useState('');

    const navigate = useNavigate();

    const calculateTotalPages = (totalEvent)=>{
        let totalPages=0
        let restEvents=0
        let total=totalEvent;
        while(total>10){
          if(total>10){
            totalPages+=1
          }
          total-=10;
          restEvents=totalPages;
        }
        if(restEvents===0 && total>0){
          totalPages += 1;
        }
        else if(restEvents>0){
          totalPages += 1;
        }
        seTotalEventPages(totalPages);
    }


    const LogOut = () => {
        logOut();
        navigate('/login', { replace: true })
    }

    const options= {
        method: 'GET',
        headers: { 'Content-Type': 'multipart/form-data'
        ,"x-token":`Bearer ${token}`},
    };
    
    const getAllStudents = async () => {
        try{
            const response = await axios(`${baseUrl}/students`,options);
            setStudentList(response.data?.data.students);
        }
        catch(err){
            const {status}=err.response;
            if(status===401){
                LogOut();
            }
        }
    };

    const getOneStudent = async(id)=>{
       try{
            const response = await axios(`${baseUrl}/students/${id}`,options)
            setStudentDetail(response.data?.data.student)
            console.log((response.data?.data.student))
        }
        catch(err){
            const {status}=err.response;
            if(status===401){
                LogOut();
            }
        }
    };

    const getAllEvents=async(range)=>{
        try{
            if(range>5){
                setInitRange(range)
            }
            const response = await axios(`${baseUrl}/events?from=${initRange}`,options);
            setEventsList(response.data?.data.events)
            // totalCount: 10, lengthEventsSent:
            const  {totalCount,lengthEventsSent}= response.data.data;
            calculateTotalPages(totalCount);
        }
        catch(err){
            const {status}=err.response;
            if(status===401){
                LogOut();
            }
        }
    };

    // const getAllEventsByFilter=async()=>{
    //     try{

    //     }
    //     catch{
            
    //     }
    // }

    const getAllAdvisers = async () => {
        try{
            const response = await axios(`${baseUrl}/advisers`,options);
            setAdviserList(response.data?.data.advisers)
        }
        catch (err) {
            const status=err.response.status;
            if(status===401){
                LogOut();
            }        
        }
    };

    const getLastStudentAndRedirect= async() => {
      try{
        const response = await axios(`${baseUrl}/students`,options);
        const detailStudent= response.data.data.students;
        const lastUserId = detailStudent[detailStudent.length-1].id;
          setTimeout(() => {
              navigate(`/orientados/${lastUserId}`);
            },5000);
        }
      catch(err){
        const {status}=err.response;
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
        adviserList,
        totalEventPages
    }

}


export default useGet