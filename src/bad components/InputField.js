// import React, { useState, useEffect } from 'react'
// import TextField from '@material-ui/core/TextField'
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
// import ButtonRouter from './ButtonRouter'



// const InputField = () => {

//   const [data, setData] = useState()
//   const [selectedAuthorKey, setSelectedAuthorKey] = useState('')
//   const [selectedAuthorName, setSelectedAuthorName] = useState('')
//   const ref = React.createRef()

//   const handleChange = ((event, value) => {
//     setSelectedAuthorKey(value.key)
//     setSelectedAuthorName(value.name)
//   })
//   console.log('selectedAuthorKey:', selectedAuthorKey)
//   console.log('selectedAuthorName:', selectedAuthorName)


//   useEffect(() => {
//     const request = new XMLHttpRequest()
//       request.open('GET',`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search/authors.json?q=*`)
//       request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
//       request.onload = function() {
//       console.log('request.response:', request.responseText)
//       }
//       request.send()
//       setData(request.responseText)
//       }, [])
//       console.log('data:', data)



//     const getData = async () => {
//       const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/http://openlibrary.org/search/authors.json?q=*&offset=50`)
//       const obj = await response.json()
//       console.log('obj:', obj)
//       console.log('obj.docs:', obj.docs)
//       setData(obj)
//     }
//     getData()
//     }, [])
//   console.log('data:', data)


//   const filterOptions = createFilterOptions({
//     matchFrom: 'start',
//     stringify: (option) => option.name,
//   })


//   return (

//     <div style={{ margin: 'auto' }}>

//       { data &&
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
//           <ButtonRouter authorKey={selectedAuthorKey} authorName={selectedAuthorName} authorRef={ref} />
//           <Autocomplete
//             id="autocomplete-filter"
//             options={data.docs}
//             getOptionLabel={(option) => option.name}
//             getOptionSelected={(option, value) => option.name === value.name }
//             filterOptions={filterOptions}
//             style={{ width: 300 }}
//             renderInput={(filterOptions) => <TextField {...filterOptions} label="Custom filter" variant="outlined" />}
//             onChange={handleChange}
//           />
//         </div>
//       }
//       /</div>
//     )
// }
// export default InputField