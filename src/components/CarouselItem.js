import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { Paper, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import ImgThemedAppBar from './ImgThemedAppBar'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    },
    sciField: {
        backgroundColor: '#b2ebf2'
    },
    horrorField: {
        backgroundColor: '#b71c1c'
    },
})



const CarouselItem = ({ item }) => {

    const classes = useStyles()
    const { activeTheme, toggleTheme } = useContext(ThemeContext)


    return (

        <Container>
            {item.author_key && item.cover_edition_key &&

                <Paper >
                    <Link to={`/authors/${item?.author_key[0]}/books/${item?.cover_edition_key}`}>
                        <ImgThemedAppBar imgSrc={`http://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`} />
                        {/* <img src={`http://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`} alt='' /> */}
                    </Link>
                </Paper>
            }
        </Container>
    )
}
export default CarouselItem
