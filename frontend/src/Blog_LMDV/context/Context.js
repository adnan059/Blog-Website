import  React, { useEffect, useReducer }  from 'react';
import { reducer } from './Reducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export const AuthContext = React.createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{
    const [state, authDispatch] = useReducer(reducer, INITIAL_STATE)

   useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user)) 
   },[state.user])

    return (
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}