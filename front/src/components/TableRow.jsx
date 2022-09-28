import axios from 'axios';
import { useEffect } from 'react';
import iconDelete from '../img/Icon_delete.svg';


function TableRow({event}) {

    const deleteEvent = async ()=>{
        try {
            const response = await axios.delete(`http://localhost:8000/admin/deleteEvent/${event.id}`)
            console.log(response);
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
    
    
    return ( 
    <tr className='bg-transparent hover:bg-bgTable ' key={event.id}>
    <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <div class='flex items-center'>
                <p className='text-blue'>{convertDate(event.date)} </p>
            </div>
    </td>
    <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <p class='text-blue whitespace-no-wrap'>{event.time} hs</p>
    </td>
    <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <p class='text-blue whitespace-no-wrap'>
            {event.name}
        </p>
        </td>
        <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <span
            class='relative inline-block  text-blue leading-tight'>
            <span aria-hidden
                class='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
        <span class='relative'>{event.adviser.fullName}</span>
        </span>
    </td>
    <td class='px-5 py-5 border-b border-gray-200  text-sm cursor-pointer' onClick={deleteEvent}>
        <img src={iconDelete} alt="" />									
    </td>
    
</tr>
);
}

export default TableRow;