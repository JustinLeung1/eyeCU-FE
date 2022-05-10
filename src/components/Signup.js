import React, {useContext, useEffect, useRef, useState} from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { loginUser, signUpUser, test } from '../contexts/AuthContext/AuthActions';
import { DispatchContext, StateContext } from '../contexts/AppContextProvider';
import $ from 'jquery';

export default function Signup() {
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [localErrors, setLocalErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [globalState, globalDispatch] = useContext(GlobalContext);
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    if(authState.authenticated){
      navigate("/newhome");
    }
    const [authenticated, setAuthenticated] = useState(authState.authenticated);
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    //const [nonlocalErrors, setNonlocalErrors] = useState(uiState);
    // Todo we must figure out how to get the errors from the state to the be presented - Done
    // Must add validation on front end before sending over to the front end
    


    // This function will update our errors ors 
    useEffect(()=>{

      const SHUTTER_WING_COUNT = 8;

    let r = 80,
      arc = (x, y, s) => `A${r},${r},0,0,${s},${x},${y}`,
      path = (i, d) => `<path transform='rotate(${i / +SHUTTER_WING_COUNT * 360})' ${d}></path>`;

    function upd(val) {
      // Animate shutter
      let step = Math.PI * (0.5 + 2 / +SHUTTER_WING_COUNT);
      let p1x = Math.cos(step) * r;
      let p1y = Math.sin(step) * r;
      let cos = Math.cos(-val);
      let sin = Math.sin(-val);
      let c1x = p1x - cos * p1x - sin * p1y;
      let c1y = p1y - cos * p1y + sin * p1x;
      let dx = - sin * r - c1x;
      let dy = r - cos * r - c1y;
      let dc = Math.sqrt(dx * dx + dy * dy);
      let a = Math.atan2(dy, dx) - Math.acos(dc / 2 / r);
      let x = c1x + Math.cos(a) * r;
      let y = c1y + Math.sin(a) * r;

      let edges = document.getElementById("edges");
      let bodies = document.getElementById("bodies");
      let user = document.getElementById("user");
      let checkmark = document.getElementById("checkmark");

      let edge = `M${p1x},${p1y}${arc(0, r, 0)}${arc(x, y, 1)}`;
      edges.innerHTML = bodies.innerHTML = '';
      for (let i = 0; i < +SHUTTER_WING_COUNT; i++) {
        edges.innerHTML += path(i, `fill=none stroke=white d='${edge}'`);
        bodies.innerHTML += path(i, `fill=var(--blue) d='${edge}${arc(p1x, p1y, 0)}'`);
      }

      // Animate user
      user.style.opacity = (1 - val * 2);

      // Animate check
      checkmark.style.opacity = (1 - val * 8);
    };

    upd(0.5);


    function handleMouseOver(e) {
      var $this = $("#logo");
      var offset = $this.offset();
      var width = $this.width();
      var height = $this.height();

      var centerX = offset.left + width / 2;
      var centerY = offset.top + height / 2;


      let distance = Math.sqrt(Math.pow(e.x - centerX, 2) + Math.pow(e.y - centerY, 2));

      upd(e.y / window.innerHeight * 1.04);

      // upd( Math.min(1 - Math.min(1 - distance / width, 1), 1.04)  )
    }

    let logo = document.getElementById("logo");
    window.addEventListener("mousemove", handleMouseOver)


      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

    function handleSubmit(e){
        e.preventDefault()
        setErrors({});
        setLoading(true)
        if(passwordRef.current.value != passwordConfirmRef.current.value){
          return setErrors({general:"Passwords do not match!"}); // need to keep errors here
        }
        const object = {
          username: userRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: passwordConfirmRef.current.value 
        }
        signUpUser(object, navigate("/login"), dispatch)

    }
  return (
      // <div className="w-100" style={{maxWidth:'400px'}}>
      //   <Card>
      //       <Card.Body>
      //           <h2 className='text-center mb-4'> Sign Up</h2>
      //           {errors && <Alert variant="danger">{errors.general}</Alert>}
      //       </Card.Body>
      //       <Form onSubmit={handleSubmit}>
      //           <Form.Group id="username">
      //             <Form.Label>Name for Identification</Form.Label>
      //             <Form.Control type="username" ref={userRef}required/>
      //           </Form.Group>
      //           <Form.Group id="email">
      //             <Form.Label>Email</Form.Label>
      //             <Form.Control type="email" ref={emailRef}required/>
      //           </Form.Group>
      //           <Form.Group id="password">
      //             <Form.Label>Password</Form.Label>
      //             <Form.Control type="password" ref={passwordRef}required/>
      //           </Form.Group>
      //           <Form.Group id="password-confirm">
      //             <Form.Label>Password Confirmation</Form.Label>
      //             <Form.Control type="password" ref={passwordConfirmRef}required/>
      //           </Form.Group>
      //           <Button type="submit" disable={loading.toString() || nonLocalLoading.toString()}className='w-100'>Sign Up</Button>
      //       </Form>
      //   </Card>
      //   <div className='w-100 text-center mt-2'>
      //       Already have an account? <Link to="/login">Log In</Link>
      //   </div>
      // </div>
      <div className="login-container">
      <div className='logo-container'>
        <svg id="logo" viewBox="-100,-100,200,200">
          <image id="user" x="-40" y="-40" width="80" height="80" href="./img/user.svg" />
          <image id="checkmark" x="10" y="-60" width="40" height="40" href="./img/green_check.svg" />
          <g id="bodies"></g>
          <g id="edges"></g>
        </svg>
      </div>
      <div className="boxContainer">
        <div className='topContainer'>
          <div className='backDrop'>
          </div>
          <div className='headerContainer'>
            <h2 className='headerText'>Sign up</h2>
            {errors && <Alert variant="danger">{errors.general}</Alert>}
          </div>
        </div>
        <div className='inputTextContainer'>
          <form className='formContainer' onSubmit={handleSubmit}>
            <input className='input' type='text' placeholder='Name for Identification' ref={userRef} required />
            <input className='input' type='email' placeholder='Email' ref={emailRef} required />
            <input className='input' type='password' placeholder='Password' ref={passwordRef} required />
            <input className='input' type='password' placeholder='Password Confirm' ref={passwordConfirmRef} required />
            <button className='submitBtn' type='submit' disable={loading.toString() || nonLocalLoading.toString()}>Sign up</button>
            <a className='mutedLinks' href="#">Already have an account? <a className='boldLinks' href="/login">Log in</a></a>
          </form>
        </div>
      </div >
    </div>
  )
}
