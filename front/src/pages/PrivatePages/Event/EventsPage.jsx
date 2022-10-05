import Button from '../../../components/Button';
import HeaderAdmin from '../../../components/HeaderAdmin';
import Menu from '../../../components/Menu';
import {  useNavigate } from 'react-router-dom';
import Icon_arrow_left from '../img/Icon_arrow-left.svg'
import Icon_arrow_rigth from '../img/Icon_arrow-right.svg'
import Search from '../../../components/Search';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import iconDelete from '../img/Icon_delete.svg';



function EventsPage() {


    let navigate = useNavigate();
	
	const [eventList,setEventsList]=useState([])
	const [cantEvents,setCantEvents]=useState(0);
	const [banSearch,SetBandSearch]=useState(true);
	const [initrange,setRange]=useState(0)
	const [orderListband,SetOrderListband]=useState(true);
	//show all events
	const [showAll, setShowAll] = useState(false);
	//Show only the event that has the name of the target I want to see
	const [search,SetSearch] = useState('');
	const  [firsrtOrder,setFirstOrder]=useState(false);


	const getallvents=async ()=>{
		try{
			const response = await axios.get('http://localhost:8000/admin/events')
			setEventsList(response.data.events)

		}
		catch(err){
			console.error(`${err.response.status}: ${err.response.statusText}`);
		}
	}
	
	const deleteEvent = async (id)=>{

        try {
            await axios.delete(`http://localhost:8000/admin/deleteEvent/${id}`)
            let newArray=eventList.filter(event=> event.id!==id);
			setEventsList(newArray);
			
		} catch (error) {
            console.error(error.response)
        }
    }

	
    function orderList(list){
		let array;
		if (list.length>0) {
			if(!orderListband){
				array=list.sort((a,b)=>new Date(a.date)-new Date(b.date))
			}
			else{
	
				array=list.sort((a,b)=>new Date(b.date)-new Date(a.date))
	
			}
			setEventsList(array)
		}
		
	}

	const handleSearch = (event)=>{
		//si el input esta vacio que muestre uno que cumpla con los criterios caso contrario mensaje de no se encontro el mensaje 
		console.log(search.length);
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
		if(end>arrayList.length){
			end=arrayList.length;
		}
		for (let index = init; index < end; index++) {
			const element = arrayList[index];
			array.push(element)
		}
		return array
	}


	
	// console.log(newArray(eventList,initrange,initrange+8));
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

	function converTime(time){
		let timeArray=time.split(':')
		let timeString=timeArray[0]+':'+timeArray[2]
		return timeString;

	}


	function toggle(){
		
		if(orderListband){
			SetOrderListband(false)

		}
		else{
			SetOrderListband(true)

		}

	}

	useEffect(()=>{
		if(search.length>1){
			let cant= eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase()));
			setCantEvents(cant.length);
			setRange(0);
		}
		else{
			let cant=eventList.length
			setCantEvents(cant)		}
	},[search])

	useEffect(()=>{
		let cant=eventList.length
		setCantEvents(cant)
	},[eventList])

	useEffect(()=>{
		getallvents();
		orderList(eventList);
	},[])

	useEffect(()=>{
		orderList(eventList);

	},[ orderListband])
	
	

	let eventsToShow=(showAll || search.length<1) 
	
	? newArray(eventList,initrange,initrange+8) 
	: (eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase())).length>8 
		? newArray(eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase())),initrange,initrange+8) 
		: eventList.filter(event => (event.adviser.fullName.toLowerCase()).includes(search.toLowerCase()))) ;

		console.log(showAll);
    return ( 
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
        <Menu />
        <div>
            <HeaderAdmin Titulo='Eventos' />
            <main className='pb-12 mx-0 mobileL:mx-12'>  

            <div className='mt-5'>
                <div className='flex justify-between flex-col-reverse mobileL:flex-row '>
                    <div className='relative h-8 w-56 mt-8 mb-3 mx-5 mobileL:my-0 tablet:mx-0'>
                        <h1 className='text-blue absolute w-56 z-20 text-2xl font-normal '>Todos los eventos</h1>
                        <div className='absolute z-10 inset-x-0 bottom-0 h-3.5 w-56  bg-backgroundGray'></div>
                    </div>
                    <div className='hidden tablet:flex  mobileL:w-full justify-center  mobileL:justify-end mobileL:mr-28 tablet:mr-25'>
							<Button
								type='button'
								name='Agendar evento'
								classN={true}
								handleFunction={()=>{navigate('/eventos/crear-evento')
								}
								}
							/>
                    </div>
                    
                </div>
                <div className='mt-5 mx-5 tablet:mx-0'>
					{/* ------------------------------------------------------------------------------------------------------------------------------ */}
                    <p className='text-blue text-xl font-semibold mb-5 tablet:my-0'>Buscar eventos de un orientado</p>
					<Search placeholder={'Buscar eventos por nombre y apellido del orientado'} handleChange={handleSearch}/>
				</div>
                {/* tablita para mostrar eventos */}
                {/* tabla container*/}
				<div className='w-full hidden tablet:flex flex-row items-center justify-center tablet:justify-end  '>
						<p className='ml-2 mr-2 my-5 mobileM:my-8 text-xl text-blue lap_tablet:text-lg lap_tablet:my-0'>{ (eventsToShow.length===0) ? 0 :initrange+1}-{eventsToShow.length+initrange} de { cantEvents }</p>
						<img src={Icon_arrow_left} className='cursor-pointer mx-2 w-5 h-5 tablet:w-5 ' alt='icon arrow left' onClick={()=>arrowLeft()}/>
						<img src={Icon_arrow_rigth} className='cursor-pointer mx-2 w-5 h-5' alt='icon arrow rigth' onClick={()=>arrowRigth()}/>
				</div>
                    {/* paginado */}
					
                    <table class='mt-2 min-w-full leading-normal border rounded-full border-gray-200 '>
						<thead className=' w-full border-b'>
							<tr className='  hidden tablet:table-row'>
								<th onClick={()=> toggle()}
									class='mobileM:px-5 px-1 py-3     text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Fecha
								</th>
								<th
									class=' px-3 mobileM:px-5 py-3    text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Horario
								</th>
								<th
									class=' px-3 mobileM:px-6 py-3    text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Evento
								</th>
								
								<th
									class=' px-1 mobileM:px-5 py-3    text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Participante
								</th>
                                <th
									class=' px-2 mobileM:px-5 py-3     text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									  
								</th>
							</tr>
						</thead>
						<tbody className='table-row-group'>
							{
								cantEvents===0 ? ((!showAll && search.length<1) ? <p className='mt-5 text-blue '>No hay eventos cargados</p> : <p className='mt-5 w-full text-blue  ml-5'>No se encontro el evento con el orientado</p> )
								: (eventsToShow.map((eve,index)=>(
									<>
										<tr className='bg-transparent hover:bg-bgTable hidden tablet:table-row' key={eve.id}>
											<td className='border-b border-gray-200 text-xs mobileM:text-sm mobileM:px-5 px-1 py-5 '>
												<div className='flex items-center'>
														<p className='text-blue'>{convertDate(eve.date)} </p>
													</div>
											</td>
											<td className='border-b border-gray-200   text-xs mobileM:text-sm mobileM:px-5 px-1 py-5 '>
												<p className='text-blue whitespace-no-wrap'>{converTime(eve.time)} hs</p>
											</td>
											<td className='border-b border-gray-200  text-xs mobileM:text-sm mobileM:px-5 px-1 py-5 '>
												<p className='text-blue whitespace-no-wrap'>
													{eve.name}
												</p>
												</td>
												<td className='border-b border-gray-200  text-xs mobileM:text-sm px-1 mobileM:px-5 py-5 '>
												<span
													className='relative inline-block  text-blue leading-tight'>
													<span aria-hidden
														className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
												<span className='relative'>{eve.adviser.fullName}</span>
												</span>
											</td>
											<td className='border-b border-gray-200  text-xs mobileM:text-sm mobileM:px-5 py-5 '>
												<img className='cursor-pointer' src={iconDelete} alt=""  onClick={()=>deleteEvent(eve.id)} />									
											</td>
											
										</tr>

										<div className='flex items-center justify-center tablet:hidden w-full bg-transparent my-5'>
											<div className='flex items-center  justify-between flex-row w-4/5 border rounded-md p-5 border-slate-400'>
												<div className='flex  justify-start flex-col '>
													<div className='w-full flex justify-start flex-row'>
														<div className='flex items-start mr-2 flex-col '>
															{/* <p className='text-lightgray'>Fecha</p> */}
															<p className='text-green font-medium'>Fecha</p>

															<p className='text-blue'>{convertDate(eve.date)} </p>
														</div>
														<div className='flex ml-10 flex-col  items-start'>
															<p className='text-green font-medium'>Horario</p>
															<p className='text-blue'>{converTime(eve.time)} hs</p>
														</div>
													</div>
													<p className='w-full mt-3 mb-1 text-blue whitespace-no-wrap font-semibold text-lg text-start'>
															{eve.name}
													</p>
												</div>
												<img className='cursor-pointer w-14 h-14' src={iconDelete} alt=""  onClick={()=>deleteEvent(eve.id)} />									

											</div>
										</div>		
										</>						
									))
								)
							}
						</tbody>
					</table>
					<div className='w-full flex flex-col tablet:hidden items-center justify-center tablet:justify-end  '>
						<p className='ml-2 mr-2 my-5 tablet:my-8 text-2xl text-blue lap_tablet:text-lg lap_tablet:my-0'>{ (eventsToShow.length===0) ? 0 :initrange+1}-{eventsToShow.length+initrange} de { cantEvents }</p>
						<div className='flex '>
						<img src={Icon_arrow_left} className='cursor-pointer mx-2 w-10 h-10 tablet:w-5 ' alt='icon arrow left' onClick={()=>arrowLeft()}/>
						<img src={Icon_arrow_rigth} className='cursor-pointer mx-2 w-10 h-10' alt='icon arrow rigth' onClick={()=>arrowRigth()}/>
					</div>
					<div className='flex tablet:hidden mt-16 tablet:my-0 mobileL:w-full justify-center  mobileL:justify-end mobileL:mr-28 tablet:mr-25'>
							<Button
								type='button'
								name='Agendar evento'
								classN={true}
								handleFunction={()=>{navigate('/eventos/crear-evento')}}
							/>
                    </div>
				</div>
            </div>  
            </main>
        </div>
    </div>
);
}

export default EventsPage;