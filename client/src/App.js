import React from 'react';
import { Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
    return (
        <>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </>
    );
};

export default App;
