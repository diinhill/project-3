import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [lists, setLists] = useState([])
    const [booksInList, setBooksInList] = useState()



    const createNewList = (listName) => {
        db.collection(`user/${user.uid}/userlists`).doc(listName).set({
            userListName: listName,
            createdBy: user.displayName,
            numberOfBooks: '',
            createdOnDate: new Date()
        })
            .then(() => {
                console.log("Document successfully written.")
                getLists()
            })
            .catch((error) => {
                console.error("Error adding document: ", error)
            })
    }
    const getLists = () => {
        db.collection(`user/${user.uid}/userlists`).get().then((querySnapshot) => {
            const allLists = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                allLists.push(doc.data())
            })
            console.log('allLists:', allLists)
            setLists(allLists)
        })
    }


    const addBookToList = (listName, bookObject) => {
        db.collection(`user/${user.uid}/userlists/${listName}`).doc(bookObject).set({
            // userListName: listName,
            // createdBy: user.displayName,
            // numberOfBooks: '',
            // createdOnDate: new Date()
        })
            .then(() => {
                console.log("Document successfully written.")
                getBooksInList()
            })
            .catch((error) => {
                console.error("Error adding document: ", error)
            })
    }
    const getBooksInList = (listName) => {
        db.collection(`user/${user.uid}/userlists/${listName}`).get().then((querySnapshot) => {
            const allBooksInList = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                allBooksInList.push(doc.data())
            })
            console.log('allBooksInList:', allBooksInList)
            setBooksInList(allBooksInList)
        })
    }


    const removeBookFromList = () => {

    }








    return (
        <UserListsContext.Provider value={{ lists, createNewList, getLists, addBookToList, booksInList, removeBookFromList }}>
            {children}
        </UserListsContext.Provider>
    )
}