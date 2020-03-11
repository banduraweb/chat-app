import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';

let socket;

const Chat = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const ENDPOINT = 'http://localhost:5554/';

    useEffect(() => {
        const userData = queryString.parse(location.search);
        setUserData(userData);
        socket = io(ENDPOINT);

        socket.emit('join', userData, error => {
            if (error) {
                alert(error, 'errorerror');
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });

        // socket.on('roomData', ({ users }) => {
        //     setUsers(users);
        // })
    }, [message]);

    const sendMessage = event => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };
    console.log(message, 'message');
    console.log(messages, 'messages');
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={userData.room} />
                <Messages messages={messages} name={userData.name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            {/*<TextContainer users={users}/>*/}
        </div>
    );
};

export default Chat;
