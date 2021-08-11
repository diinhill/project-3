import React, { useState, useEffect } from 'react'
import AuthorCard from './AuthorCard'

const AuthorPage = ( {author} ) => {

    console.log('author:', author)
    console.log('author.key:', author.key)

    const [authorInfo, setAuthorInfo] = useState()
  
    useEffect(() => {
        const getAuthorInfo = async () => {
            const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${author.key}.json`)
            const obj = await response.json()
            console.log('obj:', obj)
            setAuthorInfo(obj)
        }
        getAuthorInfo()
        }, [author])
    console.log('authorInfo:', authorInfo)

    return (
            <AuthorCard author={authorInfo} />
    )
}

export default AuthorPage