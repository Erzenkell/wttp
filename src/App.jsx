import react from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Gamu from './components/Gamu'
import Chat from './components/Chat/Chat'
import './App.css'

function App() {

  const socketUrl = 'ws://localhost:8080';
  const { sendMessage, lastMessage, readyState } = useWebSocket(
      socketUrl,
      {
          share: true,
          shouldReconnect: () => true,
          reconnectAttempts: 10,
          reconnectInterval: 3000,
      }
  );

  return (
    <div className='app'>
      <Gamu sendJsonMessage={sendMessage} lastJsonMessage={lastMessage}/>
      <Chat lastMessage={lastMessage} sendMessage={sendMessage}/>
    </div>
  )
}

export default App
