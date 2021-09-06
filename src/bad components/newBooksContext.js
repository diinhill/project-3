import React from 'react'
import { createContext, useState } from 'react'


export const NewBooksContext = createContext()


export const NewBooksContextProvider = ({ children }) => {

    const [newScifi, setNewScifi] = useState([])
    const [newHorror, setNewHorror] = useState([])

    const getNewScifi = async () => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=science+fiction&mode=everything&sort=new`)
        const obj = await response.json()
        console.log('newScifi:', obj.docs)
        setNewScifi( obj?.docs.filter(item  =>  {
          return item?.cover_i && (item?.cover_i !== 11096487)  
        }))
    }
    const getNewHorror = async () => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=horror&mode=everything&sort=new`)
        const obj = await response.json()
        console.log('newHorror:', obj.docs)
        setNewHorror( obj?.docs.filter(item  =>  {
          return item?.cover_i && (item?.cover_i !== 11096487)  
        }))
    }


    return (

        <NewBooksContext.Provider value={{ newScifi, getNewScifi, newHorror, getNewHorror }}>
            {children}
        </NewBooksContext.Provider>
 
    )
}
