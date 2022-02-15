import React from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";

import axios from 'axios';
import jwtDecode from "jwt-decode";
import { AppContextProvider } from "../contexts/AppContextProvider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

axios.defaults.baseURL = 'http://localhost:5000'
const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){
    // this means that the token is active
  }
  else{
    // this means the token is unactive
  }
}

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <Router>
        <AppContextProvider>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </AppContextProvider>
      </Router>
    </Container>
  );
}

export default App;
