import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import UserLists from './UserLists'
import { useParams } from 'react-router-dom'

const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserList = () => {

    const { listName } = useParams()
    const { booksInList, getBooksInList } = useContext(UserListsContext)


    useEffect(() => {
        getBooksInList(listName)
    })



    return (

        <div style={flexContainer}>

            <h2>{listName}</h2>

            {booksInList ? booksInList.map((list, index) => {
                return (
                    <div>
                        {/* <Link to={`/authors/:authorKey/books/:bookKey`}>
                            <Paper>
                                <h4>{list.userListName}</h4>
                                <h6>{list.createdOnDate.toString()}</h6>
                                <h6>{list.numberOfBooks}</h6>
                            </Paper>
                        </Link> */}
                    </div>
                )
            }) : <h2>Loading...</h2>}
        </div>
    )
}

export default UserList
