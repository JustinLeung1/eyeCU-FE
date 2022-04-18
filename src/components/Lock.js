import React, {useContext, useState, useEffect} from 'react'
import {io} from "socket.io-client";
 // this currently works but we need to disable clicking until it is set
export default function Lock() {
    const openLock = () =>{
        fetch(BASEENDPOINT + '/status/open', {
            method:'POST',
            mode:'no-cors'
        });
    }
    const closeLock = () =>{
        fetch(BASEENDPOINT + '/status/close', {
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
    const BASEENDPOINTlock = 'http://192.168.1.18:5002/';
    const BASEENDPOINT = 'http://0.0.0.0:5001/';
    const TIME = 1000;
    const [locked, setLocked] = useState(true);
    const [socket, setSocket] = useState();
    useEffect(()=>{
        const newSocket = io(BASEENDPOINTlock + 'web', {
            transports:["polling", "websocket"]
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
        {socket ? 
            <>
                {locked ? 
                    <img src={"/LockIcon.png"} onClick={openLock}></img>
                : 
                    <img src={"/UnlockIcon.png"} onClick={closeLock}></img>
                }
            </>
        :
            <img src={"/BrokenLock.png"}/>
    
        }


    </div>
  )
}
