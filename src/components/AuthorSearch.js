import React, { useCallback, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'
import { useHistory } from 'react-router-dom'


const AuthorSearch = () => {

  const history = useHistory()

  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedAuthorKey, setSelectedAuthorKey] = useState()
  const [selectedAuthorName, setSelectedAuthorName] = useState('')

  // console.log('options:', options)
  // console.log('selectedAuthorName:', selectedAuthorName)
  // console.log('selectedAuthorKey:', selectedAuthorKey)

  const getOptionsAsync = async (text) => {
    const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search/authors.json?q=${text}`)
    const obj = await response.json()
    console.log('obj:', obj)
    console.log('obj.docs:', obj.docs)
    setOptions(obj.docs)
  }

  const getOptionsDelayed = useCallback(debounce((text, callback) => {
    // setOptions([])
    getOptionsAsync(text)
  }, 500)
    , [])

  useEffect(() => {
    // getOptionsDelayed(inputValue, (filteredOptions) => {
    //   setOptions(filteredOptions);
    // getOptionsAsync()
    inputValue && !selectedAuthorKey && getOptionsDelayed(inputValue)
  }, [inputValue])

  const handleChange = ((event, value) => {
    setSelectedAuthorKey(value.key)
    setSelectedAuthorName(value.name)
    // console.log('selectedAuthorKey:', selectedAuthorKey)
    // console.log('selectedAuthorName:', selectedAuthorName)
  })

  useEffect(() => {
    selectedAuthorKey && history.push(`/authors/${selectedAuthorKey}`)
    console.log('selectedAuthorKey:', selectedAuthorKey)
    console.log('selectedAuthorName:', selectedAuthorName)
  }, [selectedAuthorKey])



  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option, value) => option.name === value.name}
      filterOptions={(x) => x} // disable filtering on client
      loading={options.length === 0}
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) =>
        <TextField {...params} label='Search for Author' variant='outlined' />
      }
      onChange={handleChange}
    />
  )
}
export default AuthorSearch