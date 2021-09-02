import React, { useEffect, useContext } from 'react'
import { NewBooksContext } from '../context/newBooksContext'
import { ThemeContext } from '../context/themeContext'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'


const flexContainer = { display: 'flex' }



const Homepage = () => {

  let { newScifi, getNewScifi, newHorror, getNewHorror } = useContext(NewBooksContext)
  const { activeTheme } = useContext(ThemeContext)

  useEffect(() => {
    getNewScifi()
    getNewHorror()
  }, [])

  console.log('newScifi:', newScifi)
  console.log('newHorror:', newHorror)


  return (

    <div style={flexContainer}>
      <div style={{ justifyContent: 'center', marginBottom: '5px' }} >
        {activeTheme === 'light' ?
          <Carousel
          // next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
          // prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)} 
          >
            {newScifi?.map((item, ii) =>
              <CarouselItem item={item} key={ii} />)}
          </Carousel>
          :
          <Carousel>
            {newHorror?.map((item, ii) =>
              <CarouselItem item={item} key={ii} />)}
          </Carousel>
        }
      </div>
    </div>

  )

}
export default Homepage