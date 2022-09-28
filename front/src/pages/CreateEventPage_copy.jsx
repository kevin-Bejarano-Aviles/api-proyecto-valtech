import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';


function CreateEventPage_copy() {
  const [students, setStudents] = useState([]);
  const [studentsEvent, setStudentsEvents] = useState([]);


  const getAllStudents = async () => {
    
    try {
      const response = await axios.get('http://localhost:8000/admin/students', { withCredentials: true });
      setStudents(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  const [datos,setDatos] = useState({
    name:'',
    date:'',
    time:'',
    detail:'',
    duration:'',
    adviser_event_id:''  });

  // let checklis=[
  //   {name:'opcion 1',checked:false},
  //   {name:'opcion 2',checked:true}
    
  // ]
  // const [checklist,setCheckbox]=useState(checklis);
  
  const handleInput= (ev)=>{
    setDatos({
      ...datos,
      [ev.target.name]:ev.target.value
    })
    console.log(datos);
  }

  const alerta =  (e) =>{
    e.preventDefault();
    console.log(datos);
  }
  
  function toggle(value,id){
    console.log(value);
    console.log(id);
    // setCheckbox([
    //   ...checklist,
    //   checklist[id].checked=value
    // ])
    console.log("valor cambiado");
    // let find=studentsEvent.includes(toString(id))
    // console.log(find);
   if (value===true) {
    setStudentsEvents([...studentsEvent,id])
    console.log(studentsEvent);

   }
   else{
    let listanew=studentsEvent.filter(student=> student.id===id);
    setStudentsEvents(...listanew)
    console.log(studentsEvent);

   }
  }
  useEffect(()=>{
    getAllStudents()
  },[])
  return (
    <>

    <div>CreateEventPage_copy</div>
    <form >
          <label className='flex flex-col mt-2 mb-5'>
            <p >Nombre evento</p>
            <input  type='text' name='name' placeholder='name' value={datos.email} onChange={handleInput}/>
          </label>
         
          <label className='flex flex-col mt-2 mb-5'>
            <p >Día</p>
            <input  type='date' name='date'  value={datos.date} onChange={handleInput}/>
          </label>
          <label className='flex flex-col mt-2 mb-5'>
            <p >Time</p>
            <input  type='time' name='time'  value={datos.time} onChange={handleInput}/>
          </label>
          <label className='flex flex-col mt-2 mb-5'>
            <p >Duration</p>
            <input  type='time' name='duration'  value={datos.duration} onChange={handleInput}/>
          </label>
          <p >Orientadores participantes</p>
          <select name="adviser_event_id" onChange={handleInput}>
            <option  value="1" id='1'>Javier</option>
            <option value="2" id='2'>Leonardo</option>
            <option value="3" id='3'>Patricio</option>
          </select>
          <label className='flex flex-col mt-2 mb-5'>
            <p >Detalles</p>
            <input  type='text' name='detail' placeholder='detalles' value={datos.detail} onChange={handleInput}/>
          </label>

          <div className='mt-5'>
            {/* <label htmlFor="">Opcion 1<input
            id='0'
            type="checkbox"
            checked={checklist[0].checked}
            onChange={e => toggle(e.target.checked,e.target.id)}
          /></label>
          <label htmlFor="">Opcion 2<input
          id='1'
            type="checkbox"
            checked={checklist[1].checked}
            onChange={e => toggle(e.target.checked,e.target.id)}
          /></label> */}
          <ul>
          {students.map(student => (
                      <li key={student.id} className={`${student.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3`}>
                        
                        <label
                          className='relative pl-6 w-full cursor-pointer label-checked'
                        >
                            {student.fullName}
                            <input
                        className='hidden input-checked'
                          type='checkbox'
                          name={JSON.stringify(student)}
                          id={student.id}
                          onClick={(e) => {
                            toggle(e.target.checked,e.target.id);
                          }}
                        />
                        </label>
                      </li>
          ))}
         </ul>
          {
            studentsEvent &&
          
            studentsEvent[0]
            
          }
          <Button type='submit' name='log in' handleFunction={()=>console.log('se envio')} />        
        </div>
    </form>
    </>

  )
}

export default CreateEventPage_copy;