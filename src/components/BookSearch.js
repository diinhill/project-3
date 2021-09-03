import React, { useCallback, useEffect, useState, } from 'react'
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
    const [reset, setReset] = useState(false)


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
        value?.author_key ? setSelectedAuthorKey(value?.author_key[0]) : handleInsufficientDataInOptionSelected()
        value?.cover_edition_key ? setSelectedEdition(value?.cover_edition_key) : handleInsufficientDataInOptionSelected()
    })

    useEffect(() => {
        (selectedTitle && selectedAuthorKey && selectedEdition) && history.push(`/authors/${selectedAuthorKey}/books/${selectedEdition}`)
        console.log('options:', options)
        console.log('selectedTitle:', selectedTitle)
        console.log('selectedAuthorKey:', selectedAuthorKey)
        console.log('selectedEdition:', selectedEdition)
    }, [selectedTitle])

    const handleInsufficientDataInOptionSelected = () => {
        alert('insufficient data! try another book, please.')
        setReset(!reset)
        setInputValue('')
        setOptions([])
        setSelectedTitle('')
    }


    return (
        <Autocomplete
            key={reset}
            options={options}
            getOptionLabel={(option) => `${option.title} by ${option?.author_name}`}
            getOptionSelected={(option, value) => option.title === value.title}
            loading={(options.length === 0)}
            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) =>
                <TextField {...params} label='Search for Title' variant='outlined' />
            }
            onChange={handleChange}
        />
    )
}
export default BookSearch