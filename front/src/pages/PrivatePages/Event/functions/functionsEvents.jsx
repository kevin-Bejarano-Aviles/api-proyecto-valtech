import { useEffect } from "react";
import { useState } from "react";
import useGet from "../../hooks/useGet";


function functionEvents(){
    const {getAllEvents,eventList,totalEventPages}=useGet();
    const [banSearch,SetBandSearch]=useState(true);
    const [search,SetSearch]=useState('');
    const [currentPage,setCurrentPage]=useState(1);

    // const calculateTotalPages = (totalEvent)=>{
    //     let restEvents=0
    //     let total=totalEvent;
    //     while(total>10){
    //       if(total>10){
    //         totalPages+=1
    //       }
    //       total-=10;
    //       restEvents=totalPages;
    //     }
    //     if(restEvents===0 && total>0){
    //       totalPages += 1;
    //     }
    //     else if(restEvents>0){
    //       totalPages += 1;
    //     }
    //     console.log(totalPages);
    // }

    const handleSearch = (event)=>{
		  SetSearch(event.target.value)
		  if (search) {
		    SetBandSearch(true)
		  }
		  else{
		    SetBandSearch(false)
		  }
	  }

    const nextPage = ()=> {
      console.log('ejecutado');

      console.log(totalEventPages);
      if(currentPage<totalEventPages){
        setCurrentPage(currentPage+1);
      }
	  }

    const  prevPage=()=> {
		// if(initrange!==0){
		// 	setRange(initrange-8)
		// }
		console.log('alo');
	  }

    const  convertDate = (date)=>{
        let convertDatestring=''
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
      const timeString= timeArray[0]+':'+timeArray[2]
      return timeString;
	  }

    useEffect(()=>{
      getAllEvents(currentPage*10)
    },[currentPage])
   

    return {
      getAllEvents,
      currentPage,
        handleSearch,
        nextPage,
        prevPage,
        converTime,
        convertDate,
        eventList,
    }


}

export default functionEvents;