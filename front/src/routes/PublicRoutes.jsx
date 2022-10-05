import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../context/Context';

function PublicRoutes({children}) {
    const {state}=useContext(Context)
    return ( (!state)?children : <Navigate to='/inicio'/>  
       
     );
}

export default PublicRoutes;