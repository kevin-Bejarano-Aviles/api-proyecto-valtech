import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../context/Context';

function PrivateRoutes({children}) {
    const {estado}=useContext(Context)
    return ( (estado)?children : <Navigate to='/inicio'/>  
       
     );
}

export default PrivateRoutes;