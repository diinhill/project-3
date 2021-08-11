import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const InputField = (props) => {
  const classes = useStyles()

  console.log('name:', props.name)

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="outlined">
        <OutlinedInput id="component-outlined" value={props.name} onChange={props.handleChange} />
      </FormControl>
    </form>
  )
}

export default InputField