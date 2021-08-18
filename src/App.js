import './App.css'
import Homepage from './components/Homepage'
import AuthorSearch from './components/AuthorSearch'
import AuthorPage from './components/AuthorPage'
import BookSearch from './components/BookSearch'
import BookPage from './components/BookPage'
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
            <li>
              <Link to="/works">Books</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/authors">
            <AuthorSearch />
          </Route>
          <Route exact path={`/authors/:authorKey`}>
            <AuthorPage />
          </Route>
          <Route exact path="/works">
            <BookSearch />
          </Route>
          <Route exact path={`/works/:bookKey`}>
            <BookPage />
          </Route>
        </Switch>

      </Router>
    </div>
  )
}

export default App

