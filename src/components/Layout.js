import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { ThemeContext } from '../context/themeContext'
import BrightnessMediumOutlinedIcon from '@material-ui/icons/BrightnessMediumOutlined'
import Logout from './auth/Logout'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        marginTop: theme.spacing(8),
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    }
}));

export default function Layout({ children }) {
    const { user } = useContext(AuthContext)
    const { activeTheme, toggleTheme } = useContext(ThemeContext)

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        activeTheme === "light" ? toggleTheme("dark") : toggleTheme("light")
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Just A Book App
                    </Typography>
                    <IconButton onClick={handleClick} color="inherit">

                        <BrightnessMediumOutlinedIcon />

                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/">
                        <ListItem button >
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={"Home"} />
                        </ListItem>
                    </Link>
                    <Link to="/authors">
                        <ListItem button >
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={"Authors"} />
                        </ListItem>
                    </Link>
                    <Link to="/books">
                        <ListItem button >
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={"Books"} />
                        </ListItem>
                    </Link>
                    <Link to="/lists/public">
                        <ListItem button >
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={"Lists"} />
                        </ListItem>
                    </Link>
                    {!user ?
                        <>
                            <Link to="/login">
                                <ListItem button >
                                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                    <ListItemText primary={"Login"} />
                                </ListItem>
                            </Link>
                            <Link to="register">
                                <ListItem button >
                                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                    <ListItemText primary={"Register"} />
                                </ListItem>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/lists">
                                <ListItem button >
                                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                    <ListItemText primary={"My Lists"} />
                                </ListItem>
                            </Link>
                            <ListItem button>
                                <Logout />
                            </ListItem>
                        </>
                    }
                </List>
                {/* <ul>
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
                    </ul> */}
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
        </div>
    );
}
