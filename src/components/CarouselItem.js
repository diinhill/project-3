import React from 'react'
import { Paper, Button } from '@material-ui/core'
import BookPage from './BookPage'

const CarouselItem = ({ item }) => {

    // console.log('item.title1:', item.title)

    return (
        <Paper>
            <img src={`http://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`} alt={'book cover'} />
            <h2>{item.title}</h2>
            <p>{item.first_publish_year}</p>
            <p>{item.author_name}</p>

            <Button className='CheckButton'>
                see full description
                <BookPage bookKey={item.key} />
            </Button>
        </Paper>
    )
}
export default CarouselItem
