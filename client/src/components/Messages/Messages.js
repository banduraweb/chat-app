import React from 'react';
import CurrentMessage from './CurrentMessage/CurrentMessage';
import ScrollToBottom from 'react-scroll-to-bottom';

import './messages.css';

const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => (
            <div key={i}>
                <CurrentMessage message={message} name={name} />
            </div>
        ))}
    </ScrollToBottom>
);

export default Messages;
