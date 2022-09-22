import { useEffect } from 'react';
import iconDelete from '../img/Icon_delete.svg';


function TableRow({event}) {
    let date=event.date;
    let datestring=''
    function convertDate(){
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
    
    convertDate()
    return ( 
    <tr className='bg-transparent hover:bg-bgTable ' key={event.id}>
    <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <div class='flex items-center'>
                {/* <p>12/09/20021</p> */}
                {datestring} 
            </div>
    </td>
    <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <p class='text-gray-900 whitespace-no-wrap'>{event.time} hs</p>
    </td>
    <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <p class='text-gray-900 whitespace-no-wrap'>
            {event.name}
        </p>
        </td>
        <td class='px-5 py-5 border-b border-gray-200  text-sm'>
        <span
            class='relative inline-block font-semibold text-green-900 leading-tight'>
            <span aria-hidden
                class='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
        <span class='relative'>{event.participatingCounselor}</span>
        </span>
    </td>
    <td class='px-5 py-5 border-b border-gray-200  text-sm cursor-pointer'>
        <img src={iconDelete} alt="" />									
    </td>
    
</tr>
);
}

export default TableRow;