import { useEffect } from "react";
import { useState } from "react";
import useGet from "../../hooks/useGet";


function functionEvents(){
    const {getAllEvents,eventList,totalEventPages}=useGet();
    const[clickNextButon,setclickNextButon]=useState(false);
    const[clickPrevButon,setclickPrevButon]=useState(false);
    const [banSearch,SetBandSearch]=useState(true);
    const [initRange,setInitRange]=useState(0);
    const [search,SetSearch]=useState('');
    let currentPage=0;

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
      setclickPrevButon(false);
      setclickNextButon(true);
      if(currentPage<totalEventPages){
        console.log('totalEventPages:'+totalEventPage);
        console.log('entra condicion de nextButton '+(initRange+10));
        setInitRange(initRange+10);
        currentPage=currentPage+1
      }
	  }

    const prevPage=()=> {
      setclickNextButon(false);
      setclickPrevButon(true);
      if(currentPage>=0 && initRange>0){
        console.log('se le resta'+ (initRange-10));
        console.log('prev page init range'+(initRange-10));
        setInitRange(initRange-10)
        currentPage=currentPage+1
      }
    }

    useEffect(()=>{
        console.log('useEfect la pagina ahora es '+currentPage);
        console.log('useefect rango donde empieza '+initRange);
        if(currentPage<=totalEventPages ){
          getAllEvents(initRange);
        }
        else if(initRange===0){
          console.log('inir range es igual a 0');
          getAllEvents(initRange);
        }
    },[currentPage])
   
    return {
        getAllEvents,
        handleSearch,
        nextPage,
        prevPage,
        converTime,
        convertDate,
        currentPage,
        eventList
    }
}

export default functionEvents