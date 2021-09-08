import React, { useContext, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { Container, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
})


const PublicLists = () => {

    const classes = useStyles()
    const { publicLists, getPublicLists } = useContext(UserListsContext)


    useEffect(() => {
        getPublicLists()
    }, [])

    console.log('publicLists:', publicLists)



    return (

        <Container>
            <Typography>Public Lists</Typography>

            {publicLists ?
                publicLists.map((list, i) => {
                    return (
                        <div className={classes.field} key={i}>
                            <Link to={`/lists/public/${list.userUid}-${list?.listId}`}>
                                <Paper>
                                    <Typography>{list?.nameOfList}</Typography>
                                    <Typography>{((list?.listUpdatedOnDate).toDate().toLocaleString('en').substring(0, 14))}</Typography>
                                    <Typography>{list?.nameOfUser}</Typography>
                                    <Typography>{list?.numberOfBooks}</Typography>
                                </Paper>
                            </Link>
                        </div>
                    )
                })
                : <Typography>loading...</Typography>
            }

        </Container>
    )
}

export default PublicLists
