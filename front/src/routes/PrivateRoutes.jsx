import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../context/Context';

function PrivateRoutes({children}) {
    const {state}=useContext(Context)
    return ( (state)?children : <Navigate to='/'/>  
       
     );
}

export default PrivateRoutes;