import Button from '../components/Button';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import {  useNavigate } from 'react-router-dom';
import Icon_Search from '../img/Icon_search.svg';


function EventsPage() {
    let navigate = useNavigate();

    return ( 
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
        <Menu />
        <div>
            <HeaderAdmin Titulo='Eventos' />
            <main className='pb-12 mx-12'>  
            <div className='mt-5'>
                <div className='flex justify-between flex-col-reverse mobileL:flex-row '>
                    <div className='relative h-8 w-56 mt-8 mb-5 mobileL:my-0'>
                        <h1 className='text-blue absolute w-56 z-20 text-2xl font-normal '>Todos los eventos</h1>
                        <div className='absolute z-10 inset-x-0 bottom-0 h-3.5 w-56  bg-backgroundGray'></div>
                    </div>
                    <div className='flex mobileL:w-full justify-center  mobileL:justify-end mobileL:mr-28 tablet:mr-8'>
                    <Button
                        type='button'
                        name='Agendar evento'
                        handleFunction={()=>{navigate('/eventos/crear-evento')}}
                    />
                    </div>
                    
                </div>
                <div>
                    <h1 className='text-blue text-xl font-semibold'>Buscar eventos de un orientado</h1>
                    
                </div>
            
            </div>  
            </main>
        </div>
    </div>
     );
}

export default EventsPage;