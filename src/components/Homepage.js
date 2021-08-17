import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'


const Homepage = () => {

  const [recentlyPubl, setRecentlyPubl] = useState()

  useEffect(() => {
    // const request = new XMLHttpRequest()
    //   request.open('GET',`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=science+fiction&mode=everything&sort=new`)
    //   request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    //   request.onload = function() {
    //   console.log('request.response:', request.responseText)
    //   }
    //   request.send()
    //   setRecentlyPubl(request.responseText)
    //   }, [])
    //   console.log('recentlyPubl:', recentlyPubl)

    const getRecentlyPubl = async () => {
      const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?q=science+fiction&mode=everything&sort=new`)
      const obj = await response.json()
      console.log('objRecPubl:', obj.docs)

      const hasCover = []
      obj.docs && obj.docs.map((item, i) => (
        item?.cover_i &&
        hasCover.push(item)
      ))
      setRecentlyPubl(hasCover)
    }

    getRecentlyPubl()
  }, [])
  console.log('recentlyPubl:', recentlyPubl)



  return (

    <div style={{ margin: 'auto' }}>

      <div style={{ justifyContent: 'center', marginTop: '5px' }} >
        <Carousel
        // next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        // prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        >
          {
            recentlyPubl &&
            recentlyPubl.map((item, i) =>
              <div style={{ margin: '5px' }}>
                <CarouselItem item={item} key={i} />
              </div>
            )
          }
        </Carousel>
      </div>

    </div>

  )
}

export default Homepage