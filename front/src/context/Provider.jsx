import { useReducer } from 'react';
import Context from './Context';
import Reducer from './Reducer';
import types from './types';

const init=()=>{
    const valor=localStorage.getItem('estado')
    return{
        estado:!!valor //si esxiste un valor lo guarda como false o true
    }
}

const Provider = ({children}) =>{
    const logearme =()=>{
        localStorage.removeItem('estado')
        const action={
            type:types.login
        }
        localStorage.setItem('estado',true)
        dispatch(action)
    }

    const deslogearme =()=>{
        const action={
            type:types.logout
        }
        //no tengo que cambiar el estado a false porque solo se fija que exista
        localStorage.removeItem('estado')
        dispatch(action)
    }
    const [logeado,dispatch]=useReducer(Reducer,{},init)
    return(
        <Context.Provider value={{
            ...logeado,
                logearme,
                deslogearme
            }}>
            {children}
        </Context.Provider>
    )
}

export default Provider;