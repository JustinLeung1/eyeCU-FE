import React, {useContext, useState, useEffect} from 'react'
import { useLockSocket } from '../contexts/SocketContext/LockSocketContext/LockSocketProvider';
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
    const TIME = 1000;
    const lockSocket = useLockSocket();
    console.log(lockSocket);
    const [locked, setLocked] = useState(true);
    const BASEENDPOINT = 'http://10.0.0.208:5001/';
    //const BASEENDPOINT = 'http://10.0.0.135:5001/';
    if (lockSocket){
        lockSocket.on(("lockstatus"), (message)=>{
            const currentStatus = (message.status === "CLOSED") ? true : false;
            if (currentStatus !== locked){
                setLocked(currentStatus);
            }
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
        if (lockSocket){
            lockSocket.emit("status")
        }
        }, 1000); // this runs at every second
        return () => clearInterval(interval);
      }, []);

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
