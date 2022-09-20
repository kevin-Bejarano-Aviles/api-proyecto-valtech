import Button from '../components/Button';

import {  useNavigate } from 'react-router-dom';
import Icon_Search from '../img/Icon_search.svg'

function EventsPage() {
    let navigate = useNavigate();

    return ( 
        <>
        <div>
            <div className='flex justify-between'>
                <div className='relative h-8 w-56 '>
                    <h1 className='text-blue absolute w-56 z-20 text-2xl font-normal'>Todos los eventos</h1>
                    <div className='absolute z-10 inset-x-0 bottom-0 h-3.5 w-56  bg-backgroundGray'></div>
                </div>
                <Button
                    type='button'
                    name='Agendar evento'
                    handleFunction={()=>{navigate('/eventos/crear-evento')}}
                />
            </div>
            <div>
                <h1 className='text-blue text-xl font-semibold'>Buscar eventos de un orientado</h1>
               

            </div>
            <div></div>
        </div>
        </>
     );
}

export default EventsPage;