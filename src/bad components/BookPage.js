import React, { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import { useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'



const BookPage = () => {

    const { selectedEdition } = useParams()
    console.log('selectedEdition:', selectedEdition)

    const [bookInfo, setBookInfo] = useState()
    const [workInfo, setWorkInfo] = useState()
    // const [selectedAuthorKey, setSelectedAuthorKey] = useState('')


    useEffect(() => {
        const getBookInfo = async () => {
            const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?q=${selectedEdition}`)
            const books = await response.json()
            console.log('books.docs:', books.docs)
            console.log('books.docs.author_key:', books.docs[0].author_key[0])
            setBookInfo(books.docs[0])
            // setSelectedAuthorKey(books.docs[0].author_key[0])

            const getWorkInfo = async () => {
                const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/${books.docs[0].key}.json`)
                const work = await response.json()
                console.log('work:', work)
                setWorkInfo(work)
            }
            getWorkInfo()
        }
        getBookInfo()

    }, [selectedEdition])
    // console.log('bookInfo:', bookInfo)
    // console.log('workInfo:', workInfo)


    return (

        <div style={{ margin: 'auto' }}>
            {bookInfo && workInfo &&
                <BookCard bookInfo={bookInfo} workInfo={workInfo} />}
            {/* {    <IconButton aria-label="show author details">
                    <Link to={`/authors/${selectedAuthorKey}`} />
                </IconButton>
            } */}
        </div>
    )
}

export default BookPage