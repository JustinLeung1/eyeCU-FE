import React, {useContext, useEffect, useState} from 'react'
import socketIOClient from "socket.io-client";
const LockSocketContext = React.createContext();

export function useLockSocket(){
    return useContext(LockSocketContext);
}

//const ENDPOINT = "http://10.0.0.135:5001/web"; // this is the one for the actual raspberry pi TODO change this to the final endpoint
const ENDPOINT = "http://10.0.0.208:5001/web"; 
export default function LockSocketProvider({children}) {
    const [socket, setSocket] = useState();
    useEffect(()=>{
        const newSocket = socketIOClient(ENDPOINT, {
            transports:["websocket"]
          });
        console.log(newSocket)
        setSocket(newSocket);
        return () => newSocket.close()
    }, [])
    return (
        <LockSocketContext.Provider value={socket}>
            {children}
        </LockSocketContext.Provider>
      );
}
