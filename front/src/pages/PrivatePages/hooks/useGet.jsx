import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function useGet(){
    const [listStudent,setListStudent]=useState([]);
    const [loading,setLoading]=useState('pending')
    // const [studentDeatil, setStudentDeatil] = useState({
    //     Adviser: null,
    //     address: "Calle falsa 123",
    //     adviserId: null,
    //     age: 22,
    //     avatar: "student1.jpg",
    //     createdAt: "2022-10-17T2:4:54.000Z",
    //     dni: 40124214,
    //     email: "lautaroCoria@gmail.com",
    //     fullName: "Lautaro Coria",
    //     id: 1,
    //     motive: "Para mejorar",
    //     phoneNumber: 1123415321,
    //     program: "Orientación vocacional",
    //     school: "Arbusta",
    //     updatedAt: "2022-10-17T20:41:54.000Z",
    //     user: "40124214"
    // });
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