import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//inital state
const initialState = {
    transaction: [],
}

//create context

export const GlobalContext = createContext(initialState);


//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState); 
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload:id,
        })
    }
    //add transaction -->function type for invoking in reducer
    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        });
    }

    //return the Global context to its childeren for accessing the global state
    return (<GlobalContext.Provider value={{
        transaction: state.transaction,deleteTransaction,addTransaction
    }}>
        {/* Elements that wrraped around global context in app.jsx that gets the value mentioned using useContext() */}
        {children} 
    </GlobalContext.Provider>)
}