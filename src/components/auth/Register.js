import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange } from '@material-ui/core/colors'
import { Paper, TextField, Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {

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

    const history = useHistory()
    const [state, setState] = useState({ email: "", password: "", name: "" })
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
        user && history.push("/login")
    }, [user, history])

    console.log('state:', state)



    return (

        <form onSubmit={handleOnSubmit}>
            <label>
                <Typography>name</Typography>
                <TextField type="text" name="name" onChange={handleChange} value={state.name} />
            </label>
            <label>
                <div>
                    <Typography>avatar</Typography>
                    <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
                        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5 } }}
                    >
                        {avatarOptions.map((option, i) =>
                            <MenuItem key={i} selected={option === 'P'} onClick={handleClose}>
                                <Paper>{option}</Paper>
                            </ MenuItem>
                        )}
                    </Menu>
                </div>
            </label>
            <label>
                <Typography>email</Typography>
                <TextField type="email" name="email" onChange={handleChange} value={state.email} />
            </label>
            <label>
                <Typography>password</Typography>
                <TextField type="password" name="password" onChange={handleChange} value={state.password} />
            </label>
            <div>
                <Button variant='contained' type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default Register

