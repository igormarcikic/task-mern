import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

export const AuthContext = createContext();
const initialState = {
    userData: {
        user: null,
        token: null
    },
    error: null
};

const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {props.children}
        </AuthContext.Provider>       
    )
}

export default Provider;
