import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import Home from "./Home";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { AppContextProvider } from "../contexts/AppContextProvider";
import { GlobalContextProvider, StateContext, DispatchContext } from "../contexts/AppContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

axios.defaults.baseURL = 'http://localhost:5000'



function App() {

  const dispatch = useContext(DispatchContext);

  const checkForToken = () =>{
    const token = localStorage.FBIdToken;
    if (token){
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()){
        // this means that the token is active
        // store.dispatch(logoutUser());
        // window.location.href = '/login';
      }
      else{
        // this means the token is unactive
        // dispatch({ type: SET_AUTHENTICATED });
        // axios.defaults.headers.common['Authorization'] = token;
        // dispatch(getUserData());
      }
    }
  }


  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <Router>
        <GlobalContextProvider>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </GlobalContextProvider>
      </Router>
    </Container>
  );
}

export default App;
