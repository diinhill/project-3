import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'



const Register = () => {

    const history = useHistory()
    const [state, setState] = useState({ email: "", password: "", name: "" })
    const { register } = useContext(AuthContext)



    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    async function handleOnSubmit(event) {
        event.preventDefault()
        try {
            await register(state)
            history.push("/login")
        } catch (e) {
            alert(e.message)
        }
    }
    console.log('state', state)



    return (
        <form onSubmit={handleOnSubmit}>
            <label>
                <p>name</p>
                <input type="text" name="name" onChange={handleChange} value={state.name} />
            </label>
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

export default Register