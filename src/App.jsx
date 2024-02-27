import react from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Gamu from './components/Gamu'
import Chat from './components/Chat/Chat'
import './App.css'

function App() {

  const socketUrl = 'ws://localhost:8080';
  const { sendMessage, lastMessage, sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
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
      <Gamu sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage}/>
      <Chat lastMessage={lastMessage} sendMessage={sendMessage}/>
    </div>
  )
}

export default App
