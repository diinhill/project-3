import React, { useContext, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'


const flexContainer = { display: 'flex', flexDirection: 'column' }



const PublicLists = () => {

    const { publicLists, getPublicLists } = useContext(UserListsContext)


    useEffect(() => {
        getPublicLists()
    }, [])

    console.log('publicLists:', publicLists)



    return (

        <div style={flexContainer} >
            <Typography>Public Lists</Typography>

            {publicLists ?
                publicLists.map((list, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/lists/public/${list?.listIdPublic}`}>
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

        </div>
    )
}

export default PublicLists
