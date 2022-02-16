import React, {useContext, useRef, useState} from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { loginUser, signUpUser, test } from '../contexts/AuthContext/AuthActions';
import { DispatchContext, StateContext } from '../contexts/AppContextProvider';
export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [localErrors, setLocalErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [globalState, globalDispatch] = useContext(GlobalContext);
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    
    // Todo we must figure out how to get the errors from the state to the be presented
    function handleSubmit(e){
        console.log(authState)
        console.log(uiState)
        e.preventDefault()
        setLocalErrors("");
        setLoading(true)
        const object = {
          username: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: passwordConfirmRef.current.value 
        }
        signUpUser(object, navigate, dispatch)
        
        // try{
        //   setLocalErrors("");
        //   setLoading(true)
        //   const object = {
        //     username: emailRef.current.value,
        //     password: passwordRef.current.value,
        //     confirmPassword: passwordConfirmRef.currentl.value 
        //   }
        //   //signUpUser(object, navigate, dispatch);
        //   test(object, navigate, dispatch);
        //   console.log("should have called test")
        // }catch{
        //   setLocalErrors("Failed to log in")
        // }

    }
  return (
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Card>
          <Card.Body>
              <h2 className='text-center mb-4'> Sign Up</h2>
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}required/>
              </Form.Group>
              <Button type="submit" className='w-100'>Sign Up</Button>
          </Form>
      </Card>
      <div className='w-100 text-center mt-2'>
          Already have an account? Log In
      </div>
    </div>
  )
}
