import './App.css'
import Nav from './components/Nav'
import Homepage from './components/Homepage'
import AuthorSearch from './components/AuthorSearch'
import AuthorCard from './components/AuthorCard'
import AuthorBooksAll from './components/AuthorBooksAll'
import BookSearch from './components/BookSearch'
import BookCard from './components/BookCard'
import UserLists from './components/UserLists'
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { NewBooksContextProvider } from './context/newBooksContext'
import { BookContextProvider } from './context/bookContext'
import { AuthContextProvider, AuthContext } from './context/authContext'
import { UserListsContextProvider } from './context/userListsContext'
// import { Component } from 'react'
// import { ThemeProvider } from './context/themeContext'


const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('rest:', rest)
  const { user } = useContext(AuthContext)
  return (
    <Route {...rest} render={props => (
      user ?
        <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}



function App() {

  return (

    <div className='App'>
      <AuthContextProvider>
        <NewBooksContextProvider>
          <BookContextProvider>
            <UserListsContextProvider>
              <Router>
                <Nav />
                <Switch>
                  <Route exact path='/'>
                    <Homepage />
                  </Route>
                  <Route exact path='/authors'>
                    <AuthorSearch />
                  </Route>
                  <Route exact path={`/authors/:authorKey`}>
                    <AuthorCard />
                  </Route>
                  <Route exact path={`/authors/:authorKey/books/all`}>
                    <AuthorBooksAll />
                  </Route>
                  <Route exact path='/books'>
                    <BookSearch />
                  </Route>
                  <Route exact path={`/authors/:authorKey/books/:bookKey`}>
                    <BookCard />
                  </Route>
                  <Route exact path='/register'>
                    <Register />
                  </Route>
                  <Route exact path='/login'>
                    <Login />
                  </Route>
                  <PrivateRoute component={UserLists} exact path='/lists' />
                </Switch>
              </Router>
            </UserListsContextProvider>
          </BookContextProvider>
        </NewBooksContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App

