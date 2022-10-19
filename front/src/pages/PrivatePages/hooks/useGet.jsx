import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// const getAllStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/admin/students', { withCredentials: true });
//       const response = await axios.get(`${url}/admin/addStudents`, { withCredentials: true });
//       const json = await response.data;
//       const lastUserId = json[json.length-1].id;
//       setTimeout(() => {
//         navigate(`/orientados/${lastUserId}`);
//       }, 1000);
//     } catch (err) {
//       console.error(`${err.response.status}: ${err.response.statusText}`);
//     }
//   };

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

    // const redirectionDetailStudent = async () => {
    //     let navigate = useNavigate();
    //     try{
    //         let options = {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'multipart/form-data'
    //             ,"x-token":`Bearer ${token}`},
    //         };
    //         const response = await axios(baseUrl,options)
    //         setListStudent(response.data.data.students)
    //         const detailStudent=await response.data.data.students;
    //         const lastUserId = detailStudent[detailStudent.length-1].id;
    //         setTimeout(() => {
    //             navigate(`/orientados/${lastUserId}`);
    //           },8000);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    return{
        getAllStudentsList,
        listStudent
    }

}

export default useGet;