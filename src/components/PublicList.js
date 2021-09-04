import React, { useContext, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
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

            <h2>{publicListId.nameOfList}</h2>

            {booksFromPublicList ?
                (booksFromPublicList.length !== 0) ?
                    booksFromPublicList.map((book, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/authors/${book?.author_key[0]}/books/${book?.cover_edition_key}`}>
                                    <Paper>
                                        <h4>{book?.title}</h4>
                                        <h6>{book?.author_name}</h6>
                                        <h6>{book?.first_publish_year}</h6>
                                        <img src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-S.jpg`} alt='' />
                                    </Paper>
                                </Link>
                            </div>
                        )
                    })

                    : <p>ha! this seems to be an empty list.</p> && history.goBack()

                : <h6>Loading...</h6>
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