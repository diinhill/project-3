import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserLists = () => {

    const { lists, createNewList, getLists } = useContext(UserListsContext)
    const [body, setBody] = useState('')


    useEffect(() => {
        getLists()
    }, [])

    const handleOnChange = (e) => {
        setBody(e.target.value)
    }
    const handleCreateNewList = () => {
        createNewList(body)
    }

    console.log('newList:', lists)



    return (
        <div style={flexContainer} >
            <h2>User Lists</h2>
            {/* write message */}
            <input type="text" placeholder='name of list' value={body} onChange={handleOnChange} />
            <button onClick={handleCreateNewList} >create new list</button>
            {/* read messages */}
            {lists ? lists.map((list, index) => {
                return (
                    <div>
                        <Link to={`/lists/${list.userListName}`}>
                            <Paper>
                                <h4>{list.userListName}</h4>
                                <h6>{list.createdOnDate.toString()}</h6>
                                <h6>{list.numberOfBooks}</h6>
                            </Paper>
                        </Link>
                    </div>
                )
            }) : <h2>Loading...</h2>}
        </div>
    )
}

export default UserLists
