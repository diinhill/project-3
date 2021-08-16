import React from 'react'
import { Paper, Button } from '@material-ui/core'

const CarouselItem = ({ item }) => {

    // console.log('item.title1:', item.title)

    return (
        <Paper>
            <img src={`http://covers.openlibrary.org/b/isbn/${item?.isbn[0]}-M.jpg`} alt={'cover'} />
            <h2>{item.title}</h2>
            <p>{item.first_publish_year}</p>
            <p>{item.author_name}</p>

            <Button className='CheckButton'>
                see full description
            </Button>
        </Paper>
    )
}
export default CarouselItem
