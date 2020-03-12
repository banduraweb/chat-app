import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.css';

const Join = () => {
    const [formData, setFormData] = useState({
        name: '',
        room: '',
    });

    const [error, setError] = useState(false);
    const [ownRoom, setOwnRoom] = useState(false);

    const handleSetInputValue = ({ target }) => {
        setError(false);
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSetRoom = ({ target }) => {
        const room = target.name;
        setFormData({ ...formData, room });
    };

    const validate = (e, formData) => {
        const { name, room } = formData;
        if (name === '' || room === '') {
            e.preventDefault();
            setError(true);
        }
    };

    const createOwnRoom = ({ target }) => {
        setOwnRoom(!ownRoom);
        setFormData({ ...formData, room: target.value });
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                {error ? (
                    <span className={'button mb-20 error'}>
                        Not correct data
                    </span>
                ) : (
                    <h1 className="heading">Join Chat</h1>
                )}
                <div>
                    <input
                        placeholder="name"
                        className="joinInput"
                        type="text"
                        name="name"
                        onChange={handleSetInputValue}
                    />
                </div>
                <h1 className="heading h6">Choose the Room</h1>
                {!ownRoom ? (
                    <div className="button checkboxes mt-20">
                        <label>
                            {' '}
                            Books
                            <input
                                className="joinInput"
                                type="checkbox"
                                name="books"
                                checked={formData.room === 'books'}
                                onChange={handleSetRoom}
                            />
                        </label>
                        <label>
                            {' '}
                            Cars
                            <input
                                className="joinInput"
                                type="checkbox"
                                name="cars"
                                checked={formData.room === 'cars'}
                                onChange={handleSetRoom}
                            />
                        </label>
                        <label>
                            {' '}
                            Life
                            <input
                                className="joinInput"
                                type="checkbox"
                                name="life"
                                checked={formData.room === 'life'}
                                onChange={handleSetRoom}
                            />
                        </label>
                        <label>
                            {' '}
                            Secret
                            <input
                                className="joinInput"
                                type="checkbox"
                                name="secret"
                                checked={formData.room === 'secret'}
                                onChange={handleSetRoom}
                            />
                        </label>
                    </div>
                ) : (
                    <div>
                        <input
                            placeholder="room"
                            className="joinInput"
                            type="text"
                            name="room"
                            onChange={handleSetInputValue}
                        />
                    </div>
                )}
                <>
                    <br />
                    <button className="button" onClick={createOwnRoom}>
                        {!ownRoom ? (
                            <span>
                                create own room
                                <br />
                                OR
                                <br />
                                enter room of your's companion
                            </span>
                        ) : (
                            <span>choose exist room</span>
                        )}
                    </button>
                </>
                <Link
                    onClick={e => validate(e, formData)}
                    to={`/chat?name=${formData.name}&room=${formData.room}`}
                >
                    <button className={'button mt-20'} type="submit">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
