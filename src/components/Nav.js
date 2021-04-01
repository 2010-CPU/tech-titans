import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
// import {getUser} from '../db/users.js';


const Nav = ({token, setToken, user, setUser, username}) => {

// I feel like this is wrong and I shouldn't be passing the password around the website, but I don't really understand the token very well. 
    // useEffect(() => {
    //     setToken(localStorage.getItem('token'))
    //     if (token) {
    //         const saveToken = async () => {
    //             const userData = await getUser({username, password})
    //             setToken(token)
    //             setUser(userData)
    //             return user;
    //         }
    //         saveToken()
    //     }
    // }, [token])

    // const handleLogout = (event) => {
    //     event.preventDefault()
    //     setUser({})
    //     setToken('')
    //     localStorage.clear()
    //     history.push('/')
    // }
    return <>
        <nav className="navBar">
        <Link to="/" className="links">THIS IS THE NAV BAR </Link>
        <Link to='Login' className="links">Login</Link>
        <Link to="Products" className="links">Products</Link>
        <Link path to="/login" className="links">Sign In</Link> 
        {/* <Link path to="/" className="links">{token ? onClick={handleLogout} : ''}Log Out</Link>        */}
    </nav>
    
    </>
}

export default Nav;