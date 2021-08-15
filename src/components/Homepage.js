import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'


const Homepage = () => {

  const [recentlyPubl, setRecentlyPubl] = useState()

  useEffect(() => {
    const getRecentlyPubl = async () => {
      const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=science+fiction&mode=everything&sort=new`)
      const obj = await response.json()
      console.log('objRecPubl:', obj.docs)
      setRecentlyPubl(obj.docs)
    }
    getRecentlyPubl()
    }, [])
  console.log('recentlyPubl:', recentlyPubl)



  return (

    <div style={{ margin: 'auto' }}>

        <div style={{ justifyContent: 'center', marginTop: '5px' }} >
        <Carousel
            next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
            prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
        >
        {
          recentlyPubl && 
              recentlyPubl.map((item, i) => {
                /* console.log('item.cover_i:', item.cover_i) */
                /* console.log('item.title:', item.title) */
                /* if ('item.cover_i' in item[i]) { */
                  return (
                    <div style={{ margin: '5px' }}>
                          <CarouselItem item={item} key={i} />
                         
                    </div>
                  )
              })
        }
        </Carousel>
        </div>

    </div>

  )
}

export default Homepage