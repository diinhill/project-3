import InputField from './components/InputField'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import AuthorPage from './components/AuthorPage'



function App() {

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
            <h1>React Router</h1>
          </Route>
          <Route exact path="/authors">
            <InputField />
          </Route>
          <Route exact path="/authors/:name">
            <AuthorPage />
          </Route>
        </Switch>
        {/* 6 add a url link when clicking on a character and define a route handling the name as URL parameter */}


      </Router>
    </div>
  )
}

export default App

