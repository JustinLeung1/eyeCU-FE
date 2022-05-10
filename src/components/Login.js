// import React from 'react'

// export default function Login() {
//   return (
//     <div>Login</div>
//   )
// }

import React, { useContext, useEffect, useRef, useState, componentDidMount } from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { loginUser, test } from '../contexts/AuthContext/AuthActions';
import { DispatchContext, StateContext } from '../contexts/AppContextProvider';
import $ from 'jquery';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [localErrors, setLocalErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [authState, uiState] = useContext(StateContext);
  if (authState.authenticated) {
    navigate("/newhome");
  }
  const [authenticated, setAuthenticated] = useState(authState.authenticated);
  const [errors, setErrors] = useState(uiState.errors)
  const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)


  useEffect(() => {
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
  }, [uiState.errors, uiState.loading]);

  function handleSubmit(e) {
    e.preventDefault()
    setErrors({});
    setLoading(true)
    const object = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    loginUser(object, navigate, dispatch)

  }




  return (
    // <div className="w-100" style={{maxWidth:'400px'}}>
    //   <Card>
    //       <Card.Body>
    //           <h2 className='text-center mb-4'>Log in</h2>
    //           {errors && <Alert variant="danger">{errors.general}</Alert>}
    //       </Card.Body>
    //       <Form className="input-wrapper" onSubmit={handleSubmit}>
    //           <Form.Group id="email">
    //             <Form.Label>Email</Form.Label>
    //             <Form.Control type="email" ref={emailRef}required/>
    //           </Form.Group>
    //           <Form.Group id="password">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" ref={passwordRef}required/>
    //           </Form.Group>
    //           <Button type="submit" disable={loading.toString() || nonLocalLoading.toString()}className='w-100'>Log In</Button>
    //       </Form>
    //   </Card>
    //   <div className='w-100 text-center mt-2'>
    //       Don't have an account? <Link to="/signup">Sign up</Link>
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
            <h2 className='headerText'>Log in</h2>
          </div>
        </div>
        <div className='inputTextContainer'>
          <form className='formContainer' onSubmit={handleSubmit}>
            <input className='input' type='email' placeholder='Email' ref={emailRef} required />
            <input className='input' type='password' placeholder='Password' ref={passwordRef} required />
            <button className='submitBtn' type='submit' disable={loading.toString() || nonLocalLoading.toString()}>Log in</button>
            <a className='mutedLinks' href="#">Don't have an account? <a className='boldLinks' href="/signup">Sign up</a></a>
          </form>
        </div>
      </div >
    </div>
  )
}
