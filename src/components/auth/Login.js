import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Typography } from '@material-ui/core'



const Login = () => {

    const history = useHistory()
    const [state, setState] = useState({ email: "", password: "" })
    const { login/*, user*/ } = useContext(AuthContext)


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

    // oder das hier ?
    // const handleOnSubmit = (event) => {
    //     event.preventDefault();
    //     login(state)
    // }
    // useEffect(() => {
    //     user && history.push("/profile")
    // }, [history, user])


    return (
        <form onSubmit={handleOnSubmit}>
            <label>
                <Typography>email</Typography>
                <TextField type="email" name="email" onChange={handleChange} value={state.email} />
            </label>
            <label>
                <Typography>password</Typography>
                <TextField type="password" name="password" onChange={handleChange} value={state.password} />
            </label>
            <div>
                <Button variant='contained' color='default' disableElevation type='submit' /* href='#contained-buttons' */>submit</Button>
            </div>
        </form>
    )
}

export default Login