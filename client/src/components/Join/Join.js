import React, { useState } from 'react';
import { Link } from "react-router-dom";

import "./join.css"

const Join = () => {

    const [formData, setFormData] = useState({
        name: '',
        room: ''
    });

    const [error, setError] = useState(false);

    const handleSetInputValue = ({target}) =>{
        setError(false);
        setFormData({
            ...formData,
            [target.name]: target.value
        });

    };

    const validate = (e, formData)=>{
      const {name, room} = formData;
      if (name === '' || room === '') {
          e.preventDefault();
          setError(true)
      }
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">

                {error ?
                    <span
                        className={'button mb-20 error'}>
                        Not correct data
                    </span>
                    : <h1 className="heading">Join</h1>}
                <div>
                    <input placeholder="name"
                           className="joinInput"
                           type="text"
                           name="name"
                           onChange={handleSetInputValue} />
                </div>
                <div>
                    <input
                        placeholder="room"
                        className="joinInput mt-20"
                        type="text"
                        name="room"
                        onChange={handleSetInputValue} />
                </div>
                <Link onClick={(e)=>validate(e, formData)} to={`/chat?name=${formData.name}&room=${formData.room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>

            </div>
        </div>
    )
};

export default Join;
