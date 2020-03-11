import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import queryString from 'query-string';
import io from "socket.io-client";
import "./chat.css"

let socket;

const Chat = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const ENDPOINT = 'http://localhost:5554/';
    useEffect(() => {
        const userData = queryString.parse(location.search);
        console.log(userData);
        socket=io(ENDPOINT);
        setUserData(userData);

        socket.emit('join', userData, (error) => {
            if(error) {
                console.log(error);
            }
        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    }, [location.search]);

    return (
        <h1>Chat</h1>
    )
};

export default Chat
