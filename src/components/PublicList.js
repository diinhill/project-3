import React, { useContext, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { useParams } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'


const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserList = () => {

    const history = useHistory()
    const { publicListId } = useParams()
    const { booksFromPublicList, getBooksFromPublicList, getPrivateListId } = useContext(UserListsContext)


    useEffect(() => {
        getBooksFromPublicList(publicListId)
    }, [publicListId])

    console.log('booksFromPublicList:', booksFromPublicList)


    const handleAddList = async () => {
        publicListId && history.push(`/lists/${await getPrivateListId(publicListId)}`)
    }




    return (

        <div style={flexContainer}>
            <Typography>{publicListId.nameOfList}</Typography>

            {booksFromPublicList ?
                (booksFromPublicList.length !== 0) ?
                    booksFromPublicList.map((book, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/authors/${book?.author_key[0]}/books/${book?.cover_edition_key}`}>
                                    <Paper>
                                        <Typography>{book?.title}</Typography>
                                        <Typography>{book?.author_name}</Typography>
                                        <Typography>{book?.first_publish_year}</Typography>
                                        <img src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-S.jpg`} alt='' />
                                    </Paper>
                                </Link>
                            </div>
                        )
                    })

                    : <Typography>ha! this seems to be an empty list.</Typography> && history.goBack()

                : <Typography>loading...</Typography>
            }

            {booksFromPublicList &&
                <IconButton aria-label="add this list" onClick={() => handleAddList()}>
                    <AddIcon />
                </IconButton>
            }
        </div>
    )
}

export default UserList