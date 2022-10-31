import { useEffect,useState } from 'react';
import useGet from '../../hooks/useGet';

function functionEvents(){
    const {getAllEvents,getAllEventsByFilter,eventList,totalPagesEvent,totalEventsGet,totalEvents}=useGet();
    const [limit,setLimit]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [search,SetSearch] = useState('');
    const [bandSearch,SetBandSearch]=useState(true);

    const  convertDate = (Date)=>{
      const date=Date.split('T')[0]
      let convertDatestring=''
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < date.length; index++) {
          const element = date[index];
          if(element==='-'){
              convertDatestring+='/'
          }
          else{
              convertDatestring+=element;
          }
      }
      return convertDatestring;
    }

    const  converTime = (time)=>{
      const timeArray=time.split(':')
      const timeString= `${timeArray[0]}:${timeArray[2]}`
      return timeString;
    }

    const nextPage = ()=> {
      if(currentPage<totalPagesEvent){
        setLimit(limit+8)
        setCurrentPage(currentPage+1);
      }
	  }

    const prevPage=()=> {
      if(currentPage>1){
        setLimit(limit-8)
        setCurrentPage(currentPage-1)
      }
    }

    const handleSearch = (event)=>{
      SetSearch(event.target.value)
      if (search) {
        SetBandSearch(true);
        if (search.length===1) {
          setLimit(0);
        }
      }
      else{
        SetBandSearch(false);
      }
    }
  

    useEffect(()=>{
      if (!bandSearch) {
        getAllEvents(limit);
      }
      else if(bandSearch){
        getAllEventsByFilter(search,limit)
      }
    },[currentPage])
   

    useEffect(()=>{
      if (search.length>1) {
        getAllEventsByFilter(search,limit)
      }
      else{
        getAllEvents(limit);
      }
    },[search])

    return {
        getAllEvents,
        nextPage,
        prevPage,
        converTime,
        convertDate,
        handleSearch,
        currentPage,
        eventList,
        totalEventsGet,
        totalEvents,
        limit
    }
}

export default functionEvents