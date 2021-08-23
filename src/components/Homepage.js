import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'


const Homepage = () => {

  const [newScifi, setNewScifi] = useState()
  const [newHorror, setNewHorror] = useState()

  useEffect(() => {

    const getNewScifi = async () => {
      const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=science+fiction&mode=everything&sort=new`)
      const obj = await response.json()
      console.log('newScifi:', obj.docs)
      setNewScifi( obj?.docs.filter(item  =>  {
        return item?.cover_i && (item?.cover_i !== 11096487)  
      }))
    }

    const getNewHorror = async () => {
      const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=horror&mode=everything&sort=new`)
      const obj = await response.json()
      console.log('newHorror:', obj.docs)
      setNewHorror( obj?.docs.filter(item  =>  {
        return item?.cover_i && (item?.cover_i !== 11096487)  
      }))
    }

    getNewScifi()
    getNewHorror()
  }, [])

 console.log('newScifi:', newScifi)
 console.log('newHorror:', newHorror)


  return (

    <div style={{ margin: 'auto' }}>

      <div style={{ justifyContent: 'center', marginTop: '5px' }} >
        <Carousel
        // next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        // prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        >
          {
            newScifi?.map((item,ii) =>
                <CarouselItem item={item} key={ii} />
            )
          }
        </Carousel>
        <Carousel>
          {
            newHorror?.map((item,ii) =>
                <CarouselItem item={item} key={ii} />
            )
          }
        </Carousel>
      </div>

    </div>

  )

}
export default Homepage