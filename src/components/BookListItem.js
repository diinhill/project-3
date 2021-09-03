import React from 'react'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'


const BookListItem = ({ listitem }) => {

    // let { authorKey} = useParams()
    console.log('listitem:', listitem)


    return (

        <div style={{ margin: 'auto' }}>
            {listitem?.author_key && listitem?.cover_edition_key &&
                <Link to={`/authors/${listitem?.author_key[0]}/books/${listitem?.cover_edition_key}`}>
                    <Paper>
                        <h4>{listitem?.title}</h4>
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

