import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import {  useNavigate } from 'react-router-dom';
import Icon_arrow_left from '../img/Icon_arrow-left.svg'
import Icon_arrow_rigth from '../img/Icon_arrow-right.svg'
import TableRow from '../components/TableRow';
import Search from '../components/Search'
function EventsPage() {
	const eventList=[
		{
		  "id":1,
		  "name":"Encuentro individual",
		  "date":"02-12-2022",
		  "time":"15:43",
		  "duration":"40",
		  "detail":"lleven algo para tomar",
		  "participatingCounselor":"Esteban Enriquez",
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
			"participatingCounselor":"Esteban Enriquez",
			"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
		  }
		  ,
		{
			"id":3,
			"name":"Encuentro individual",
			"date":"02-12-2022",
			"time":"15:43",
			"duration":"40",
			"detail":"lleven algo para tomar",
			"participatingCounselor":"Esteban Enriquez",
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
			"participatingCounselor":"Esteban Enriquez",
			"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
		  },
		  {
			  "id":5,
			  "name":"Encuentro individual",
			  "date":"02-12-2022",
			  "time":"15:43",
			  "duration":"40",
			  "detail":"lleven algo para tomar",
			  "participatingCounselor":"Esteban Enriquez",
			  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
			},
			{
				"id":6,
				"name":"Encuentro individual",
				"date":"02-12-2022",
				"time":"15:43",
				"duration":"40",
				"detail":"lleven algo para tomar",
				"participatingCounselor":"Esteban Enriquez",
				"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
			  },
			  {
				  "id":7,
				  "name":"Encuentro individual",
				  "date":"02-12-2022",
				  "time":"15:43",
				  "duration":"40",
				  "detail":"lleven algo para tomar",
				  "participatingCounselor":"Esteban Enriquez",
				  "participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
				},
				{
					"id":8,
					"name":"Encuentro individual",
					"date":"02-12-2022",
					"time":"15:43",
					"duration":"40",
					"detail":"lleven algo para tomar",
					"participatingCounselor":"Esteban Enriquez",
					"participatingCounselors":["Julián Martinez", "Sabrina García", "Benjamín Neridas"]
				  }
	  ]

    let navigate = useNavigate();

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
                    <p className='text-blue text-xl font-semibold'>Buscar eventos de un orientado</p>
					<Search placeholder={'Buscar eventos por nombre y apellido del orientado'}/>
				</div>
                {/* tablita para mostrar eventos */}
                {/* tabla container*/}
				<div className='w-full flex flex-row items-center justify-center tablet:justify-end'>
						<p className='ml-2 mr-2 my-8 text-xl  lap_tablet:my-0'>1-8 de 100</p>
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
								!eventList ? 'No hay eventos'
								: (eventList.map((event,index)=>(
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