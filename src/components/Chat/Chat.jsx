import react, {useState, useEffect} from 'react'
import './Chat.css'

export const Chat = ({lastMessage, sendMessage}) => {
    const [chatOpen, setChatOpen] = useState(false);
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
        if (lastMessage !== null) {
            const messageObject = JSON.parse(lastMessage.data);
            const message = arrayBufferToString(messageObject.data);
            message['time'] = new Date().toLocaleTimeString();
            if(message.type === 'chat') setMessageList([...messageList, message]);
        }
    }, [lastMessage]);

    function sendMessageToServer(message, username) {
        if (message === "" || username === null) return;
        const messageObject = {
            type: 'chat',
            username: username,
            message: message,
        }
        sendMessage(JSON.stringify(messageObject));
    }

    return (
        <div className='chat'>
        {chatOpen ? 
            <>
                <div className="chat-wrapper frame">
                    <div className="chat-header">
                        {username !== null ?
                        <>
                                <h3>{username}</h3>
                        </> : 
                        <>
                            <input type="text" placeholder="Username" onChange={(event) => setTmpUsername(event.target.value)}/>
                            <button onClick={() => setUsername(tmpUsername)}>Submit</button>
                        </> }
                        <button onClick={() => setChatOpen(false)}>X</button>
                    </div>
                    <div className='chat-body'>
                        {messageList.map((val, key) => {
                            return (
                                <div className="chat-message" key={`message-${key}`}>
                                    <div className="message-info">
                                        <div className="message-message">{val.username} :</div>
                                        <div className="message-time">{val.time}</div>
                                    </div>
                                    <div className="message-text">{val.message}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='chat-message-input frame'>
                        <input type="text" placeholder="Message" onChange={(event) => setMessage(event.target.value)}/>
                        <button onClick={() => sendMessageToServer(message, username)}>Send</button>
                    </div>
                </div>
            </>
        :
            <button style={!chatOpen ? {background: 'transparent', border: 'none'} : null} onClick={() => setChatOpen(true)}>
                <img src='src/assets/chat/chat-icon.svg' style={{width: "50px", height: "50px", cursor: 'pointer'}} type='image/svg+xml'/>
            </button>
        }
        </div>
    )
}

export default Chat;