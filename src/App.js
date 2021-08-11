import './App.css'
import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import AuthorPage from './components/AuthorPage'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './components/CarouselItem'


const App = () => {

  const [data, setData] = useState()
  const [name, setName] = useState('')
  const [recentlyPubl, setRecentlyPubl] = useState()

  const handleChange = (event) => {
    setName(event.target.value)
  }

    const results = !name
      ? data
      : data && data.docs.filter(person => 
          person.name.toLowerCase().includes(name.toLocaleLowerCase()))
    console.log('results:', results)
  

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

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <InputField name={name} handleChange={handleChange} />
      </div>

      <div style={{ display: 'grid', justifyContent: 'center', marginTop: '5px' }}>
        {
          results && 
               results.map(item => {
                  <p>{item.name}</p>
                })
        }
        </div>  

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
