import React, { useContext } from 'react'
import BookListItem from './BookListItem'
import { BookContext } from '../context/bookContext'
import { List, ListItem } from '@material-ui/core'



const AuthorBooksAll = () => {

    let { mergedAuthorInfo, booksByTitle } = useContext(BookContext)


    console.log('mergedAuthorInfo:', mergedAuthorInfo)
    console.log('booksByTitle:', booksByTitle)


    return (

        <List>
            <div style={{ margin: 'auto' }}>
                <h2>{`books by ${mergedAuthorInfo?.name}`}</h2>
                {booksByTitle?.map((listitem, i) =>
                    <ListItem key={i} listitem={listitem}>
                        <BookListItem listitem={listitem} />
                    </ListItem>)}
            </div>
        </List>

    )

}
export default AuthorBooksAll



