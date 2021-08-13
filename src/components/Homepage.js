import '.../App.css'
import React, { useState, useEffect } from 'react'
import InputField from './InputField'
import AuthorPage from './AuthorPage'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from '.CarouselItem'
import ButtonRouter from './ButtonRouter'


const App = () => {

  const [data, setData] = useState()
  const [recentlyPubl, setRecentlyPubl] = useState()
  const [selectedAuthorKey, setSelectedAuthorKey] = useState('')
  const [selectedAuthorName, setSelectedAuthorName] = useState('')

  const handleChange = ((event, value) => {
    setSelectedAuthorKey(value.key)
    setSelectedAuthorName(value.name)
  })
  console.log('selectedAuthorKey:', selectedAuthorKey)
  console.log('selectedAuthorName:', selectedAuthorName)

  // const handleSubmit = () => {
  //   console.log(selectedOptions)
  // }


  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search/authors.json?q=*`)
      const obj = await response.json()
      console.log('obj:', obj)
      console.log('obj.docs:', obj.docs)
      setData(obj)
    }
    getData()
    }, [])
  console.log('data:', data)


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

        { data &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
            <InputField data={data} handleChange={handleChange} />
            <ButtonRouter authorKey={selectedAuthorKey} authorName={selectedAuthorName} />
          </div>
        }


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
                          <CarouselItem item={item} />
                         
                    </div>
                  )
              })
        }
        </Carousel>
        </div>

    </div>

  )
}

export default App