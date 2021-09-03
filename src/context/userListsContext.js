import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [userlists, setUserlists] = useState([])
    const [booksFromUserlist, setBooksFromUserlist] = useState([])
    const [userlistsIncludingThisBook, setUserlistsIncludingThisBook] = useState([])



    // const createNewList = (listName) => {
    //     db.collection(`user/${user.uid}/userlists`).doc(listName).set({
    //         userListName: listName,
    //         createdBy: user.displayName,
    //         numberOfBooks: getBooksInList(listName).length || 0,
    //         createdOnDate: new Date()
    //     })
    //         .then(() => {
    //             console.log('Document successfully written.')
    //             getLists()
    //         })
    //         .catch((error) => {
    //             console.error('Error adding document:', error)
    //         })
    // }

    const createOrAddBookToUserlistController = (nameOfListNewOrExisting, bookObject) => {
        const nameOfUserlistInFirestore = nameOfListNewOrExisting.replace(/\s+/g, '')
        bookObject ?
            db.collection(`user/${user.uid}/userlists/${nameOfUserlistInFirestore}/books`).doc(bookObject.title).set(bookObject)
                .then(() => {
                    console.log(`document successfully written for: bookObject ${bookObject.title}`)
                    getBooksFromUserlist(nameOfUserlistInFirestore)
                })
                .catch((error) => {
                    console.error(`error adding document for: bookObject ${bookObject.title}`, error)
                })
            &&
            db.collection(`user/${user.uid}/userlists`).doc(nameOfUserlistInFirestore).set({
                nameOfUserlistInFirestore: nameOfListNewOrExisting.replace(/\s+/g, ''),
                nameOfUserlist: nameOfListNewOrExisting,
                nameOfUser: user.displayName,
                numberOfBooks: booksFromUserlist.length + 1,
                userlistUpdatedOnDate: new Date()
            })
                .then(() => {
                    console.log(`document successfully written for: userlist ${nameOfListNewOrExisting}`)
                    getUserlists()
                })
                .catch((error) => {
                    console.error(`error adding document for: userlist ${nameOfListNewOrExisting}`, error)
                })

            :
            db.collection(`user/${user.uid}/userlists`).doc(nameOfListNewOrExisting).set({
                nameOfUserlistInFirestore: nameOfListNewOrExisting.replace(/\s+/g, ''),
                nameOfUserlist: nameOfListNewOrExisting,
                nameOfUser: user.displayName,
                numberOfBooks: 0,
                userlistCreatedOnDate: new Date()
            })
                .then(() => {
                    console.log(`document successfully written for: userlist ${nameOfListNewOrExisting}`)
                    getUserlists()
                })
                .catch((error) => {
                    console.error(`error adding document for: userlist ${nameOfListNewOrExisting}`, error)
                })
    }

    const removeBookFromUserlist = (nameOfList, bookObject) => {
        const nameOfUserlistInFirestore = nameOfList.replace(/\s+/g, '')
        db.collection(`user/${user.uid}/userlists/${nameOfUserlistInFirestore}/books`).doc(bookObject.title).delete(bookObject)
            .then(() => {
                console.log(`document successfully deleted for: bookObject ${bookObject.title}`)
                getBooksFromUserlist(nameOfUserlistInFirestore)
            })
            .catch((error) => {
                console.error(`error removing document for: bookObject ${bookObject.title}`, error)
            })
            &&
            db.collection(`user/${user.uid}/userlists`).doc(nameOfUserlistInFirestore).set({
                nameOfUserlistInFirestore: nameOfUserlistInFirestore,
                nameOfUserlist: nameOfList,
                nameOfUser: user.displayName,
                numberOfBooks: booksFromUserlist.length + 1,
                userlistUpdatedOnDate: new Date()
            })
                .then(() => {
                    console.log(`document successfully updated for: userlist ${nameOfList}`)
                    getUserlists()
                })
                .catch((error) => {
                    console.error(`error updating document for: userlist ${nameOfList}`, error)
                })
    }

    const deleteUserlist = async (userlist) => {
        const booksFromUserlist = await getBooksFromUserlist(userlist.nameOfUserlistInFirestore)
        booksFromUserlist?.map((book) =>
            db.collection(`user/${user.uid}/userlists/${userlist.nameOfUserlistInFirestore}/books`).doc(book.title).delete(book)
                .then(() => {
                    console.log(`document successfully deleted for: bookObject ${book.title}`)
                })
                .catch((error) => {
                    console.error(`error removing document for: bookObject ${book.title}`, error)
                })
        )
        db.collection(`user/${user.uid}/userlists`).doc(userlist.nameOfUserlistInFirestore).delete(userlist)
            .then(() => {
                console.log(`document successfully deleted for: userlist ${userlist.nameOfUserlist}`)
            })
            .catch((error) => {
                console.error(`error deleting userlist ${userlist.nameOfUserlist}`, error)
            })
    }

    const getUserlists = async () => {
        const lists = []
        await db.collection(`user/${user.uid}/userlists`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                lists.push(doc.data())
            })
            console.log('userlists:', lists)
        })
        setUserlists(lists)
        return lists
    }

    const getBooksFromUserlist = async (nameOfList) => {
        // const nameOfUserlistInFirestore = nameOfList.replace(/\s+/g, '')
        const booksFromList = []
        await db.collection(`user/${user.uid}/userlists/${nameOfList}/books`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                booksFromList.push(doc.data())
            })
            console.log('booksFromUserlist:', booksFromList)
        })
        setBooksFromUserlist(booksFromList)
        return booksFromList
    }

    const getUserlistsIncludingThisBook = async (bookObject) => {
        const userlistsIncludingThisBook = []
        const lists = await getUserlists()
        lists.forEach(async (list) => {
            const booksFromList = await getBooksFromUserlist(list.nameOfUserlist)
            booksFromList.forEach((item) => {
                if (item.title === bookObject.title) {
                    console.log('bookObject found in this list:', list.nameOfUserlist)
                    userlistsIncludingThisBook.push(list)
                }
                else {
                    // console.log('bookObject not found in this list:', list)
                }
            })
        })
        console.log('userlistsIncludingThisBook:', userlistsIncludingThisBook)
        setUserlistsIncludingThisBook(userlistsIncludingThisBook)
        return userlistsIncludingThisBook
    }




    return (
        <UserListsContext.Provider value={{ userlists, getUserlists, deleteUserlist, booksFromUserlist, getBooksFromUserlist, createOrAddBookToUserlistController, removeBookFromUserlist, userlistsIncludingThisBook, getUserlistsIncludingThisBook }}>
            {children}
        </UserListsContext.Provider>
    )
}