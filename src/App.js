import './App.css'
// import InputField from './components/InputField'
import AuthorSearch from './components/AuthorSearch'
import Homepage from './components/Homepage'
// import ButtonRouter from './components/ButtonRouter'
// import { Link as RouterLink } from 'react-router-dom'
import AuthorPage from './components/AuthorPage'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'




const App = () => {

  return (
    <div className="App">

      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>

          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/authors">
            {/* <InputField /> */}
            <AuthorSearch />
          </Route>
          <Route exact path={`/authors/:authorKey`}>
            <AuthorPage />
          </Route>
        </Switch>
        {/* 6 add a url link when clicking on a character and define a route handling the name as URL parameter */}


      </Router>
    </div>
  )
}

export default App

