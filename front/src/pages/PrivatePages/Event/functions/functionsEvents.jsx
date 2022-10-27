import { useEffect,useState } from "react";
import useGet from "../../hooks/useGet";

function functionEvents(){
    const {getAllEvents,eventList,totalPagesEvent,totalEventsGet,totalEvents}=useGet();
    const [limit,setLimit]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);

    const  convertDate = (date)=>{
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
        setLimit(limit+10)
        setCurrentPage(currentPage+1);
      }
	  }

    const prevPage=()=> {
      if(currentPage>1){
        setLimit(limit-10)
        setCurrentPage(currentPage-1)
      }
    }

    useEffect(()=>{
        getAllEvents(limit);
    },[currentPage])
   
    return {
        getAllEvents,
        nextPage,
        prevPage,
        converTime,
        convertDate,
        currentPage,
        eventList,
        totalEventsGet,
        totalPagesEvent,
        totalEvents,
        limit
    }
}

export default functionEvents