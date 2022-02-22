import React, { useContext, useEffect, useRef, useState } from 'react'
import { DispatchContext, StateContext } from '../contexts/AppContextProvider'
import { authIntialState } from '../contexts/AuthContext/authReducer';
export default function Home() {
  const dispatch = useContext(DispatchContext);
  const [authState, uiState] = useContext(StateContext);
  // const authenticated = useRef(authState.authenticated) // ok we can use this to get the current user information from data base
  // const userData = useRef(authState.user_data)

  const [authenticated, setAuthenticated] = useState(authState.authenticated)
  const [userData, setUserData] = useState(authState.user_data)
  

  useEffect(()=>{
    setAuthenticated(authState.authenticated)
    setUserData(authState.user_data)
  }, [authState])
  // useEffect(()=>{

  // }, [authState])
  return (
    <>
      <div>Home</div>
      <div>{authenticated}</div>
    </>
  )
}
