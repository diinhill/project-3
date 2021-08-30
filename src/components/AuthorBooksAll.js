import React, { useContext } from 'react'
import BookListItem from './BookListItem'
import { BookContext } from '../context/bookContext'
import { List, ListItem } from '@material-ui/core'
// import { useParams } from 'react-router-dom'



const AuthorBooksAll = () => {

    let { authorInfoQ, authorBooksAll } = useContext(BookContext)

   
    console.log('authorInfoQ:', authorInfoQ)
    console.log('authorBooksAll:', authorBooksAll)


    return (

        <List>
            <div style={{ margin: 'auto' }}>
                <h2>{`books by ${authorInfoQ?.name}`}</h2>
                { authorBooksAll?.map((listitem, i) => 
                    <ListItem key={i} listitem={listitem}>
                        <BookListItem listitem={listitem} /> 
                    </ListItem> )}
            </div>
        </List>
        
    )

}
export default AuthorBooksAll


 {/* { authorInfoQ && authorBooksAll?.filter((item, i) => {
                        return authorInfoQ[i].top_work && 
                            <ListItem bookTitle ={item[i].title} />
                })} */}

