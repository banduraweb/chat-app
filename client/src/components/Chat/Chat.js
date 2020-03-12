import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const [users, setUsers] = useState('');
    const [userData, setUserData] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const ENDPOINT = 'https://infinite-retreat-25083.herokuapp.com/';

    useEffect(() => {
        const userData = queryString.parse(location.search);
        setUserData(userData);
        socket = io(ENDPOINT);

        socket.emit('join', userData, error => {
            if (error) {
                alert(error);
                return history.push('/');
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [history, ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    const sendMessage = event => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

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
            <TextContainer users={users} />
        </div>
    );
};

export default Chat;
