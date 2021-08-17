import React, { useState, useEffect } from 'react'
// import BookCard from './BookCard'
import { useParams } from 'react-router-dom'

const BookPage = () => {

    const { bookKey } = useParams()
    console.log('bookKey:', bookKey)

    const [bookInfo, setBookInfo] = useState()

    useEffect(() => {
        const getBookInfo = async () => {
            const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/${bookKey}.json`)
            const obj = await response.json()
            console.log('obj:', obj)
            setBookInfo(obj)
        }
        getBookInfo()
    }, [bookKey])
    console.log('bookInfo:', bookInfo)


    return (

        <div style={{ margin: 'auto' }}>
            {bookInfo &&
                <BookCard bookInfo={bookInfo} />
            }
        </div>
    )
}

export default BookPage