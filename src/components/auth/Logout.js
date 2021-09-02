import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Logout = () => {

    const history = useHistory()
    const { logout } = useContext(AuthContext)


    async function handleLogout(event) {
        event.preventDefault()
        try {
            await logout()
            history.push('/')
        } catch (e) {
            alert(e.message)
        }
    }

    return (

        <Link to="/logout" onClick={handleLogout}>Logout</Link>

    )
}

export default Logout