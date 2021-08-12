import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'


const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.name,
})


const InputField = ( {data, handleChange} ) => {


  return (
      <Autocomplete
        id="autocomplete-filter"
        options={data.docs}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.name === value.name }
        filterOptions={filterOptions}
        style={{ width: 300 }}
        renderInput={(filterOptions) => <TextField {...filterOptions} label="Custom filter" variant="outlined" />}
        onChange={handleChange}
      />
  )
}
export default InputField