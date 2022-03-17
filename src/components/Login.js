// import React from 'react'

// export default function Login() {
//   return (
//     <div>Login</div>
//   )
// }

import React, {useContext, useEffect, useRef, useState} from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { loginUser, test } from '../contexts/AuthContext/AuthActions';
import { DispatchContext, StateContext } from '../contexts/AppContextProvider';
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [localErrors, setLocalErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);

    const [authenticated, setAuthenticated] = useState(authState.authenticated);
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    useEffect(()=>{
      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

    function handleSubmit(e){
        e.preventDefault()
        setErrors({});
        setLoading(true)
        const object = {
          username: emailRef.current.value,
          password: passwordRef.current.value,
        }
        loginUser(object, navigate, dispatch)

    }
  return (
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Card>
          <Card.Body>
              <h2 className='text-center mb-4'> Sign Up</h2>
              {errors && <Alert variant="danger">{errors.general}</Alert>}
          </Card.Body>
          <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef}required/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef}required/>
              </Form.Group>
              <Button type="submit" disable={loading.toString() || nonLocalLoading.toString()}className='w-100'>Sign Up</Button>
          </Form>
      </Card>
      <div className='w-100 text-center mt-2'>
          Don't have an account? <Link to="login">Sign up</Link>
      </div>
    </div>
  )
}
