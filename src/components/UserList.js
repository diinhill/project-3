import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserList = () => {

    const { nameOfList } = useParams()
    const { booksFromUserlist, getBooksFromUserlist } = useContext(UserListsContext)


    useEffect(() => {
        getBooksFromUserlist(nameOfList)
    }, [nameOfList])

    console.log('booksFromUserlist:', booksFromUserlist)



    return (

        <div style={flexContainer}>

            <h2>{nameOfList}</h2>

            {booksFromUserlist ?
                (booksFromUserlist.length !== 0) ?
                    booksFromUserlist.map((book, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/authors/${book?.author_key[0]}/books/${book?.cover_edition_key}`}>
                                    <Paper>
                                        <h4>{book?.title}</h4>
                                        <h6>{book?.author_name}</h6>
                                        <h6>{book?.first_publish_year}</h6>
                                        <img src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-S.jpg`} alt='' />
                                    </Paper>
                                </Link>
                            </div>
                        )
                    })

                    : <><p>you don't have any books in this list.</p>
                        <Link to={'/books'}>
                            <button aria-label='find books to add to list'>add books</button>
                        </Link></>

                : <h6>Loading...</h6>
            }

        </div>
    )
}

export default UserList
