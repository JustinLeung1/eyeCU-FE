import React, {useContext, useEffect, useRef, useState} from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
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

    const [authenticated, setAuthenticated] = useState(authState.authenticated);
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    //const [nonlocalErrors, setNonlocalErrors] = useState(uiState);
    // Todo we must figure out how to get the errors from the state to the be presented - Done
    // Must add validation on front end before sending over to the front end
    
    // This function will update our errors ors 
    console.log(authState)
    useEffect(()=>{
      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

    function handleSubmit(e){
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}required/>
              </Form.Group>
              <Button type="submit" disable={loading.toString() || nonLocalLoading.toString()}className='w-100'>Sign Up</Button>
          </Form>
      </Card>
      <div className='w-100 text-center mt-2'>
          Already have an account? Log In
      </div>
    </div>
  )
}
