import React, { createContext, useState } from 'react'



export const ThemeContext = createContext()




export const ThemeContextProvider = ({ children }) => {


    const [activeTheme, setActiveTheme] = useState('light')


    const toggleTheme = () => {
        setActiveTheme('dark')
    }




    return (

        <ThemeContext.Provider value={{ activeTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>

    )
}

