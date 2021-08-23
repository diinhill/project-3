import React from 'react'
import { Paper, /*Button*/ } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CarouselItem = ({ item }) => {

    // console.log('item.title1:', item.title)

    return (
        <Link to={`/books/${item.cover_edition_key}`}>
            <Paper>
                <img src={`http://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`} alt={`book cover`} />
                {/* <h2>{item.title}</h2>
                <p>{item.first_publish_year}</p>
                <p>{item.author_name}</p> */}

                {/* <Button className='CheckButton'>
                    see full description
                </Button> */}
            </Paper>
        </Link>
    )
}
export default CarouselItem
