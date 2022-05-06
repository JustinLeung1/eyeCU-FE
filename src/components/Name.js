import React, {useEffect, useState} from 'react'
import {io} from "socket.io-client";

export default function Name() {
  const BASEENDPOINT = "http://0.0.0.0:5001/";
  const [name, setName] = useState('');
  const [socket, setSocket] = useState();


  useEffect(()=>{
    const nameListener = (message) =>{
      setName(message.name);
    }

    const newSocket = io(BASEENDPOINT + 'web', {
        transports:["polling","websocket"]
    });
    newSocket.on('connect', ()=>{
        console.log("connected to socket")
        setSocket(newSocket);
    })
    newSocket.on('server2web', nameListener)
    return ()=>{
        newSocket.disconnect();
    }
  }, [])
  return (
    <div>
      {socket ? 
      <div>
          <h1>{name}</h1>
          </div>
        :
        <div>
          <h1>{name}</h1>
          </div>
      }
      
    </div>
  )
}
