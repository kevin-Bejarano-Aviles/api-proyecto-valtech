import { useState } from "react";



function functionEvents(){
    
    const [banSearch,SetBandSearch]=useState(true);
    const [search,SetSearch]=useState('')
    
    const handleSearch = (event)=>{
		SetSearch(event.target.value)
		if (search) {
		  SetBandSearch(true)
		}
		else{
		  SetBandSearch(false)
		}
	}

    function nextPage() {
		// if(initrange+eventsToShow.length < cantEvents ){
		// 	setRange(initrange+8)
		// }
		console.log('alo');

	}

    function prevPage() {
		// if(initrange!==0){
		// 	setRange(initrange-8)
		// }
		console.log('alo');
	}

    function convertDate(date){
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

    function converTime(time){
		const timeArray=time.split(':')
		const timeString= timeArray[0]+':'+timeArray[2]
		return timeString;
	}

    return {
        handleSearch,
        nextPage,
        prevPage,
        converTime,
        convertDate
    }


}

export default functionEvents;