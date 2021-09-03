import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import UserList from './UserList'

const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserLists = () => {

    const { userlists, createOrAddBookToUserlistController, getUserlists, deleteUserlist } = useContext(UserListsContext)
    const [body, setBody] = useState('')


    useEffect(() => {
        getUserlists()
    }, [])

    console.log('updated userlists:', userlists)


    const handleOnChange = (e) => {
        setBody(e.target.value)
    }
    const handleCreateNewList = () => {
        createOrAddBookToUserlistController(body)
    }
    const handleDeleteThisList = (userlist) => {
        deleteUserlist(userlist)
        getUserlists()
    }



    return (
        <div style={flexContainer} >
            <h2>User Lists</h2>
            {/* write message */}
            <input type="text" placeholder='name of new list' value={body} onChange={handleOnChange} />
            <button onClick={handleCreateNewList} >create new list</button>
            {/* read messages */}
            {userlists ? userlists.map((list, i) => {
                return (
                    <div key={i}>
                        <Link to={`/lists/${list.nameOfUserlistInFirestore}`}>
                            <Paper>
                                <h4>{list.nameOfUserlist}</h4>
                                <h6>{list?.userlistCreatedOnDate.toString() || list?.userlistUpdatedOnDate.toString()}</h6>
                                <h6>{list.numberOfBooks}</h6>
                            </Paper>
                        </Link>
                        <IconButton aria-label="delete this list" onClick={() => handleDeleteThisList(list)}>
                            <RemoveIcon />
                        </IconButton>
                    </div>
                )
            }) : <h2>Loading...</h2>}
        </div>
    )
}

export default UserLists
