import React, { createContext, useState } from 'react'


export const BookContext = createContext()


export const BookContextProvider = ({ children }) => {

    const [authorInfoQ, setAuthorInfoQ] = useState()
    const [authorInfo, setAuthorInfo] = useState()
    const [authorBooksAll, setAuthorBooksAll] = useState()
    const [booksByTitle, setBooksByTitle] = useState()
    const [bookInfo, setBookInfo] = useState()
    const [workInfo, setWorkInfo] = useState()


    const getAuthorInfoQ = async (authorKey) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search/authors.json?q=${authorKey}`)
        const author = await response.json()
        console.log('authorInfoQ[0]:', author?.docs[0])
        setAuthorInfoQ(author?.docs[0])
        await getAuthorBooksAll(author?.docs[0].key)
    }
    const getAuthorInfo = async (authorKey) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
        const author = await response.json()
        console.log('authorInfo:', author)
        setAuthorInfo(author)

        // just an idea on how to merge your 2 authors objects with spread operators. Note that similar properties get overriten by the last entry
        const mergedAuthorInfo = { ...authorInfoQ, ...author }
        console.log(`mergedAuthorInfo`, mergedAuthorInfo)
    }
    const getAuthorBooksAll = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${key}/works.json?limit=100`)
        const allBooks = await response.json()
        console.log('allBooks.entries:', allBooks?.entries)

        getBooksByTitle(allBooks?.entries, key)
    }

    const getBooksByTitle = async (allBookEntries, key) => {

        //we make an array of urls for every book and insert directly the author in the search query (avoid having to filter by artist key afterward)
        const booksByTitleandAuthorRequests = allBookEntries.map(item => `https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=${item.title}&author=${key}`)

        //We fetch all the uls from the previous array once they are all done
        const booksByTitleandAuthorResults = await Promise.all(booksByTitleandAuthorRequests.map(url => fetch(url)))
            .then(async (res) => {
                return Promise.all(
                    res.map(async (data) => await data.json())
                )
            })
        console.log('booksByTitleandAuthorResults:', booksByTitleandAuthorResults)
        setBooksByTitle(booksByTitleandAuthorResults)



        // this does exactly the same in a cool one liner for maximum swag
        // since I noticed there was multiple editions of the same book and I know that this would drive you crazy I used the map to aslo sort and only select the oldest publication 
        // hope thats what youre looking for
        const iAMKull = await Promise.all(booksByTitleandAuthorRequests.map(url => fetch(url)))
            .then(async (res) => Promise.all(res.map(async (data) => {
                const allPublications = await data.json()
                return allPublications.docs.sort((a, b) => a.first_publish_year - b.first_publish_year)[0]
            })))
        console.log(`iAMKull`, iAMKull)
    }

    //old function 
    // const getBooksByTitle = async (title, key) => {
    //     const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=${title}`)
    //     const books = await response.json()
    //     console.log('booksByTitle:', books?.docs)
    //     setBooksByTitle( books?.docs.filter(item  =>  {
    //         return (item?.author_key  === key) 
    //     }))
    // }

    const getBookInfo = async (bookKey) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?q=${bookKey}`)
        const book = await response.json()
        console.log('bookInfo:', book.docs)
        console.log('bookInfo[0]:', book?.docs[0])
        console.log('bookInfo[0].author_key:', book.docs[0].author_key[0])
        setBookInfo(book?.docs[0])
        getWorkInfo(book?.docs[0].key)
    }
    const getWorkInfo = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/${key}.json`)
        const work = await response.json()
        console.log('workInfo:', work)
        setWorkInfo(work)
    }


    return (

        <BookContext.Provider
            value={{ authorInfoQ, getAuthorInfoQ, authorInfo, getAuthorInfo, authorBooksAll, getAuthorBooksAll, booksByTitle, getBooksByTitle, bookInfo, getBookInfo, workInfo, getWorkInfo }}
        >
            {children}
        </BookContext.Provider>

    )
}
