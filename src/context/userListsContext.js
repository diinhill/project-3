import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [lists, setLists] = useState([])
    const [booksInList, setBooksInList] = useState([])
    // const [bookIsInList, setBookIsInList] = useState(false)



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
        db.collection(`user/${user.uid}/userlists/${listName}/books`).doc(bookObject.title).set(bookObject)
            .then(() => {
                console.log("Document successfully written.")
            })
            .catch((error) => {
                console.error("Error adding document: ", error)
            })
    }
    const getBooksInList = (listName) => {
        db.collection(`user/${user.uid}/userlists/${listName}/books`).get().then((querySnapshot) => {
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

    const getBookIsInList = (bookObject) => {
        const bookExists = getLists().forEach((list) => {
            list.forEach((item) => {
                if (item.title == bookObject.title) {
                    console.log("Document data:", bookObject)
                    return bookObject
                }
                else {
                    console.log("No such document!")
                }
            })
        })
        if (bookExists) {
            return true
        } else {
            return false
        }
    }


    // const getBookIsInList = (bookObject) => {
    //     db.collection(`user/${user.uid}/userlists`).get().then((querySnapshot) => {
    //         const bookExists = []
    //         bookExists = querySnapshot.where("", "array-contains", bookObject)
    //         if (bookExists) {
    //             console.log("Document data:", bookObject.data())
    //             return true
    //         } else {
    //             console.log("No such document!")
    //             return false
    //         }

    //         querySnapshot.forEach((doc) = {
    //             if (doc contains bookObject) {
    //                 console.log("Document data:", bookObject.data())
    //                 bookExists.push(bookObject.data())
    //             } else {
    //                 console.log("No such document!")
    //             }
    //         })
    //         if (bookObject.exists) {
    //             console.log("Document data:", book.data())
    //             setBookIsInList(true)
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!")
    //         }


    //     }).catch((error) => {
    //         console.log("Error getting document:", error)
    //     })
    // }







    return (
        <UserListsContext.Provider value={{ lists, createNewList, getLists, addBookToList, booksInList, removeBookFromList, /*bookIsInList,*/ getBookIsInList }}>
            {children}
        </UserListsContext.Provider>
    )
}