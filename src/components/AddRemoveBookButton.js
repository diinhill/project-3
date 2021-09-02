import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Link } from 'react-router-dom'




const AddRemoveBookButton = ({ mergedBookInfo }) => {


    const { lists, addBookToList, removeBookFromList, listsIncludingThisBook, getListsIncludingThisBook } = useContext(UserListsContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [newListName, setNewListName] = useState('')



    useEffect(() => {
        mergedBookInfo && getListsIncludingThisBook(mergedBookInfo)
    }, [mergedBookInfo])

    console.log('mergedBookInfo:', mergedBookInfo)
    console.log('lists:', lists)
    console.log('listsIncludingThisBook:', listsIncludingThisBook)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleOnChange = (e) => {
        setNewListName(e.target.value)
    }
    const handleAddBookToNewList = (listName) => {
        console.log('add book to this list:', listName)
        addBookToList(listName, mergedBookInfo)
        getListsIncludingThisBook(mergedBookInfo)
    }
    const handleRemoveBookFromList = (value) => {
        removeBookFromList(value, mergedBookInfo)
        getListsIncludingThisBook(mergedBookInfo)
    }


    return (

        <div>
            {mergedBookInfo &&
                (listsIncludingThisBook?.length === 0) ?
                <div>
                    <IconButton aria-label="add to favourites" value="check" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <AddIcon />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>

                        {(lists?.length !== 0) ?
                            <div>
                                {lists.map((list, i) =>
                                    <MenuItem onClick={() => handleAddBookToNewList(list.userListName)} key={i}>{list.userListName}</MenuItem>
                                )}
                                <MenuItem>
                                    <input type="text" placeholder='name of new list' value={newListName} onChange={handleOnChange} />
                                    <button onClick={() => handleAddBookToNewList(newListName)}>create new list</button>
                                </MenuItem>
                            </div>
                            :
                            <MenuItem>
                                <input type="text" placeholder='name of new list' value={newListName} onChange={handleOnChange} />
                                <button onClick={() => handleAddBookToNewList(newListName)}>create new list</button>
                            </MenuItem>
                        }
                    </Menu>
                </div>

                :

                <div>
                    <IconButton aria-label="remove from favourites" value="check" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <RemoveIcon />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>

                        {listsIncludingThisBook.map((list, i) =>
                            <MenuItem onClick={() => handleRemoveBookFromList(list.userListName)} key={i}>{list.userListName}</MenuItem>
                        )}

                    </Menu>
                    <IconButton aria-label="see book in userlist">
                        <Link to={`/lists/${listsIncludingThisBook[0].userListName}`}>
                            <OpenInNewIcon />
                        </Link>
                    </IconButton>

                </div>
            }
        </div>
    )

}

export default AddRemoveBookButton
