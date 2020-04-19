import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

export const SnackContext = createContext();
const initialState = {
    message: null,
    display: false,
    severity: null
};

const Provider = (props) => {
    const [state, dispatchSnack] = useReducer(reducer, initialState);
    return (
        <SnackContext.Provider value={{ state, dispatchSnack }}>
            {props.children}
        </SnackContext.Provider>
    )
}

export default Provider;
