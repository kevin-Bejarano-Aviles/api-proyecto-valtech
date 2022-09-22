import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import {  useNavigate } from 'react-router-dom';
import Icon_arrow_left from '../img/Icon_arrow-left.svg'
import Icon_arrow_rigth from '../img/Icon_arrow-right.svg'
import TableRow from '../components/TableRow';
import Search from '../components/Search';
import Icon_Search from '../img/Icon_search.svg';

import { useState } from 'react';

const eventList=[
	{
	  "id":1,
	  "name":"Encuentro individual",
	  "date":"02-12-2022",
	  "time":"15:43",
	  "duration":"40",
	  "detail":"lleven algo para tomar",
	  "participatingCounselor":"Sofía Serrano",
	  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	},
	{
		"id":2,
		"name":"Encuentro individual",
		"date":"01-09-2022",
		"time":"15:43",
		"duration":"40",
		"detail":"lleven algo para tomar",
		"participatingCounselor":"Esteban Enriquez",
		"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	},
	{
		"id":3,
		"name":"Encuentro individual",
		"date":"02-12-2022",
		"time":"15:43",
		"duration":"40",
		"detail":"lleven algo para tomar",
		"participatingCounselor":"Esteban Julian",
		"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	  }
	  ,
	{
		"id":4,
		"name":"Encuentro individual",
		"date":"02-12-2022",
		"time":"15:43",
		"duration":"40",
		"detail":"lleven algo para tomar",
		"participatingCounselor":"Esteban Perez",
		"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	  }
	  ,
	{
		"id":5,
		"name":"Encuentro individual",
		"date":"02-12-2022",
		"time":"15:43",
		"duration":"40",
		"detail":"lleven algo para tomar",
		"participatingCounselor":"Esteban Gallardo",
		"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	  },
	  {
		  "id":6,
		  "name":"Encuentro individual",
		  "date":"02-12-2022",
		  "time":"15:43",
		  "duration":"40",
		  "detail":"lleven algo para tomar",
		  "participatingCounselor":"Esteban Maradona",
		  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
		},
		{
			"id":7,
			"name":"Encuentro individual",
			"date":"02-12-2022",
			"time":"15:43",
			"duration":"40",
			"detail":"lleven algo para tomar",
			"participatingCounselor":"Esteban julian",
			"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
		  },
		  {
			  "id":8,
			  "name":"Encuentro individual",
			  "date":"02-12-2022",
			  "time":"15:43",
			  "duration":"40",
			  "detail":"lleven algo para tomar",
			  "participatingCounselor":"Esteban martinez",
			  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
			},
			{
				"id":9,
				"name":"Encuentro individual",
				"date":"02-12-2022",
				"time":"15:43",
				"duration":"40",
				"detail":"lleven algo para tomar",
				"participatingCounselor":"Esteban Julian",
				"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
			  }
  ]

function EventsPage() {
	
    let navigate = useNavigate();
	//show all events
	const [showAll, setShowAll] = useState(false);
	//Show only the event that has the name of the target I want to see
	const [search,SetSearch] = useState(' ');

	const handleSearch = (event)=>{
		//si el input esta vacio que muestre uno que cumpla con los criterios caso contrario mensaje de no se encontro el mensaje 
		SetSearch(event.target.value)
		if (search) {
		  setShowAll(false)
		}
		else{
		  setShowAll(true)
		}
	}

	const eventsToShow=showAll ? eventList : eventList.filter(event => event.participatingCounselor.includes(search)) ;

	console.log(eventsToShow);

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
					{/* voy a ver si puedo hacer el metodo desde aca y despues lo paso a componente */}
					{/* <Search placeholder={'Buscar eventos por nombre y apellido del orientado'}/> */}
					<label className='relative block w-full lap_tablet:w-3/5'>
						<input className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder={'Buscar eventos por nombre y apellido del orientado'} type='text' name='search' onChange={handleSearch}/>
						<span className='sr-only'>Search</span>
						<span className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<img src={Icon_Search} alt='Icon_Search' />  
						</span>
					</label>
				</div>
                {/* tablita para mostrar eventos */}
                {/* tabla container*/}
				<div className='w-full flex flex-row items-center justify-center tablet:justify-end'>
						<p className='ml-2 mr-2 my-8 text-xl text-blue lap_tablet:text-lg lap_tablet:my-0'>1-8 de 100</p>
						<img src={Icon_arrow_left} className='cursor-pointer mx-2 w-5 h-5 tablet:w-5 ' alt='icon arrow left'/>
						<img src={Icon_arrow_rigth} className='cursor-pointer mx-2 w-5 h-5' alt='icon arrow rigth' />
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
									Participantes
								</th>
                                <th
									class='px-5 py-3 border-b-2 rounded-tl-lg border-gray-200 bg-gray-100 text-left text-xs font-semibold text-green uppercase tracking-wider'>
									
								</th>
							</tr>
						</thead>
						<tbody className=''>
							{
								!eventsToShow ? 'No hay eventos'
								: (eventsToShow.map((event,index)=>(
									<TableRow event={event}/>
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