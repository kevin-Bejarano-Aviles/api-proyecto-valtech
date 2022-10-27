import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import useGet from '../hooks/useGet';
import functionsEvents from './functions/functionsEvents';

import Button from '../sharedPrivateComponents/button/Button';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import Icon_arrow_left from '../../../assets/icons/Icon_arrow-left.svg'
import Icon_arrow_rigth from '../../../assets/icons/Icon_arrow-right.svg'
import Search from '../sharedPrivateComponents/Search';
import iconDelete from '../../../assets/icons/privatePage/Icon_delete.svg';
import useDelete from '../hooks/useDelete';


function EventsPage() {

    const navigate = useNavigate();
	const {deleteEvent}=useDelete(); 
	const {totalEventsGet,totalEvents,limit,eventList,converTime,convertDate,nextPage,prevPage,getAllEvents,handleSearch}=functionsEvents();
	useEffect(()=>{
		getAllEvents(0);
	},[]);

    return ( 
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
        <Menu />
        <div>
			<HeaderAdmin Title='Eventos'/>
            <main className='pb-12 mx-0 mobileL:mx-12'>  

            <div className='mt-5'>
                <div className='flex justify-between flex-col-reverse mobileL:flex-row '>
                    <div className='relative h-8 w-56 mt-8 mb-3 mx-5 mobileL:my-0 tablet:mx-0'>
                        <h1 className='text-blue absolute w-56 z-20 text-2xl font-normal '>Todos los eventos</h1>
                        <div className='absolute z-10 inset-x-0 bottom-0 h-3.5 w-56  bg-backgroundGray'/>
                    </div>
                    <div className='hidden tablet:flex  mobileL:w-full justify-center  mobileL:justify-end mobileL:mr-28 tablet:mr-25'>
							<Button
								type='button'
								name='Agendar evento'
								handleFunction={()=>{navigate('/eventos/crear-evento')
								}
							}
							/>
                    </div>
                    
                </div>
                <div className='mt-5 mx-5 tablet:mx-0'>
                    <p className='text-blue text-xl font-semibold mb-5 tablet:my-0'>Buscar eventos de un orientado</p>
					<Search placeholder='Buscar eventos por nombre y apellido del orientado' handleChange={handleSearch}/>
				</div>
          
				<div className='w-full hidden tablet:flex flex-row items-center justify-center tablet:justify-end  '>
						<p className='ml-2 mr-2 my-5 mobileM:my-8 text-xl text-blue lap_tablet:text-lg lap_tablet:my-0'>{limit+1}-{totalEventsGet+limit} de {totalEvents}</p>
						<img src={Icon_arrow_left} className='cursor-pointer mx-2 w-5 h-5 tablet:w-5 ' alt='icon arrow left' onClick={()=>prevPage()}/>
						<img src={Icon_arrow_rigth} className='cursor-pointer mx-2 w-5 h-5' alt='icon arrow rigth' onClick={()=>nextPage()}/>
				</div>
					
                    <table className='mt-2 min-w-full leading-normal border rounded-full border-gray-200 '>
						<thead className=' w-full border-b'>
							<tr className='  hidden tablet:table-row'>
								<th
									className='mobileM:px-5 px-1 py-3     text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Fecha
								</th>
								<th
									className=' px-3 mobileM:px-5 py-3    text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Horario
								</th>
								<th
									className=' px-3 mobileM:px-6 py-3    text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Evento
								</th>
								
								<th
									className=' px-1 mobileM:px-5 py-3    text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>
									Participante
								</th>
                                <th
									className=' px-2 mobileM:px-5 py-3     text-left text-xs mobileM:text-sm font-semibold text-green uppercase tracking-wider'>		  
									{' '}
								</th>
							</tr>
						</thead>
						<tbody className='table-row-group'>

							{
								 (eventList.map((eve,index)=>(
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
													<span aria-hidden className='absolute inset-0 bg-green-200 opacity-50 rounded-full'/>
													<span className='relative'>{eve.Adviser.fullName}</span>
												</span>
											</td>
											<td className='border-b border-gray-200  text-xs mobileM:text-sm mobileM:px-5 py-5 '>
												<img className='cursor-pointer' src={iconDelete} alt=''  onClick={()=>deleteEvent(eve.id)} />									
											</td>
											
										</tr>

										<div className='flex items-center justify-center tablet:hidden w-full bg-transparent my-5'>
											<div className='flex items-center  justify-between flex-row w-4/5 border rounded-md p-5 border-slate-400'>
												<div className='flex  justify-start flex-col '>
													<div className='w-full flex justify-start flex-row'>
														<div className='flex items-start mr-2 flex-col '>
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
						<p className='ml-2 mr-2 my-5 tablet:my-8 text-2xl text-blue lap_tablet:text-lg lap_tablet:my-0'>1 -2 </p>
						<div className='flex '>
						<img src={Icon_arrow_left} className='cursor-pointer mx-2 w-10 h-10 tablet:w-5 ' alt='icon arrow left' />
						<img src={Icon_arrow_rigth} className='cursor-pointer mx-2 w-10 h-10' alt='icon arrow rigth' />
					</div>
					<div className='flex tablet:hidden mt-16 tablet:my-0 mobileL:w-full justify-center  mobileL:justify-end mobileL:mr-28 tablet:mr-25'>
							<Button
								type='button'
								name='Agendar evento'
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