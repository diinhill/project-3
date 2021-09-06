import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { Paper, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import { Button } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserLists = () => {

    const { userlists, createOrAddBookToUserlistController, getUserlists, deleteUserlist, } = useContext(UserListsContext)
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
        getUserlists()
    }
    const handleDeleteThisList = (list) => {
        deleteUserlist(list)
        getUserlists()
    }



    return (

        <div style={flexContainer} >
            <Typography variant='h2' color='default' component='h4' align='center'>User Lists</Typography>

            <TextField type="text" placeholder='name of new list' value={body} onChange={handleOnChange} />
            <Button variant='contained' onClick={handleCreateNewList} type='submit' endIcon={<KeyboardArrowRightIcon />}>create new list</Button>

            {userlists ?
                userlists.map((list, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/lists/${list?.listId}`}>
                                <Paper>
                                    <h4>{list?.nameOfList}</h4>
                                    <h6>{((list?.listUpdatedOnDate).toDate().toLocaleString('en').substring(0, 14))}</h6>
                                    <h6>{list?.numberOfBooks}</h6>
                                </Paper>
                            </Link>
                            <IconButton aria-label="delete this list" onClick={() => handleDeleteThisList(list)}>
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    )
                })
                : <Typography>loading...</Typography>
            }
        </div>
    )
}

export default UserLists
