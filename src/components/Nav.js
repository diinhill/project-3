import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Logout from './auth/Logout'
// import { ThemeContext } from '../context/themeContext'


const flexContainer = { display: 'flex' }



function Nav() {

    const { user } = useContext(AuthContext)
    // const { activeTheme, toggleTheme } = useContext(ThemeContext)

    console.log('user:', user)
    // const handleClick = () => {
    //     activeTheme === "light" ? toggleTheme("dark") : toggleTheme("light")
    // }


    return (

        <nav style={flexContainer}>
            {/* <button onClick={handleClick}>toggle</button> */}
            <p>{user ? user.displayName : "Not logged in"}</p>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/authors">Authors</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    {!user ? <Link to="/login">Login</Link>
                        : <Logout />}
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/lists">My Lists</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav





