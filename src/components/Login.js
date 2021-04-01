import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { getUser } from '../db/users.js';

const Login = ({user, setUser, token, setToken, username, password}) => {

//     const handleSubmit = async (ev) => {
//         ev.preventDefault()
//         await getUser({username, password})
//         response.status === 500 ? <div>Incorrect login</div> : ''

//     }
    

    return <>
    <div>
        <form onSubmit={handleSubmit}>
        <input type="text" value={username} minLength= '5' className="nameInput" onChange={(event) => setUsername(event.target.value)} placeholder="username"></input>
        <input type="password" value={password} minLength = '7' className="passwordInput" onChange={(event) => setPassword(event.target.value)} placeholder="password"></input>
        </form>
    </div>
    </>

}

export default Login;