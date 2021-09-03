import React, { createContext, useState } from 'react'


export const BookContext = createContext()


export const BookContextProvider = ({ children }) => {

    const [mergedAuthorInfo, setMergedAuthorInfo] = useState()
    // const [authorBooksAll, setAuthorBooksAll] = useState()
    const [booksByTitle, setBooksByTitle] = useState()
    const [mergedBookInfo, setMergedBookInfo] = useState()


    const getAuthorInfoQ = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search/authors.json?q=${key}`)
        const author = await response.json()
        console.log('authorInfoQ[0]:', author?.docs[0])
        return author.docs[0]
    }
    const getAuthorInfo = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${key}.json`)
        return await response.json()
    }
    const getMergedAuthorInfoController = async (authorKey) => {
        const authorInfoQ = await getAuthorInfoQ(authorKey)
        console.log('authorInfoQ:', authorInfoQ)
        const authorInfo = await getAuthorInfo(authorKey)
        console.log('authorInfo:', authorInfo)
        const merged = { ...authorInfoQ, ...authorInfo }
        setMergedAuthorInfo(merged)
        await getAuthorBooksAll(merged.key)
    }
    // console.log('mergedAuthorInfo:', mergedAuthorInfo)


    const getAuthorBooksAll = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/${key}/works.json?limit=100`)
        const allBooks = await response.json()
        console.log('allBooks.entries:', allBooks?.entries)

        getBooksByTitle(allBooks?.entries, key)
    }

    const getBooksByTitle = async (allBookEntries, key) => {

        //we make an array of urls for every book and insert directly the author in the search query (avoid having to filter by artist key afterward)
        const booksByTitleandAuthorRequests = allBookEntries.map(item => `https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=${item.title}&author=${key}`)

        //We fetch all the uls from the previous array once they are all done
        // const booksByTitleandAuthorResults = await Promise.all(booksByTitleandAuthorRequests.map(url => fetch(url)))
        //     .then(async (res) => {
        //         return Promise.all(
        //             res.map(async (data) => await data.json())
        //         )
        //     })
        // console.log('booksByTitleandAuthorResults:', booksByTitleandAuthorResults)
        // setBooksByTitle(booksByTitleandAuthorResults)

        // this does exactly the same in a cool one liner for maximum swag
        // since I noticed there was multiple editions of the same book and I know that this would drive you crazy I used the map to aslo sort and only select the oldest publication 
        // hope thats what youre looking for
        const iAMKull = await Promise.all(booksByTitleandAuthorRequests.map(url => fetch(url)))
            .then(async (res) => Promise.all(res.map(async (data) => {
                const allPublications = await data.json()
                return allPublications.docs.sort((a, b) => a.first_publish_year - b.first_publish_year)[0]
            })))
        console.log(`iAMKull`, iAMKull)
        setBooksByTitle(iAMKull)
    }

    const getBookInfo = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?q=${key}`)
        const book = await response.json()
        console.log('bookInfo:', book.docs)
        console.log('bookInfo[0]:', book?.docs[0])
        console.log('bookInfo[0].author_key:', book.docs[0].author_key[0])
        return book.docs[0]
        // setBookInfo(book?.docs[0])
        // await getWorkInfo(book?.docs[0].key)
    }
    const getWorkInfo = async (key) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/${key}.json`)
        return await response.json()

    }

    const getMergedBookInfoController = async (bKey) => {
        const bookInfo = await getBookInfo(bKey)
        console.log(`bookInfo`, bookInfo)
        const workInfo = await getWorkInfo(bookInfo.key)
        console.log(`workInfo`, workInfo)
        const merged = { ...bookInfo, ...workInfo }
        setMergedBookInfo(merged)

    }

    // console.log('mergedBookInfo:', mergedBookInfo)



    return (

        <BookContext.Provider
            value={{ mergedAuthorInfo, getMergedAuthorInfoController, booksByTitle, getBooksByTitle, mergedBookInfo, getMergedBookInfoController }}
        >
            {children}
        </BookContext.Provider>

    )
}
