import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
// import { BookContext } from '../context/bookContext'
// import { NewBooksContext } from '../context/newBooksContext'
// import { ThemeContext } from '../context/themeContext'

function Nav () {
    
    const { user } = useContext(AuthContext)

    // const { activeTheme, toggleTheme } = useContext(ThemeContext)

    console.log('user:', user)
    // const handleClick = () => {
    //     activeTheme === "light" ? toggleTheme("dark") : toggleTheme("light")
    // }
    return (

        <nav>
            {/* <button onClick={handleClick}>toggle</button> */}
            <p>{user ? user.email : "Not logged in"}</p>
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
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav





