import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
})


const Login = () => {

    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({ email: '', password: '' })
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

        <Container>
            <form onSubmit={handleOnSubmit}>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={state.email} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={state.password} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' /*color='default'*/ /*disableElevation*/ type='submit' /* href='#contained-buttons' */>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default Login