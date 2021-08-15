import React from 'react'
import AuthorPage from './AuthorPage'
import { MemoryRouter as Router } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {
  Switch,
  Route,
} from 'react-router-dom'



const ButtonRouter = ( {authorKey, authorName, authorRef} ) => {

    const href = `/authors/${authorName}`
    const aRef = authorRef
    const aKey = authorKey
    const aName = authorName
 
    const Link = React.forwardRef((props, ref) => (
      <RouterLink ref={aRef} to={href} {...props}  />
    ))


  return (
    <div>
    <Router>
      <div>
        <Button color="primary" component={Link} to={href} ref={aRef}>
          see author profile
        </Button>
      </div>

      <Switch>
        <div>
        <Route exact path={href}>
          <AuthorPage authorKey={aKey} authorName={aName} />
        </Route>
        </div>
      </Switch>

    </Router>
    </div>
  )
}
export default ButtonRouter
