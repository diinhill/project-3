import React from 'react'
import { MemoryRouter as Router } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
))

const ButtonRouter = ( {authorKey} ) => {
    
  return (
    <Router>
      <div>
        {/* <Button color="primary" component={RouterLink} to="/">
          With prop forwarding
        </Button>
        <br /> */}
        <Button color="primary" component={LinkBehavior}>
          see author page
        </Button>
      </div>
    </Router>
  );
}
export default ButtonRouter
