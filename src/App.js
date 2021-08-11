import './App.css'
import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import AuthorPage from './components/AuthorPage'


const App = () => {

  const [data, setData] = useState()
  const [name, setName] = useState('')
  const [author, setAuthor] = useState()

  const handleChange = (event) => {
    setName(event.target.value)
  }

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
    const result = !name
      ? data
      : data && data.docs.filter(person => 
          person.name.toLowerCase().includes(name.toLocaleLowerCase()))

    console.log('result:', result)
    setAuthor(result)
  }, [name])



  return (

    <div style={{ maxWidth: '992px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <InputField name={name} handleChange={handleChange} />
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', marginTop: '5px' }}> 

        {
          author &&
            author.map(item => {
              console.log('item:', item)
              console.log('item.key:', item.key)
                return (
                      <div style={{ margin: "5px" }}>
                          <AuthorPage author={item} />
                      </div>
                      )
            })
        }

      </div>
    </div>

  )
}

export default App
