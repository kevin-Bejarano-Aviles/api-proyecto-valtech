import { useNavigate } from 'react-router-dom';
const redirectionDetailStudent = async () => {
    const url=process.env.REACT_APP_API_URL
    const navigate = useNavigate();
    console.log('se esta redireccionando');
    try{
        let options = {
            method: 'GET',
            headers: { 'Content-Type': 'multipart/form-data'
            ,"x-token":`Bearer ${token}`},
        };
        const response = await axios(`${url}/admin/students`,options)
        const detailStudent=await response.data.data.students;
        console.log(detailStudent);
        // const lastUserId = detailStudent[detailStudent.length-1].id;
        // setTimeout(() => {
        //     navigate(`/orientados/${lastUserId}`);
        //   },8000);
    }
    catch(err){
        console.log(err);
    }
}

export default redirectionDetailStudent