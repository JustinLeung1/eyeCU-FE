import React, {useRef, useState, useContext, useEffect} from 'react'
import { DispatchContext, StateContext } from '../contexts/AppContextProvider'
/**
 * 
 * Need to add logic to logout
 * Need to disable my camera and activity logs. can't do this otherwise it looks wonky
 * Need to add to pass prop to tell us which file it is
 * Need to add logic here to grab the picture from local storage of context
 */
 import { useNavigate } from "react-router-dom"
 import { logoutUser} from '../contexts/AuthContext/AuthActions';
export default function Sidebar(props) {
    const menuBar = useRef(null);
    const sidebar = useRef(null);
    const logoText = useRef(null);
    const logo = useRef(null);

    const handleMenuBarClick = () =>{
        if(logoText.current.style.display !== "none"){
            sidebar.current.classList.toggle('hide');
            logoText.current.style.display = "none";
            logo.current.style.width = "100%";
        }
        else {
            sidebar.current.classList.toggle('hide');
            logoText.current.style.display = "block";
            logo.current.style.width = "20%";
        }
    }


    const darkModeToggle = useRef(null);
    const handleDarkModeToggle = () =>{
        if(document.body.classList.contains("dark")){
            document.body.classList.remove("dark");
        }
        else{
            document.body.classList.add("dark");
        }
    }

    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    const [authenticated, setAuthenticated] = useState(authState.authenticated)
    const [userData, setUserData] = useState(authState.user_data)
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    useEffect(()=>{
      setAuthenticated(authState.authenticated)
      setUserData(authState.user_data)
    }, [authState])
  
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
        
        let direction = 1;
        let renderRatio = 0;
        let step = 0.01;
        let rest = 0;
        
        setInterval(function(){
            if (rest > 0){
                rest -= step;
            }
            else {
                upd(renderRatio * 1.04);
                renderRatio += (step * direction);
                if (renderRatio < 0.001){
                    rest = step * 100;
                }
        
                if (renderRatio > 1.04 || renderRatio < 0){
                    direction *= -1;
                    renderRatio += (2 * step * direction);
                }
            }
        }, 10);
        

      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

  return (
    <div>
        <section id="sidebar" ref={sidebar}>
            <a class="brand"> {/** Need to add active to this part */}
                <svg id="logo" viewBox="-100,-100,200,200" style={{width: "20%"}} ref={logo}>
                    <image id="user" x="-40" y="-40" width="80" height="80" href="img/user.svg" />
                    <image id="checkmark" x="10" y="-60" width="40" height="40" href="img/green_check.svg" />
                    <g id="bodies"></g>
                    <g id="edges"></g>
                </svg><br/>
                <span class="text" id="logoText" ref={logoText}>EyeCU</span>
            </a>
            <ul class="side-menu top">
                <li className={props.active === 'dashboard'? 'active' : ''}> {/** Here is where we add the logic for which one is clicked on */}
                    <a onClick={ () => navigate("/newhome")}>
                        <i class='bx bxs-dashboard'></i>
                        <span class="text" id="dashboard">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class='bx bxs-camera-home'></i>
                        <span class="text" id="myCamera">My Camera</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class='bx bxs-doughnut-chart'></i>
                        <span class="text">Activity Logs</span>
                    </a>
                </li>
            </ul>
            <ul class="side-menu">
                <li className={props.active === 'settings'? 'active' : ''}>
                    <a  onClick={() => navigate("/settings")}>
                        <i class='bx bxs-cog'></i>
                        <span class="text" id="settings">Settings</span>
                    </a>
                </li>
                <li>
                    <a onClick={()=>logoutUser(navigate, dispatch)} class="logout">
                        <i class='bx bxs-log-out-circle'></i>
                        <span class="text" id="logout">Logout</span>
                    </a>
                </li>
            </ul>
        </section>

        <section id="content">
            <nav>
                <i className='bx bx-menu' ref={menuBar} onClick={handleMenuBarClick}></i>
                <form action="#" style={{visibility: "hidden"}}>
                    <div className="form-input">
                        <input type="search" placeholder="Search..."/>
                        <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                    </div>
                </form>
                <input type="checkbox" id="switch-mode" hidden ref={darkModeToggle} onClick={handleDarkModeToggle}/>
                <label for="switch-mode" className="switch-mode"></label>
                <a  className="notification">
                    <i className='bx bxs-bell'></i>
                    <span className="num">8</span>
                </a>
                <a onClick={ () => navigate("/settings")} className="profile">
                    {userData?.image ? 
                            <>
                            <img src={userData?.image} id="miniProfile"/>
                            </>
                        :
                        <>
                            <img src={'/img/user.png'} id="miniProfile"/>
                        </>
                        }
                </a>
            </nav>
        </section>


    </div>
  )
}
