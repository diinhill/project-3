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
    }, [])



    return (

        <div style={flexContainer}>

            <h2>{nameOfList}</h2>

            {booksFromUserlist?.map((book, i) => {
                return (
                    <div key={i}>
                        <Link to={`/authors/:authorKey/books/:bookKey`}>
                            <Paper>
                                <h4>{book?.title}</h4>
                                <h6>{book?.name}</h6>
                                <h6>{book?.first_publish_year}</h6>
                                <img src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-S.jpg`} alt='' />
                            </Paper>
                        </Link>
                    </div>
                )
            })} : <h2>Loading...</h2>
        </div>
    )
}

export default UserList
