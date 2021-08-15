import React, { useState, useEffect } from 'react'
import AuthorCard from './AuthorCard'

const AuthorPage = ( {authorKey, authorName, handleSubmit} ) => {

    console.log('author:', authorName)
    console.log('authorKey:', authorKey)

    const [authorInfo, setAuthorInfo] = useState()
    const [authKey, setAuthKey] = useState('')
  
    useEffect(() => {
        // const request = new XMLHttpRequest()
        //     request.open("GET",`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
        //     request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        //     request.addEventListener('load', function(event) {
        //     if (request.status >= 200 && request.status < 300) {
        //         console.log(request.responseText)
        //         console.log(request.json())
        //     } else {
        //         console.warn(request.statusText, request.responseText)
        //     }
        //     })
        //     request.send()
        //     setAuthorInfo(request)
        // }, [authorKey])

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
            <AuthorCard authorInfo={authorInfo} />
    )
}

export default AuthorPage