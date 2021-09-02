import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Logout from './auth/Logout'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from '../context/themeContext'
import { makeStyles, withStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import BrightnessMediumOutlinedIcon from '@material-ui/icons/BrightnessMediumOutlined';



const useStyles = makeStyles((theme) => ({
    root: {
        "& > * + *": {
            marginLeft: theme.spacing(2)
        }
    }
}))

// const MuiLink = withStyles({
//     root: {
//         "&[disabled]": {
//             color: "grey",
//             cursor: "default",
//             "&:hover": {
//                 textDecoration: "none"
//             }
//         }
//     }
// })

const flexContainer = { display: 'flex' }



function Nav() {

    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { activeTheme, toggleTheme } = useContext(ThemeContext)
    const classes = useStyles()

    console.log('user:', user)

    const handleClick = () => {
        activeTheme === "light" ? toggleTheme("dark") : toggleTheme("light")
    }


    return (


        <nav style={flexContainer}>
            <button onClick={handleClick}>
                <BrightnessMediumOutlinedIcon />
            </button>
            {/* <button onClick={() => history.goBack()}> */}
            <ArrowBackOutlinedIcon style={{ color: 'darkblue' }} onClick={() => history.goBack()} />
            {/* </button> */}
            <p style={{ display: 'flex' }}>{user ? `logged in as ${user.displayName}` : ""}</p>
            <Typography className={classes.root}>
                <ul style={{ justifyContent: 'center', marginBottom: '5px' }}>
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
                        {!user ? <Link to="/register">Register</Link>
                            : <MuiLink component="button" disabled onClick={() =>
                                console.log("I'm disabled so this doesn't appear in the console when this is clicked.")}>Register
                            </MuiLink>}
                    </li>
                    <li>
                        <Link to="/lists">My Lists</Link>
                    </li>
                </ul>
            </Typography >
        </nav >

    )
}
export default Nav





