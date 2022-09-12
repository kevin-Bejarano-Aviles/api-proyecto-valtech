import Button from "../components/Button";
import {  useNavigate } from "react-router-dom";

function EventsPage() {
    let navigate = useNavigate();

    return ( 
        <>
        <div>
            <h1>Todos los eventos</h1>
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