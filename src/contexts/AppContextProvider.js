import React, { createContext, useCallback, useMemo, useReducer, useContext } from "react";
import { combineComponents } from "../utils/combine";
// token stuff
import axios from "axios";
import jwtDecode from "jwt-decode";
import { processDispatch } from "../utils/utils";
import { SET_AUTHENTICATED } from "./types";

import { AuthProvider } from "./AuthContext/AuthContext";
import { UIProvider } from "./UIContext/UIContext";
import { getUserData, logoutUser } from "./AuthContext/AuthActions";
import authReducer, { authIntialState } from "./AuthContext/authReducer";
import uiReducer, { uiInitialState } from "./UIContext/uiReducer";
const providers = [
    AuthProvider,
    UIProvider
]

const reducers = {
    authReducer:authReducer,
    uiReducer: uiReducer
}

const initialState = {
    authIntialState: authIntialState,
    uiInitialState: uiInitialState
}
    
const combineDispatch = (...dispatches) => (action) =>
  dispatches.forEach((dispatch) => dispatch(action));


const combineDictionaries = (dics) =>{
    
}
const combineReducers = (slices) => {
    return (state, action) =>
      Object.keys(slices).reduce(
        (acc, prop) => ({
          ...acc,
          [prop]: slices[prop](acc[prop], action)
        }),
        state
      )
  }
  
const reduceReducers = (...reducers) => { 
    return (state, action) =>
      reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state)
  }

export const GlobalContext = createContext({});
export const DispatchContext = createContext();
export const StateContext = createContext();

export const GlobalContextProvider = ({ children }) =>{
    
    const [authState, authDispatch] = useReducer(authReducer, authIntialState);
    const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialState);

    const combinedDispatch = useCallback(combineDispatch(authDispatch, uiDispatch), [authDispatch, uiDispatch]);
    const combinedState = useMemo(()=>({authState, uiState, }, [authState, uiState]));

    // const rootReducer = combineReducers(authReducer, uiReducer)

    // const [state, sdispatch] = useReducer(rootReducer, combinedState)
    // const store = useMemo(() => [state, sdispatch],[state])

    const dispatch = combineDispatch

    console.log("checking for token")
    const token = localStorage.FBIdToken;
    if (token){
      const decodedToken = jwtDecode(token);
      if ((decodedToken.exp * 1000) < Date.now()){
        logoutUser(dispatch);
        window.location.href = '/login';
      }
    else{
      processDispatch(dispatch, SET_AUTHENTICATED)
      axios.defaults.headers.common['Authorization'] = token;
      getUserData(dispatch)
      }
    }
    else{
      console.log("Token not found")
    }



    return(
        <DispatchContext.Provider value={combinedDispatch}>
            <StateContext.Provider value={combinedState}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
        // <GlobalContext.Provider value={store}>
        //     {children}
        // </GlobalContext.Provider>
    )
}



export const AppContextProvider = combineComponents(...providers);