import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';


function CreateEventPage_copy() {
  const [datos,setDatos] = useState({
    name:'',
    date:'',
    time:'',
    detail:'',
    duration:'',
    adviser_event_id:''  });

  let checklis=[
    {name:'opcion 1',checked:false},
    {name:'opcion 2',checked:true}
    
  ]
  const [checklist,setCheckbox]=useState(checklis);
  
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
    setCheckbox([
      ...checklist,
      checklist[id].checked=value
    ])
    console.log("valor cambiado");
   
  }
  return (
    <>

    <div>CreateEventPage_copy</div>
    <form onSubmit={alerta}>
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
            <label htmlFor="">Opcion 1<input
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
          /></label>
          
          <Button type='submit' name='log in' handleFunction={()=>console.log('se envio')} />        
        </div>
    </form>
    </>

  )
}

export default CreateEventPage_copy;