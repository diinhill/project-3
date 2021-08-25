import React from 'react'
import { createContext, useState } from 'react'


export const AuthorContext = createContext()


export const AuthorContextProvider = ({ children }) => {

    // would I use let here and in my components as well?
    let { authorKey } = useParams()
    const [authorInfo, setAuthorInfo] = useState()
    const [authorWorks, setAuthorWorks] = useState()
    // const [authorBooks, setAuthorBooks] = useState()


    // useEffect(() => {

    const getAuthorInfo = async () => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
        const author = await response.json()
        console.log('author:', author)
        setAuthorInfo(author)
    }
    const getAuthorWorks = async () => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}/works.json?limit=100`)
        const works = await response.json()
        console.log('works.entries:', works?.entries)
        setAuthorWorks(works.entries)
    }

// }, [authorKey])
 


    return (

        <AuthorContextProvider.Provider value={{ authorInfo, getAuthorInfo, authorWorks, getAuthorWorks, authorBooks, getAuthorBooks }}>
            {children}
        </AuthorContextProvider.Provider>
    )
}

