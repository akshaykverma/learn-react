import React from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useState } from 'react';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // getting the data from the User context
    // data exposed from UserContext is user, setUser
    // to get data we access user and to set data we use setUser
    const {setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        // to make sure the value submitted does not go to some other url
        e.preventDefault();

        // setting the data from Login form 
        setUser({username, password});
    }

    return (
    <div>

        <h2>Login</h2>
        <input type='text'
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
        placeholder='username'/>
        {"    "}
        <input type='text' 
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        placeholder='password'/>
        <button onClick={handleSubmit}>Submit</button>

    </div>
  )
}

export default Login