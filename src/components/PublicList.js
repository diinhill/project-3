import React, { useContext, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { useParams } from 'react-router-dom'
import { Paper, Typography, Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
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

        <Container>
            <Typography>{publicListId.nameOfList}</Typography>

            {booksFromPublicList ?
                (booksFromPublicList.length !== 0) ?
                    booksFromPublicList.books.map((book, i) => {
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

                    : <Typography>ha! this seems to be an empty list.</Typography>

                : <Typography>loading...</Typography>
            }

            {booksFromPublicList &&
                <Button className={classes.field} variant='contained' aria-label="add this list" onClick={() => handleAddList()} endIcon={<AddIcon />}>
                    save in my lists
                </Button>
            }
        </Container>
    )
}

export default UserList