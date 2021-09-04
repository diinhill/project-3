import React, { useContext, useEffect } from 'react'
import { UserListsContext } from '../context/userListsContext'
import { Paper } from '@material-ui/core'
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

            <h2>Public Lists</h2>

            {publicLists ?
                publicLists.map((list, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/lists/public/${list?.listIdPublic}`}>
                                <Paper>
                                    <h4>{list?.nameOfList}</h4>
                                    <h6>{((list?.listUpdatedOnDate).toDate().toLocaleString('en').substring(0, 14))}</h6>
                                    <h6>{list?.nameOfUser}</h6>
                                    <h6>{list?.numberOfBooks}</h6>
                                </Paper>
                            </Link>
                        </div>
                    )
                })
                : <h2>Loading...</h2>
            }

        </div>
    )
}

export default PublicLists
