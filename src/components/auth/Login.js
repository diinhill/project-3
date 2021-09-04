import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'



const Login = () => {

    const history = useHistory()
    const [state, setState] = useState({ email: "", password: "" })
    const { login } = useContext(AuthContext)


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const returnToPreviousPage = () => {
        /*!('/lists') ?*/ history.goBack() /*: history.push('/lists')*/
    }

    async function handleOnSubmit(event) {
        event.preventDefault()
        try {
            await login(state)
            returnToPreviousPage()
        } catch (e) {
            alert(e.message)
        }
    }


    return (
        <form onSubmit={handleOnSubmit}>
            <label>
                <p>email</p>
                <input type="email" name="email" onChange={handleChange} value={state.email} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="password" onChange={handleChange} value={state.password} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login