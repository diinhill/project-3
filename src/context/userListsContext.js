import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'
import firebaseApp from "firebase/app"

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [userlists, setUserlists] = useState([])
    const [userList, setUserList] = useState([])
    const [listsIncludingThisBook, setListsIncludingThisBook] = useState([])
    const [publicLists, setPublicLists] = useState([])
    const [booksFromPublicList, setBooksFromPublicList] = useState()



    const createRandomListId = () => {
        let listId = ''
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (let i = 0; i < 20; i++) {
            listId += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        console.log('randomListId:', listId)
        return listId
    }

    const createOrAddBookToUserlistController = (listname, listid, mergedbookinfo) => {
        console.log(`listId`, listid)
        if (listid) {
            // (db.collection(`user/${user.uid}/userlists/${listid}/books`).doc(mergedbookinfo.title).set(mergedbookinfo)
            //     .then(() => {
            //         console.log(`document successfully written for: bookObject ${mergedbookinfo.title}`)
            //         getUserlists()
            //         getUserlist(listid)
            //     })
            //     .catch((error) => {
            //         console.error(`error adding document for: bookObject ${mergedbookinfo.title}`, error)
            //     })
            //     &&
            addRemovePublicListBook(listid, mergedbookinfo, true)

            db.collection(`user/${user.uid}/userlists`).doc(listid).update({
                // listId: listid,
                books: firebaseApp.firestore.FieldValue.arrayUnion(mergedbookinfo),
                // nameOfList: listname,
                // nameOfUser: user.displayName,
                numberOfBooks: firebaseApp.firestore.FieldValue.increment(1),
                listUpdatedOnDate: new Date()
            })
                .then(() => {
                    console.log(`document successfully written for: userlist ${listname}`)
                    // getUserlists()

                })
                .catch((error) => {
                    console.error(`error adding document for: userlist ${listname}`, error)
                })
        }
        else {
            const randomId = createRandomListId()
            db.collection(`user/${user.uid}/userlists`).doc(randomId).set({
                books: mergedbookinfo ? [mergedbookinfo] : [],
                private: true,
                listId: randomId,
                nameOfList: listname,
                nameOfUser: user.displayName,
                userUid: user.uid,
                numberOfBooks: mergedbookinfo ? 1 : 0,
                listUpdatedOnDate: new Date()
            })
                .then(() => {
                    console.log(`document successfully written for: userlist ${listname}`)

                    getUserlists()
                })
                .catch((error) => {
                    console.error(`error adding document for: userlist ${listname}`, error)
                })
        }

    }

    const removeBookFromList = (listname, listid, mergedbookinfo) => {
        // db.collection(`user/${user.uid}/userlists/${listid}/books`).doc(mergedbookinfo.title).delete(mergedbookinfo)
        //     .then(() => {
        //         console.log(`document successfully deleted for: bookObject ${mergedbookinfo.title}`)
        //         getUserlist(listid)
        //     })
        //     .catch((error) => {
        //         console.error(`error removing document for: bookObject ${mergedbookinfo.title}`, error)
        //     })
        //     &&
        console.log(`listid`, listid)
        console.log(`mergboo`, mergedbookinfo)
        addRemovePublicListBook(listid, mergedbookinfo, false)

        db.collection(`user`).doc(user.uid).collection(`userlists`).doc(listid).update({
            books: firebaseApp.firestore.FieldValue.arrayRemove(mergedbookinfo),
            // listId: listid,
            // nameOfList: listname,
            // nameOfUser: user.displayName,
            numberOfBooks: firebaseApp.firestore.FieldValue.increment(-1),
            listUpdatedOnDate: new Date()
        })
            .then(() => {
                console.log(`document successfully updated for: userlist ${listname}`)
                getUserlists()
            })
            .catch((error) => {
                console.error(`error updating document for: userlist ${listname}`, error)
            })
    }

    const deleteUserlist = async (list) => {
        const userlist = await getUserlist(list.listId)
        userlist.books?.map((book) =>
            db.collection(`user/${user.uid}/userlists/${list.listId}/books`).doc(book.title).delete(book)
                .then(() => {
                    console.log(`document successfully deleted for: bookObject ${book.title}`)
                })
                .catch((error) => {
                    console.error(`error removing document for: bookObject ${book.title}`, error)
                })
        )
        db.collection(`user/${user.uid}/userlists`).doc(list.listId).delete(list)
            .then(() => {
                console.log(`document successfully deleted for: userlist ${list.nameOfList}`)
            })
            .catch((error) => {
                console.error(`error deleting userlist ${list.nameOfList}`, error)
            })
    }

    const getUserlists = async () => {
        const lists = []
        await db.collection(`user/${user.uid}/userlists`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                lists.push(doc.data())
            })
            // console.log('userlists:', lists)
        })
        setUserlists(lists)
        return lists
    }
    const getUserListById = async (listId) => {
        const list = await db.collection(`user`).doc(user.uid).collection(`userlists`).doc(listId).get().then((doc) =>
            doc.data())
        return list
    }

    const getUserlist = async (listId) => {
        console.log(`listId`, listId)
        var booksListRef = db.collection(`user`).doc(user.uid).collection("userlists").doc(listId);
        try {
            const bookListDoc = await booksListRef.get();
            const bookList = bookListDoc.data()
            console.log(`bookList`, bookList)
            setUserList(bookList)
            return bookList
        }
        catch (err) {
            console.log('Error getting documents', err);
        }
        // const booksFromList = await .get().then((doc) => {
        //     setBooksFromUserlist(doc.data()?.books)

        // })
    }


    const getListsIncludingThisBook = async (mergedbookinfo) => {

        const lists = await getUserlists()
        console.log(`lists`, lists)

        const listsIncludingThisBook = lists.filter(list => {

            return list.books.filter(book => book.title === mergedbookinfo.title).length > 0

        })
        console.log(`listsIncludingThisBook`, listsIncludingThisBook)
        // const listsIncludingThisBook = lists.filter(list => {
        //     return list.books.length && list.books.filter(book => book.title === mergedbookinfo.title)
        // })
        // console.log(`listsIncludingThisBook`, listsIncludingThisBook)

        // const booksFromList = await getUserlist(list.listId)
        // console.log(`booksFromList`, booksFromList)
        // booksFromList.forEach((item) => {
        //     if (item.title === mergedbookinfo.title) {
        //         console.log('bookObject found in this list:', list.nameOfList)
        //         listsIncludingThisBook.push(list)
        //     }
        //     else {
        //         // console.log('bookObject not found in this list:', list)
        //     }
        // })
        // })
        // console.log('userlistsIncludingThisBook:', userlistsIncludingThisBook)
        setListsIncludingThisBook(listsIncludingThisBook)
        return listsIncludingThisBook
    }

    const setPublicList = async (listid) => {
        console.log('listid:', listid)
        // const lists = await getUserlists()
        // console.log('lists:', lists)
        // let list = lists?.find((listitem) => (listitem?.listId === listid))
        const list = await getUserListById(listid)
        console.log('list:', list)
        getUserlist(listid)
        list && db.collection(`lists/`).doc(`${user.uid}-${listid}`).set({
            ...list,
            private: false,
            listUpdatedOnDate: new Date()
        })
            .then(() => {
                console.log(`document successfully written in public lists for: userlist ${list.nameOfList}`)
            })
            .catch((error) => {
                console.error(`error adding document in public lists for: userlist ${list.nameOfList}`, error)
            })
        db.collection(`user/${user.uid}/userlists`).doc(listid).update({
            private: false
        })
            .then(() => {
                console.log(`document successfully written for: userlist ${listid}`)
                // getUserlists()
            })
            .catch((error) => {
                console.error(`error adding document for: userlist ${listid}`, error)
            })
    }
    const addRemovePublicListBook = async (listid, mergedbookinfo, add) => {
        console.log('mergedbookinfo:', mergedbookinfo)
        // const lists = await getUserlists()
        // console.log('lists:', lists)
        // let list = lists?.find((listitem) => (listitem?.listId === listid))
        const list = await getUserListById(listid)
        console.log('list:', list)
        if (!list.private)
            db.collection(`lists`).doc(`${user.uid}-${listid}`).update({
                books: add ? firebaseApp.firestore.FieldValue.arrayUnion(mergedbookinfo) : firebaseApp.firestore.FieldValue.arrayRemove(mergedbookinfo),
                numberOfBooks: add ? firebaseApp.firestore.FieldValue.increment(1) : firebaseApp.firestore.FieldValue.increment(-1),
                listUpdatedOnDate: new Date()
            })
                .then(() => {
                    console.log(`document successfully written in public lists for: userlist ${list.nameOfList}`)
                    getPublicLists()
                })
                .catch((error) => {
                    console.error(`error adding document in public lists for: userlist ${list.nameOfList}`, error)
                })
        //     db.collection(`user/${user.uid}/userlists`).doc(listid).update({
        //         private: false
        //     })
        //         .then(() => {
        //             console.log(`document successfully written for: userlist ${listid}`)
        //             // getUserlists()
        //         })
        //         .catch((error) => {
        //             console.error(`error adding document for: userlist ${listid}`, error)
        //         })
    }

    const deletePublicList = async (listid) => {
        const list = await getUserListById(listid)
        console.log('list:', list)
        getUserlist(listid)
        list && db.collection(`lists`).doc(`${user.uid}-${listid}`).delete()
            .then(() => {
                console.log(`document successfullydeleted public list: ${list.nameOfList}`)
            })
            .catch((error) => {
                console.error(`error adding document in public lists for: userlist ${list.nameOfList}`, error)
            })
        db.collection(`user/${user.uid}/userlists`).doc(listid).update({
            private: true
        })
            .then(() => {
                console.log(`document successfully written for: userlist ${listid}`)
                // getUserlists()
            })
            .catch((error) => {
                console.error(`error adding document for: userlist ${listid}`, error)
            })
    }

    const getPublicLists = async () => {
        const lists = []
        await db.collection(`lists/`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                lists.push(doc.data())
            })
            // console.log('userlists:', lists)
        })
        setPublicLists(lists)
        return lists
    }

    const getBooksFromPublicList = async (publicListId) => {
        console.log(`object`, publicListId)
        db.collection(`lists`).doc(publicListId).get().then((doc) => {
            console.log(`doc.data()`, doc.data())
            setBooksFromPublicList(doc.data())
        })
    }


    const copyPubliclistToMyList = async (publicListId) => {
        // console.log('listid:', publicListId)
        // let randomListId = createRandomListId()
        // const lists = await getPublicLists()
        // console.log('lists:', lists)
        // let list = lists?.filter((listitem) => (listitem?.publicListId === publicListId))[0]
        // console.log('list:', list)
        // const booksFromPublicList = await getBooksFromPublicList(publicListId)
        // list && db.collection(`user/${user.uid}/userlists/`).doc(randomListId).set({
        //     listId: randomListId,
        //     nameOfList: list?.nameOfList,
        //     nameOfUser: user.displayName,
        //     numberOfBooks: booksFromUserlist.length,
        //     listUpdatedOnDate: new Date()
        // })
        //     .then(() => {
        //         console.log(`document successfully written in public lists for: userlist ${list.nameOfList}`)
        //     })
        //     .catch((error) => {
        //         console.error(`error adding document in public lists for: userlist ${list.nameOfList}`, error)
        //     })
        // booksFromPublicList?.map((book) =>
        //     db.collection(`user/${user.uid}/userlists/${randomListId}/books`).doc(book.title).set(book)
        //         .then(() => {
        //             console.log(`document successfully written in public list for: bookObject ${book.title}`)
        //         })
        //         .catch((error) => {
        //             console.error(`error adding document in public list for: bookObject ${book.title}`, error)
        //         })
        // )
        // return randomListId
    }




    return (
        <UserListsContext.Provider value={{
            userlists, getUserlists, deleteUserlist, userList, getUserlist, createOrAddBookToUserlistController,
            removeBookFromList, listsIncludingThisBook, getListsIncludingThisBook, setPublicList, deletePublicList,
            publicLists, getPublicLists, booksFromPublicList, getBooksFromPublicList, copyPubliclistToMyList
        }}>
            {children}
        </UserListsContext.Provider>
    )
}