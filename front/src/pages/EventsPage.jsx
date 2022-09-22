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
import { useEffect } from 'react';

const eventList=[

	{ "id":1,
	  "name":"Encuentro individual",
	  "date":"02-12-2022",
	  "time":"15:43",
	  "duration":"40",
	  "detail":"lleven algo para tomar",
	  "participatingCounselor":"Sofía Serrano",
	  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	}
	// {
	// 	"id":2,
	// 	"name":"Encuentro individual",
	// 	"date":"01-09-2022",
	// 	"time":"15:43",
	// 	"duration":"40",
	// 	"detail":"lleven algo para tomar",
	// 	"participatingCounselor":"Esteban Enriquez",
	// 	"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// },
	// {
	// 	"id":3,
	// 	"name":"Encuentro individual",
	// 	"date":"02-12-2022",
	// 	"time":"15:43",
	// 	"duration":"40",
	// 	"detail":"lleven algo para tomar",
	// 	"participatingCounselor":"Esteban Julian",
	// 	"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	//   }
	//   ,
	// {
	// 	"id":4,
	// 	"name":"Encuentro individual",
	// 	"date":"02-12-2022",
	// 	"time":"15:43",
	// 	"duration":"40",
	// 	"detail":"lleven algo para tomar",
	// 	"participatingCounselor":"Esteban Perez",
	// 	"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	//   }
	//   ,
	// {
	// 	"id":5,
	// 	"name":"Encuentro individual",
	// 	"date":"02-12-2022",
	// 	"time":"15:43",
	// 	"duration":"40",
	// 	"detail":"lleven algo para tomar",
	// 	"participatingCounselor":"Esteban Gallardo",
	// 	"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	//   },
	//   {
	// 	  "id":6,
	// 	  "name":"Encuentro individual",
	// 	  "date":"02-12-2022",
	// 	  "time":"15:43",
	// 	  "duration":"40",
	// 	  "detail":"lleven algo para tomar",
	// 	  "participatingCounselor":"Esteban Maradona",
	// 	  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 	},
	// 	{
	// 		"id":7,
	// 		"name":"Encuentro individual",
	// 		"date":"02-12-2022",
	// 		"time":"15:43",
	// 		"duration":"40",
	// 		"detail":"lleven algo para tomar",
	// 		"participatingCounselor":"Esteban julian",
	// 		"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 	  },
	// 	  {
	// 		  "id":8,
	// 		  "name":"Encuentro individual",
	// 		  "date":"02-12-2022",
	// 		  "time":"15:43",
	// 		  "duration":"40",
	// 		  "detail":"lleven algo para tomar",
	// 		  "participatingCounselor":"Esteban martinez",
	// 		  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 		},
	// 		{
	// 			"id":9,
	// 			"name":"Encuentro individual",
	// 			"date":"02-12-2022",
	// 			"time":"15:43",
	// 			"duration":"40",
	// 			"detail":"lleven algo para tomar",
	// 			"participatingCounselor":"Esteban Julian",
	// 			"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 		  },
	// 		  {
	// 			"id":10,
	// 			"name":"Encuentro individual",
	// 			"date":"02-12-2022",
	// 			"time":"15:43",
	// 			"duration":"40",
	// 			"detail":"lleven algo para tomar",
	// 			"participatingCounselor":"Sofía Serrano",
	// 			"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 		  },
	// 		  {
	// 			  "id":12,
	// 			  "name":"Encuentro individual",
	// 			  "date":"01-09-2022",
	// 			  "time":"15:43",
	// 			  "duration":"40",
	// 			  "detail":"lleven algo para tomar",
	// 			  "participatingCounselor":"Esteban Enriquez",
	// 			  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 		  },
	// 		  {
	// 			  "id":13,
	// 			  "name":"Encuentro individual",
	// 			  "date":"02-12-2022",
	// 			  "time":"15:43",
	// 			  "duration":"40",
	// 			  "detail":"lleven algo para tomar",
	// 			  "participatingCounselor":"Esteban Julian",
	// 			  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 			}
	// 			,
	// 		  {
	// 			  "id":14,
	// 			  "name":"Encuentro individual",
	// 			  "date":"02-12-2022",
	// 			  "time":"15:43",
	// 			  "duration":"40",
	// 			  "detail":"lleven algo para tomar",
	// 			  "participatingCounselor":"Esteban Perez",
	// 			  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 			}
	// 			,
	// 		  {
	// 			  "id":15,
	// 			  "name":"Encuentro individual",
	// 			  "date":"02-12-2022",
	// 			  "time":"15:43",
	// 			  "duration":"40",
	// 			  "detail":"lleven algo para tomar",
	// 			  "participatingCounselor":"Esteban Gallardo",
	// 			  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 			},
	// 			{
	// 				"id":16,
	// 				"name":"Encuentro individual",
	// 				"date":"02-12-2022",
	// 				"time":"15:43",
	// 				"duration":"40",
	// 				"detail":"lleven algo para tomar",
	// 				"participatingCounselor":"Esteban Maradona",
	// 				"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 			  },
	// 			  {
	// 				  "id":17,
	// 				  "name":"Encuentro individual",
	// 				  "date":"02-12-2022",
	// 				  "time":"15:43",
	// 				  "duration":"40",
	// 				  "detail":"lleven algo para tomar",
	// 				  "participatingCounselor":"Esteban julian",
	// 				  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 				},
	// 				{
	// 					"id":18,
	// 					"name":"Encuentro individual",
	// 					"date":"02-12-2022",
	// 					"time":"15:43",
	// 					"duration":"40",
	// 					"detail":"lleven algo para tomar",
	// 					"participatingCounselor":"Esteban martinez",
	// 					"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 				  },
	// 				  {
	// 					  "id":19,
	// 					  "name":"Encuentro individual",
	// 					  "date":"02-12-2022",
	// 					  "time":"15:43",
	// 					  "duration":"40",
	// 					  "detail":"lleven algo para tomar",
	// 					  "participatingCounselor":"Esteban Julian",
	// 					  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
	// 					}
	
  ]

function EventsPage() {
	
    let navigate = useNavigate();
	let cantinit=eventList.length;
	const [cantEvents,setCantEvents]=useState(cantinit);
	const [banSearch,SetBandSearch]=useState(false);
	//show all events
	const [showAll, setShowAll] = useState(false);
	//Show only the event that has the name of the target I want to see
	const [search,SetSearch] = useState('');

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

	const eventsToShow=showAll ? eventList : eventList.filter(event => (event.participatingCounselor.toLowerCase()).includes(search.toLowerCase())) ;

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
						<p className='ml-2 mr-2 my-8 text-xl text-blue lap_tablet:text-lg lap_tablet:my-0'>1-8 de {cantEvents}</p>
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
								eventsToShow.length===0 ? (showAll ? <p className='mt-5 text-blue '>No hay eventos cargados</p> : <p className='mt-5 w-full text-blue  '>No se encontro el evento con el orientado</p> )
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