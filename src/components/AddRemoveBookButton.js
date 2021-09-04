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


    const { userlists, createOrAddBookToUserlistController, removeBookFromList, listsIncludingThisBook, getListsIncludingThisBook } = useContext(UserListsContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [nameOfNewList, setNameOfNewList] = useState('')



    useEffect(async () => {
        mergedBookInfo && await getListsIncludingThisBook(mergedBookInfo)
    }, [mergedBookInfo])

    console.log('listsIncludingThisBook:', listsIncludingThisBook)
    console.log('mergedBookInfo:', mergedBookInfo)
    console.log('userlists:', userlists)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleOnChange = (e) => {
        setNameOfNewList(e.target.value)
    }
    const handleAddBookToNewList = (listname, listid, mergedbookinfo) => {
        console.log('add book to this list:', listname)
        createOrAddBookToUserlistController(listname, listid, mergedbookinfo)
        getListsIncludingThisBook(mergedbookinfo)
        handleClose()
    }
    const handleRemoveBookFromList = (listname, listid, mergedbookinfo) => {
        removeBookFromList(listname, listid, mergedbookinfo)
        getListsIncludingThisBook(mergedbookinfo)
        handleClose()
    }


    return (

        <div>
            {listsIncludingThisBook &&
                (listsIncludingThisBook.length === 0) ?
                <div>
                    <IconButton aria-label="add to favourites" value="check" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <AddIcon />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>

                        {(userlists?.length !== 0) ?
                            <div>
                                {userlists.map((list, i) =>
                                    <MenuItem onClick={() => handleAddBookToNewList(list.nameOfList, list.listId, mergedBookInfo)} key={i}>{list.nameOfList}</MenuItem>
                                )}
                                <MenuItem>
                                    <input type="text" placeholder='name of new list' value={nameOfNewList} onChange={handleOnChange} />
                                    <button onClick={() => handleAddBookToNewList(nameOfNewList, '', mergedBookInfo)}>create new list</button>
                                </MenuItem>
                            </div>
                            :
                            <MenuItem>
                                <input type="text" placeholder='name of new list' value={nameOfNewList} onChange={handleOnChange} />
                                <button onClick={() => handleAddBookToNewList(nameOfNewList, '', mergedBookInfo)}>create new list</button>
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
                            <MenuItem onClick={() => handleRemoveBookFromList(list.nameOfList, list.listId, mergedBookInfo)} key={i}>{list.nameOfList}</MenuItem>
                        )}

                    </Menu>
                    <IconButton aria-label="see book in userlist">
                        <Link to={`/lists/${listsIncludingThisBook[0].listId}`}>
                            <OpenInNewIcon />
                            see book in my list
                        </Link>
                    </IconButton>

                </div>
            }
        </div>
    )

}

export default AddRemoveBookButton
