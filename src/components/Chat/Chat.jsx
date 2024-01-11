import react, {useState, useEffect} from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './Chat.css'

export const Chat = () => {

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
    const [username, setUsername] = useState(null);
    const [tmpUsername, setTmpUsername] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");

    function arrayBufferToString(buffer) {
        let str = '';
        const array = new Uint8Array(buffer);
        for (let i = 0; i < array.length; i++) {
          str += String.fromCharCode(array[i]);
        }
        return JSON.parse(str);
    }

    useEffect(() => {
        console.log(lastMessage)
        if (lastMessage !== null) {
            const messageObject = JSON.parse(lastMessage.data);
            const message = arrayBufferToString(messageObject.data);
            setMessageList([...messageList, message]);
        }
        console.log(messageList)
    }, [lastMessage]);

    function sendMessageToServer(message, username) {
        if (message === "" || username === null) return;
        const messageObject = {
            username: username,
            message: message
        }
        sendMessage(JSON.stringify(messageObject));
    }

    return (
        <div className='chat-wrapper'>
            <div className="chat-header">
                {username !== null ?
                <>
                        <h3>Hi, {username}</h3>
                </> : 
                <>
                    <input type="text" placeholder="Username" onChange={(event) => setTmpUsername(event.target.value)}/>
                    <button onClick={() => setUsername(tmpUsername)}>Submit</button>
                </> }
            </div>
            <div className='chat-body'>
                {messageList.map((val, key) => {
                    return (
                        <div className="chat-message" key={`message-${key}`}>
                            <div className="message-username">{val.username}:</div>
                            <div className="message-text">{val.message}</div>
                        </div>
                    )
                })}
            </div>
            <div className='chat-footer'>
                <input type="text" placeholder="Message" onChange={(event) => setMessage(event.target.value)}/>
                <button onClick={() => sendMessageToServer(message, username)}>Send</button>
            </div>
        </div>
    )
}

export default Chat;