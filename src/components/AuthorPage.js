import React, { useState, useEffect } from 'react'
import AuthorCard from './AuthorCard'
import { useParams } from 'react-router-dom'

const AuthorPage = () => {

    const { authorKey } = useParams()

    console.log('authorKey:', authorKey)

    const [authorInfo, setAuthorInfo] = useState()

    useEffect(() => {
        const getAuthorInfo = async () => {
            const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
            const obj = await response.json()
            console.log('obj:', obj)
            setAuthorInfo(obj)
        }
        getAuthorInfo()
    }, [authorKey])
    console.log('authorInfo:', authorInfo)

    return (

        <div style={{ margin: 'auto' }}>
            {authorInfo &&
                <AuthorCard authorInfo={authorInfo} />
            }
        </div>
    )
}

export default AuthorPage