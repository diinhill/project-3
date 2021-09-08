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
import BrightnessMediumOutlinedIcon from '@material-ui/icons/BrightnessMediumOutlined'
import { Button, TextField, Grid, Container } from '@material-ui/core'



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

        <Container>
            <nav>
                <BrightnessMediumOutlinedIcon style={{ color: 'darkblue' }} onClick={handleClick} />
                <ArrowBackOutlinedIcon style={{ color: 'darkblue' }} onClick={() => history.goBack()} />
                <Typography>{user ? `${user.displayName}` : ''}</Typography>

                <Grid container>
                    <ul>
                        <Grid item>
                            <li>
                                <Button>
                                    <Link to="/">Home</Link>
                                </Button>
                            </li>
                        </ Grid>
                        <Grid item>
                            <li>
                                <Button>
                                    <Link to="/authors">Authors</Link>
                                </Button>
                            </li>
                        </ Grid>
                        <Grid item>
                            <li>
                                <Button>
                                    <Link to="/books">Books</Link>
                                </Button>
                            </li>
                        </ Grid>
                        <Grid item>
                            <li>
                                <Button>
                                    <Link to="/lists/public">Lists</Link>
                                </Button>
                            </li>
                        </ Grid>
                        <Grid item>
                            <li>
                                {!user ?
                                    <Button>
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    :
                                    <Button>
                                        <Logout />
                                    </Button>
                                }
                            </li>
                        </ Grid>
                        <Grid item>
                            <li>
                                {!user ?
                                    <Button>
                                        <Link to="/register">Register</Link>
                                    </Button>
                                    :
                                    <Button>
                                        <MuiLink component="button" disabled>Register</MuiLink>
                                    </Button>
                                }
                            </li>
                        </ Grid>
                        <Grid item>
                            <li>
                                <Button>
                                    <Link to="/lists">My Lists</Link>
                                </Button>
                            </li>
                        </ Grid>
                    </ul>
                </Grid >

            </nav >
        </Container >

    )
}
export default Nav





