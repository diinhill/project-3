import React, { createContext, useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles'
// import { teal, red } from '@material-ui/core/colors'

const defaultContext = {
    activeTheme: 'light',
    toggleTheme: () => {
        throw new Error('toggleTheme() not implemented')
    }
}


export const ThemeContext = createContext(defaultContext)




export const ThemeContextProvider = ({ children }) => {


    const [activeTheme, toggleTheme] = useState('light')
    const [primary, setPrimary] = useState("#fbff2b")

    const defaultTheme = createTheme({})

    const palette = {
        ...defaultTheme.palette,
        primary: { main: primary },
        // secondary: { main: red.A100 },
        background: {
            default: activeTheme === 'light' ? '#fff' : '#212121',
            paper: activeTheme === 'light' ? '#EDEBE9' : '#424242',
        },
        text: {
            primary: activeTheme === 'light' ? '#3B454E' : '#fff',
        },
        // type: activeTheme || 'light',
    }

    let muiTheme = createTheme({
        ...defaultTheme,
        palette,
        // props: {
        //     '&:hover': {
        //         MuiSvgIcon: {
        //             htmlColor: '#fff',

        //         }
        //     },
        //     MuiSvgIcon: {
        //         htmlColor: activeTheme === 'light' ? '#424242' : '#fff',

        //     }
        // },
        // typography: {
        //     h2: {
        //         paddingTop: '1.2rem',
        //         fontSize: '1rem',
        //         '@media (min-width:600px)': {
        //             fontSize: '1.3rem',
        //         },
        //         [defaultTheme.breakpoints.up('md')]: {
        //             fontSize: '2rem',
        //         },
        //     },
        //     h3: {
        //         paddingTop: '1rem',
        //         fontSize: '1rem',
        //         '@media (min-width:600px)': {
        //             fontSize: '1rem',
        //         },
        //         [defaultTheme.breakpoints.up('md')]: {
        //             fontSize: '	1.125rem',
        //         },
        //     },
        //     fontFamily: [
        //         'BlinkMacSystemFont',
        //         'Roboto',
        //         '"Helvetica Neue"',
        //         'Arial',
        //         'sans-serif',
        //         '"Apple Color Emoji"',
        //         '"Segoe UI Emoji"',
        //         '"Segoe UI Symbol"',
        //     ].join(','),
        // },
    })
    console.log(`muiTheme`, muiTheme)

    const handleSetPrimary = (color) => {
        setPrimary(color)
    }


    return (

        <ThemeContext.Provider value={{ activeTheme, toggleTheme, handleSetPrimary }}>
            <MuiThemeProvider theme={muiTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>

    )
}

