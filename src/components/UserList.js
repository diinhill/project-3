import React, { useContext, useState, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
})



const UserList = () => {

    const classes = useStyles()
    const { listId } = useParams()
    const { userList, getUserlist, setPublicList, deletePublicList } = useContext(UserListsContext)


    useEffect(() => {
        getUserlist(listId)
    }, [listId])

    console.log('userlist:', userList)

    const handleListSettings = () => {
        userList.private ? setPublicList(listId) : deletePublicList(listId)
    }



    return (

        <Container>
            {userList ?
                <>
                    <Typography>{userList?.nameOfList}</Typography>
                    {userList?.books ?
                        userList.books.map((book, i) => {
                            return (
                                <div className={classes.field} key={i}>
                                    <Link to={`/authors/${book?.author_key[0]}/books/${book?.cover_edition_key}`}>
                                        <Paper>
                                            <Typography>{book?.title}</Typography>
                                            <Typography>{book?.author_name[0]}</Typography>
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
                    }




                    {userList.private ?
                        <Button className={classes.field} variant='contained' aria-label='set list to public' onClick={handleListSettings}>set list to public</Button>
                        : <Button className={classes.field} variant='contained' aria-label='set list to private' onClick={handleListSettings}>set list to private</Button>}
                </> :
                <Typography>loading...</Typography>
            }
        </Container>
    )
}

export default UserList
