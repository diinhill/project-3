import React, { createContext, useState }  from 'react'


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
        getAuthorBooksAll(author?.docs[0].key)
    }
    const getAuthorInfo = async (authorKey) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
        const author = await response.json()
        console.log('authorInfo:', author)
        setAuthorInfo(author)
    }
    const getAuthorBooksAll = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${key}/works.json?limit=100`)
        const allBooks = await response.json()
        console.log('allBooks.entries:', allBooks?.entries)
        setAuthorBooksAll( allBooks?.entries.map(item => 
            getBooksByTitle(item.title, key)) 
        )
    }
    const getBooksByTitle = async (title, key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=${title}`)
        const books = await response.json()
        console.log('booksByTitle:', books?.docs)
        setBooksByTitle( books?.docs.filter(item  =>  {
            return (item?.author_key[0] || item?.author_key) === key  
        }))
    }
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
