import React, { useState, useEffect } from 'react'
import AuthorCard from './AuthorCard'

const AuthorPage = ( {authorKey, authorName} ) => {

    console.log('author:', authorName)
    console.log('authorKey:', authorKey)

    const [authorInfo, setAuthorInfo] = useState()
  
    useEffect(() => {
        // const request = new XMLHttpRequest()
        //     request.open("GET",`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
        //     request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        //     request.onload = function() {
        //         console.log('request.response:', request.responseText)
        //     }
        //     request.send()
        //     setAuthorInfo(request.responseText)
        // }, [authorKey])
        // console.log('authorInfo:', authorInfo)

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