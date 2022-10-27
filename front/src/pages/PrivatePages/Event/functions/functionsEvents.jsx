import { useEffect } from "react";
import { useState } from "react";
import useGet from "../../hooks/useGet";

// Recibe eventos como prop

// const [offset, setOffset] = useState(0);
// const [limit, setLimit] = useState(8);
// const [eventList, setEventList] = useState(events);

// const [active, setActive] = useState(false);

// Cambio minimo y maximo de eventos que se muestran
// const prevPage = () => { setOffset(offset - 8); setLimit(limit - 8); }
// const nextPage = () => { setOffset(offset + 8); setLimit(limit + 8); }

// useEffect(() => {
//     const changeEventPages = () => {
//         Hago un slice de la lista de eventos
//         const slicedEvents = events.slice(offset, limit);
//         Define ese array como la lista de eventos
//         setEventList(slicedEvents)
//     }
//     changeEventPages()
// }, [offset, limit, events])

function functionEvents(){
    const {getAllEvents,eventList,totalEventPages}=useGet();
    const[clickNextButon,setclickNextButon]=useState(false);
    const[clickPrevButon,setclickPrevButon]=useState(false);
    // const [banSearch,SetBandSearch]=useState(true);
    //lo que me guarda aca es el primer id del evento
    const [limit,setLimit]=useState(0);
    //me dice la pagina en el que esta parado el usuario
    const [currentPage,setCurrentPage]=useState(1);

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

    // const handleSearch = (event)=>{
		//   SetSearch(event.target.value)
		//   if (search) {
		//     SetBandSearch(true)
		//   }
		//   else{
		//     SetBandSearch(false)
		//   }
	  // }

    const nextPage = ()=> {
      console.log('click next page');
      console.log('total pages'+totalEventPages);
      if(currentPage<=totalEventPages){
        console.log('limite es:'+limit);
        setclickNextButon(true);
        setLimit(limit+10)
        setCurrentPage(currentPage+1);
      }
	  }

    const prevPage=()=> {
      console.log('click prev page');
      if(currentPage>1){
        console.log('limite es:'+limit);
        console.log('currentPage es:'+currentPage);
        setLimit(limit-10)
        setCurrentPage(currentPage-1)
      }
    }

    useEffect(()=>{
          // llamo al evento pero a partir de un indice
          if(currentPage<=totalEventPages && clickNextButon===true){
            getAllEvents(limit);
            console.log('useEfect condicion');
          }
          
    },[currentPage])
   
    return {
        getAllEvents,
        nextPage,
        prevPage,
        converTime,
        convertDate,
        currentPage,
        eventList
    }
}

export default functionEvents