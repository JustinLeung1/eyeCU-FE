import React, {useContext, useState, useEffect} from 'react'
import {io} from "socket.io-client";
 // this currently works but we need to disable clicking until it is set
export default function Lock() {
    const openLock = () =>{
        fetch(BASEENDPOINT + 'open', {
            method:'POST',
            mode:'no-cors'
        });
    }
    const closeLock = () =>{
        fetch(BASEENDPOINT + 'close', {
            method:'POST',
            mode:'no-cors'
        });
    }

    const handleClick = (e) =>{
        if (e === 'open'){
            openLock();
        }
        else{ 
            closeLock();
        }
    }
    const BASEENDPOINT = 'http://10.0.0.208:5001/';
    const TIME = 1000;
    const [locked, setLocked] = useState(true);
    const [socket, setSocket] = useState();
    useEffect(()=>{
        const newSocket = io(BASEENDPOINT + 'web', {
            transports:["websocket"]
        });
        newSocket.on('connect', ()=>{
            setSocket(newSocket);
        })
        return ()=>{
            newSocket.disconnect();
        }
    }, [])
    
    if (socket){
        socket.on(("lockstatus"), (message)=>{
            const currentStatus = (message.status === "CLOSED") ? true : false;
            if (currentStatus !== locked){
                setLocked(currentStatus);
            }
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (socket){
                socket.emit("status");
            }
        }, 1000); // this runs at every second
        return () => clearInterval(interval);
      }, [socket]);

  return (
    <div>
        <h1>Lock</h1>
        {locked ? 
                <img src={"/LockIcon.png"} onClick={openLock}></img>

        : 

                <img src={"/UnlockIcon.png"} onClick={closeLock}></img>

        }

    </div>
  )
}
