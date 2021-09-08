import React, { useEffect, useContext } from 'react'
import { BookContext } from '../context/bookContext'
import { ThemeContext } from '../context/themeContext'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
  field: {
    display: 'blocks',
    marginBottom: 20,
    // marginTop: 20,
  },
})



const Homepage = () => {

  const classes = useStyles()
  const { newScifi, getNewScifi, newHorror, getNewHorror } = useContext(BookContext)
  const { activeTheme } = useContext(ThemeContext)

  useEffect(() => {
    getNewScifi()
    getNewHorror()
  }, [])

  console.log('newScifi:', newScifi)
  console.log('newHorror:', newHorror)


  return (

    <Container>
      {activeTheme === 'light' ?
        <div>
          <Typography>newest in sci-fi</Typography>
          <Typography>some haven't even been published yet</Typography>
          <Carousel className={classes.field} indicators={false}>
            {newScifi?.filter((item, i) => i > 0 && item?.author_key).map((item, ii) =>
              <CarouselItem item={item} key={ii} />)}
          </Carousel>
        </div>
        :
        <div>
          <Typography variant='h4' color='secondary' component='h3'>new in horror literature</Typography>
          <Carousel className={classes.field} indicators={false}>
            {newHorror?.filter((item, i) => i > 0 && item?.author_key).map((item, ii) =>
              <CarouselItem item={item} key={ii} />)}
          </Carousel>
        </div>
      }
    </Container>

  )

}
export default Homepage