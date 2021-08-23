import './App.css'
import Homepage from './components/Homepage'
import AuthorSearch from './components/AuthorSearch'
import AuthorPage from './components/AuthorPage'
import AuthorWorks from './components/AuthorWorks'
import BookSearch from './components/BookSearch'
import BookPage from './components/BookPage'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { AuthContextProvider } from './context/authContext'
// import { ThemeProvider } from './context/themeContext'
import Nav from "./components/Nav"



function App () {

  return (

    <div className="App">

        <AuthContextProvider>
          <Router>
            <Nav />
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
                <Route exact path="/books">
                  <BookSearch />
                </Route>
                <Route exact path={`/books/:selectedEdition`}>
                  <BookPage />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
          </Router>
        </AuthContextProvider>
    </div>
  )
}

export default App

