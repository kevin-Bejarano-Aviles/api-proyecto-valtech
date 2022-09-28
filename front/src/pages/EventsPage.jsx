import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import {  useNavigate } from 'react-router-dom';
import Icon_arrow_left from '../img/Icon_arrow-left.svg'
import Icon_arrow_rigth from '../img/Icon_arrow-right.svg'
import TableRow from '../components/TableRow';
import Search from '../components/Search';
import Icon_Search from '../img/Icon_search.svg';
import eventServices from '../services/events'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import iconDelete from '../img/Icon_delete.svg';



function EventsPage() {


    let navigate = useNavigate();
	
	const [eventList,setEventsList]=useState([])
	const [cantEvents,setCantEvents]=useState(0);
	const [banSearch,SetBandSearch]=useState(false);
	const [initrange,setRange]=useState(0)

	//show all events
	const [showAll, setShowAll] = useState(false);
	//Show only the event that has the name of the target I want to see
	const [search,SetSearch] = useState('');

	const getallvents=async ()=>{
		try{
			const response = await axios.get('http://localhost:8000/admin/events')
			console.log(response.data.events);
			setEventsList(response.data.events)

		}
		catch(err){
			console.error(`${err.response.status}: ${err.response.statusText}`);
		}
	}
	
	const deleteEvent = async (id)=>{

        try {
            const response = await axios.delete(`http://localhost:8000/admin/deleteEvent/${id}`)
            let newArray=eventList.filter(event=> event.id!=id);
			setEventsList(newArray);
			console.log(response);
			console.log(id);
			
		} catch (error) {
            console.error(error.response)
        }
    }

	function convertDate(date){
        let datestring=''
        for (let index = 0; index < date.length; index++) {
            const element = date[index];
            if(element==='-'){
                datestring=datestring+'/'
            }
            else{
                datestring=datestring+element;
            }
        }
        return datestring;
    }
    

	const handleSearch = (event)=>{
		//si el input esta vacio que muestre uno que cumpla con los criterios caso contrario mensaje de no se encontro el mensaje 
		SetSearch(event.target.value)
		if (search) {
		  setShowAll(false)
		  SetBandSearch(true)
		}
		else{
		  setShowAll(true)
		  SetBandSearch(false)
		}
	}
	//averiguar como hacer que se filter con el lower case

	function arrowRigth() {
		if(initrange+eventsToShow.length < cantEvents ){
			setRange(initrange+8)
		}
	}

	function arrowLeft() {
		if(initrange!==0){
			setRange(initrange-8)
		}
	}

	function newArray(arrayList,init,end){
		let array=[]
		console.log("el rango es de"+init+" a " + end);
		if(end>arrayList.length){
			end=arrayList.length;
		}
		for (let index = init; index < end; index++) {
			const element = arrayList[index];
			array.push(element)
		}
		return array
	}

	//averiguar como hacer que se filter con el lower case
	let eventsToShow=(showAll || search.length<1) 
	
	? newArray(eventList,initrange,initrange+8) 
	: (eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase())).length>8 ? newArray(eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase())),initrange,initrange+8) : eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase()))) ;

	console.log(eventsToShow);
	console.log(newArray(eventList,initrange,initrange+8));

	useEffect(()=>{
		if(search.length>=1){
			let cant= eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase()));
			setCantEvents(cant.length);
			setRange(0);
		}
	},[search])

	useEffect(()=>{
		getallvents()
	},[])

	useEffect(()=>{
		let cant=eventList.length
		setCantEvents(cant)
	},[eventList])
	
    return ( 
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
        <Menu />
        <div>
            <HeaderAdmin Titulo='Eventos' />
            <main className='pb-12 mx-0 mobileL:mx-12'>  

            <div className='mt-5'>
                <div className='flex justify-between flex-col-reverse mobileL:flex-row '>
                    <div className='relative h-8 w-56 mt-8 mb-5 mobileL:my-0'>
                        <h1 className='text-blue absolute w-56 z-20 text-2xl font-normal '>Todos los eventos</h1>
                        <div className='absolute z-10 inset-x-0 bottom-0 h-3.5 w-56  bg-backgroundGray'></div>
                    </div>
                    <div className='flex mobileL:w-full justify-center  mobileL:justify-end mobileL:mr-28 tablet:mr-25'>
                    <Button
                        type='button'
                        name='Agendar evento'
                        handleFunction={()=>{navigate('/eventos/crear-evento')}}
                    />
                    </div>
                    
                </div>
                <div className='mt-5'>
					{/* ------------------------------------------------------------------------------------------------------------------------------ */}
                    <p className='text-blue text-xl font-semibold'>Buscar eventos de un orientado</p>
					<Search placeholder={'Buscar eventos por nombre y apellido del orientado'} handleChange={handleSearch}/>
				</div>
                {/* tablita para mostrar eventos */}
                {/* tabla container*/}
				<div className='w-full flex flex-row items-center justify-center tablet:justify-end'>
						<p className='ml-2 mr-2 my-8 text-xl text-blue lap_tablet:text-lg lap_tablet:my-0'>{ (eventsToShow.length===0) ? 0 :initrange+1}-{eventsToShow.length+initrange} de { cantEvents }</p>
						<img src={Icon_arrow_left} className='cursor-pointer mx-2 w-5 h-5 tablet:w-5 ' alt='icon arrow left' onClick={()=>arrowLeft()}/>
						<img src={Icon_arrow_rigth} className='cursor-pointer mx-2 w-5 h-5' alt='icon arrow rigth' onClick={()=>arrowRigth()}/>
				</div>
                    {/* paginado */}
					
                    <table class='mt-2 min-w-full leading-normal rounded-lg'>
						<thead className='rounded-full'>
							<tr className='boder-t-2 rounded-full'>
								<th
									class='px-5 py-3 border-b-2 rounded-tl-lg border-gray-200 bg-gray-100 text-left text-xs font-semibold text-green uppercase tracking-wider'>
									Fecha
								</th>
								<th
									class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-green uppercase tracking-wider'>
									Horario
								</th>
								<th
									class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-green uppercase tracking-wider'>
									Evento
								</th>
								
								<th
									class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-green uppercase tracking-wider'>
									Participante
								</th>
                                <th
									class='px-5 py-3 border-b-2 rounded-tl-lg border-gray-200 bg-gray-100 text-left text-xs font-semibold text-green uppercase tracking-wider'>
									
								</th>
							</tr>
						</thead>
						<tbody className=''>
							{
								eventsToShow.length===0 ? (showAll ? <p className='mt-5 text-blue '>No hay eventos cargados</p> : <p className='mt-5 w-full text-blue  '>No se encontro el evento con el orientado</p> )
								: (eventsToShow.map((eve,index)=>(
										<tr className='bg-transparent hover:bg-bgTable ' key={eve.id}>
											<td className='px-5 py-5 border-b border-gray-200  text-sm'>
												<div className='flex items-center'>
														<p className='text-blue'>{convertDate(eve.date)} </p>
													</div>
											</td>
											<td className='px-5 py-5 border-b border-gray-200  text-sm'>
												<p className='text-blue whitespace-no-wrap'>{eve.time} hs</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200  text-sm'>
												<p className='text-blue whitespace-no-wrap'>
													{eve.name}
												</p>
												</td>
												<td className='px-5 py-5 border-b border-gray-200  text-sm'>
												<span
													className='relative inline-block  text-blue leading-tight'>
													<span aria-hidden
														className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
												<span className='relative'>{eve.adviser.fullName}</span>
												</span>
											</td>
											<td className='px-5 py-5 border-b border-gray-200  text-sm '>
												<img className='cursor-pointer' src={iconDelete} alt=""  onClick={()=>deleteEvent(eve.id)} />									
											</td>
											
										</tr>								
									))
								)
							}
						</tbody>
					</table>
            </div>  
            </main>
        </div>
    </div>
);
}

export default EventsPage;