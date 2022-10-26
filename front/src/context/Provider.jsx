import { useReducer } from 'react';
import Context from './Context';
import Reducer from './Reducer';
import types from './types';

const init=()=>{
    const vlue=localStorage.getItem('state')
    return{
        state:!!vlue 
    }
}

const Provider = ({children}) =>{
    // localStorage.removeItem('state')
    const logIn =()=>{
        const action={
            type:types.login
        }
        localStorage.setItem('state',true)
        dispatch(action)
    }

    const logOut =()=>{
        const action={
            type:types.logout
        }
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('state');
        dispatch(action)
    }
    const [loggedIn,dispatch]=useReducer(Reducer,{},init)
    return(
        <Context.Provider value={{
            ...loggedIn,
                logIn,
                logOut
            }}>
            {children}
        </Context.Provider>
    )
}

export default Provider;