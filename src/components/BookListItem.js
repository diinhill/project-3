import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

const flexContainer = { display: 'flex' }



const BookListItem = ({ listitem }) => {


    return (

        <div style={flexContainer}>
            {listitem?.author_key && listitem?.cover_edition_key &&
                <Link to={`/authors/${listitem?.author_key[0]}/books/${listitem?.cover_edition_key}`}>
                    <Paper>
                        <Typography>{listitem?.title}</Typography>
                        <img src={`http://covers.openlibrary.org/b/id/${listitem?.cover_i}-S.jpg`} alt='' />
                        {/* <h2>{item.title}</h2>
                                <p>{item.first_publish_year}</p>
                                <p>{item.author_name}</p> */}

                        {/* <Button className='CheckButton'>
                                    see full description
                                </Button> */}
                    </Paper>
                </Link>
            }
        </div>
    )
}

export default BookListItem

