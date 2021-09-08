import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange } from '@material-ui/core/colors'
import { Paper, TextField, Button, Container } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: deepOrange[500],
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: deepOrange[500],
        fontFamily: 'Aliens',
        fontSize: '5rem',
        color: theme.palette.getContrastText(deepOrange[500])
    },
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
}))

export const AvatarOptions = () => {
    const classes = useStyles()
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    console.log('alphabet:', alphabet)
    const avatarOptions = alphabet?.map((option) =>
        <Avatar key={option} variant='square' aria-label='avatar' className={classes.avatar}>{option}</Avatar>
    )
    console.log('avatarOptions:', avatarOptions)
    return avatarOptions
}



const Register = () => {

    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({ email: '', password: '', name: '' })
    const { register, user } = useContext(AuthContext)
    const avatarOptions = AvatarOptions()


    const ITEM_HEIGHT = 48
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        register(state)
    }

    useEffect(() => {
        user && history.push('/login')
    }, [user, history])

    console.log('state:', state)



    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleOnSubmit}>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='name' type='text' name='name' onChange={handleChange} value={state.name} />
                </label>
                <label>
                    <div>
                        <Button className={classes.field} fullWidth variant='outlined' required aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
                            choose your avatar*
                        </Button>

                        <Menu id='long-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
                            PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5 } }}
                        >
                            {avatarOptions.map((option, i) =>
                                <MenuItem key={i} selected={option === 'P'} onClick={handleClose}>
                                    <Paper variant='contained'>{option}</Paper>
                                </ MenuItem>
                            )}
                        </Menu>
                    </div>
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={state.email} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={state.password} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default Register

