import React, { useEffect, useContext } from 'react'
import { BookContext } from '../context/bookContext'
import { ThemeContext } from '../context/themeContext'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import { Typography } from '@material-ui/core'


const flexContainer = { display: 'flex' }



const Homepage = () => {

  let { newScifi, getNewScifi, newHorror, getNewHorror } = useContext(BookContext)
  const { activeTheme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    getNewScifi()
    getNewHorror()
  }, [])

  console.log('newScifi:', newScifi)
  console.log('newHorror:', newHorror)


  return (

    <div style={flexContainer}>
      {/* <div style={{ justifyContent: 'center', marginBottom: '5px' }} > */}
      {activeTheme === 'light' ?
        <div>
          <Typography variant='h4' color='secondary' component='h3'>newest in sci-fi</Typography>
          <Typography variant='h3' color='default' component='h6' align='center'>some haven't even been published yet</Typography>
          <Carousel
          // next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
          // prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)} 
          >
            {newScifi?.map((item, ii) =>
              <CarouselItem item={item} key={ii} />)}
          </Carousel>
        </div>
        :
        <div>
          <Typography variant='h4' color='secondary' component='h3'>new in horror literature</Typography>
          <Carousel>
            {newHorror?.map((item, ii) =>
              <CarouselItem item={item} key={ii} />)}
          </Carousel>
        </div>
      }
      {/* </div> */}
    </div>

  )

}
export default Homepage