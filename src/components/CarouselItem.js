import React from 'react'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CarouselItem = ({ item }) => {

    // console.log('item.title1:', item.title)

    return (
        <div>
        { item.author_key && item.cover_edition_key &&
            <Link to={`/authors/${item?.author_key[0]}/books/${item?.cover_edition_key}`}>
                <Paper>
                    <img src={`http://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`} alt='' />
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
export default CarouselItem
