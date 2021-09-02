import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [lists, setLists] = useState([])
    const [booksInList, setBooksInList] = useState([])
    const [listsIncludingThisBook, setListsIncludingThisBook] = useState([])



    const createNewList = (listName) => {
        db.collection(`user/${user.uid}/userlists`).doc(listName).set({
            userListName: listName,
            createdBy: user.displayName,
            numberOfBooks: db.collection(`user/${user.uid}/userlists`).doc(listName).length,
            createdOnDate: new Date()
        })
            .then(() => {
                console.log('Document successfully written.')
                getLists()
            })
            .catch((error) => {
                console.error('Error adding document:', error)
            })
    }


    const getLists = () => {
        const allLists = []
        db.collection(`user/${user.uid}/userlists`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                allLists.push(doc.data())
            })
            console.log('allLists:', allLists)
        })
        setLists(allLists)
        return allLists
    }

    const getBooksInList = (listName) => {
        const allBooksInList = []
        db.collection(`user/${user.uid}/userlists/${listName}/books`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                allBooksInList.push(doc.data())
            })
            console.log('allBooksInList:', allBooksInList)
        })
        setBooksInList(allBooksInList)
        return allBooksInList
    }

    const addBookToList = (newOrExistingList, bookObject) => {
        db.collection(`user/${user.uid}/userlists/${newOrExistingList}/books`).doc(bookObject.title).set(bookObject)
            .then(() => {
                console.log('Document successfully written.')
            })
            .catch((error) => {
                console.error('Error adding document:', error)
            })
    }

    const removeBookFromList = (existingList, bookObject) => {
        db.collection(`user/${user.uid}/userlists/${existingList}/books`).doc(bookObject.title).delete(bookObject)
            .then(() => {
                console.log('Document successfully deleted!')
            })
            .catch((error) => {
                console.error('Error removing document:', error)
            })
    }

    const getListsIncludingThisBook = async (bookObject) => {
        const listsIncludingThisBook = []
        const allLists = await getLists()
        allLists.forEach(async (list) => {
            const allBooksInList = await getBooksInList(list.userListName)
            allBooksInList.forEach((listItem) => {
                if (listItem.title === bookObject.title) {
                    console.log('bookObject found in this list:', list)
                    listsIncludingThisBook.push(list)
                }
                else {
                    console.log('bookObject not found in this list:', list)
                }
            })
        })
        console.log('listsIncludingThisBook:', listsIncludingThisBook)
        setListsIncludingThisBook(listsIncludingThisBook)
        return listsIncludingThisBook
    }




    return (
        <UserListsContext.Provider value={{ createNewList, lists, getLists, booksInList, getBooksInList, addBookToList, removeBookFromList, listsIncludingThisBook, getListsIncludingThisBook }}>
            {children}
        </UserListsContext.Provider>
    )
}