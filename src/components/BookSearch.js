import React, { useCallback, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'
import { useHistory } from 'react-router-dom'


const BookSearch = () => {

    const history = useHistory()

    const [options, setOptions] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [selectedTitle, setSelectedTitle] = useState('')
    const [selectedAuthorKey, setSelectedAuthorKey] = useState('')
    const [selectedEdition, setSelectedEdition] = useState('')


    const getOptionsAsync = async (text) => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=${text}`)
        const obj = await response.json()
        console.log('obj:', obj)
        console.log('obj.docs:', obj.docs)
        setOptions(obj.docs)
        }

    const getOptionsDelayed = useCallback(debounce((text, callback) => {
        getOptionsAsync(text)
    }, 500)
        , [])

    useEffect(() => {
        inputValue && !selectedTitle && getOptionsDelayed(inputValue)
    }, [inputValue])

    const handleChange = ((event, value) => {
        setSelectedTitle(value.title)
        setSelectedAuthorKey(value.author_key[0])
        setSelectedEdition(value.cover_edition_key)
    })

    useEffect(() => {
        selectedTitle && history.push(`/books/${selectedEdition}`)
        console.log('selectedTitle:', selectedTitle)
        console.log('selectedAuthorKey:', selectedAuthorKey)
        console.log('selectedEdition:', selectedEdition)
    }, [selectedTitle])


    return (  
            <Autocomplete
                options={options}
                getOptionLabel={(option) => `${option.title} by ${option.author_name}`}
                getOptionSelected={(option, value) => option.title === value.title}
                filterOptions={(x) => x} // disable filtering on client
                loading={options.length === 0}
                onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) =>
                    <TextField {...params} label='Search for Title' variant='outlined' />
                }
                onChange={handleChange}
            />
    )
}
export default BookSearch