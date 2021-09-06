import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'

const flexContainer = { display: 'flex', flexDirection: 'column' }



const UserList = () => {

    const { listId } = useParams()
    const { booksFromUserlist, getBooksFromUserlist, getPublicListId, deletePublicListId } = useContext(UserListsContext)
    const [publicListId, setPublicListId] = useState('')


    useEffect(() => {
        getBooksFromUserlist(listId)
    }, [listId])

    console.log('booksFromUserlist:', booksFromUserlist)

    const handleListSettings = async () => {
        !publicListId ? setPublicListId(await getPublicListId(listId))
            : setPublicListId(await deletePublicListId(publicListId, listId))
        getBooksFromUserlist(listId)
    }



    return (

        <div style={flexContainer}>

            <Typography>{listId.nameOfList}</Typography>

            {booksFromUserlist ?
                (booksFromUserlist.length !== 0) ?
                    booksFromUserlist.map((book, i) => {
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

                    : <><Typography>you don't have any books in this list.</Typography>
                        <Link to={'/books'}>
                            <Button aria-label='find books to add to list'>add books</Button>
                        </Link></>

                : <Typography>loading...</Typography>
            }

            {!publicListId ?
                <Button aria-label='set list to public' onClick={() => handleListSettings()}>set list to public</Button>
                : <Button aria-label='set list to private' onClick={() => handleListSettings()}>set list to private</Button>}

        </div>
    )
}

export default UserList
