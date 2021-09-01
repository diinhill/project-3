import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'







const AddRemoveBookButton = ({ mergedBookInfo }) => {

    const { addBookToList, removeBookFromList, getBookIsInList, bookIsInList, getLists, lists } = useContext(UserListsContext)
    const [anchorEl, setAnchorEl] = useState(null)


    // useEffect(() => {
    //     getLists()
    //     getBookIsInList(mergedBookInfo)
    // }, [])

    console.log('lists:', lists)
    console.log('bookIsInList:', bookIsInList)

    const handleAddToSelectedList = (selectedList) => {
        // !selected ? addBookToList(mergedBookInfo) && setSelected(true)
        //     : removeBookFromList(mergedBookInfo) && setSelected(false)
        mergedBookInfo && addBookToList(selectedList, mergedBookInfo)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (

        <div>
            {getBookIsInList(mergedBookInfo) &&
                bookIsInList ?
                <div>
                    <IconButton aria-label="add to favourites"
                        value="check"
                        // selected={selected}
                        // onChange={() => {
                        // setSelected(!selected)
                        // }}
                        // onChange={handleSelected}
                        aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <AddIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {lists ?
                            <div>
                                {lists.forEach((list) => {
                                    <MenuItem onClick={handleAddToSelectedList(list.userListName)}>{list.userListName}</MenuItem>
                                })}
                                <MenuItem onClick={handleClose}>create new list</MenuItem>
                            </div>

                            :
                            <MenuItem onClick={handleClose}>create new list</MenuItem>

                        }
                    </Menu>
                </div>

                : <IconButton aria-label="add to favourites"
                    value="check"
                // selected={!selected}
                // onChange={handleSelected}
                >
                    <RemoveIcon />
                </IconButton>
            }
        </div>
    )
}

export default AddRemoveBookButton
