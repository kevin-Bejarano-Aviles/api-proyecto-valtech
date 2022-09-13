import Button from "../components/Button";
import {  useNavigate } from "react-router-dom";

function EventsPage() {
    let navigate = useNavigate();

    return ( 
        <>
        <div className="flex justify-between">
            <div className="flex">
                <h1 className="absolute z-1 text-2xl font-semibold">Todos los eventos</h1>
                <div className="h-3.5 w-56  bg-backgroundGray"></div>
            </div>
            <Button
                type="button"
                name="Agendar evento"
                handleFunction={()=>{navigate("/eventos/crear-evento")}}
            />
        </div>
        <div class="">
            
        </div>
        </>
     );
}

export default EventsPage;