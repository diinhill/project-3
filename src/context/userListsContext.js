import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [userlists, setUserlists] = useState([])
    const [booksFromUserlist, setBooksFromUserlist] = useState([])
    const [listsIncludingThisBook, setListsIncludingThisBook] = useState([])
    const [publicLists, setPublicLists] = useState([])
    const [booksFromPublicList, setBooksFromPublicList] = useState([])



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
        let randomListId = ''
        !listid && (randomListId = createRandomListId())
        listid && mergedbookinfo ?
            (db.collection(`user/${user.uid}/userlists/${listid}/books`).doc(mergedbookinfo.title).set(mergedbookinfo)
                .then(() => {
                    console.log(`document successfully written for: bookObject ${mergedbookinfo.title}`)
                    getUserlists()
                    getBooksFromUserlist(listid)
                })
                .catch((error) => {
                    console.error(`error adding document for: bookObject ${mergedbookinfo.title}`, error)
                })
                &&
                db.collection(`user/${user.uid}/userlists`).doc(listid).set({
                    listId: listid,
                    nameOfList: listname,
                    nameOfUser: user.displayName,
                    numberOfBooks: booksFromUserlist.length + 1,
                    listUpdatedOnDate: new Date()
                })
                    .then(() => {
                        console.log(`document successfully written for: userlist ${listname}`)
                        // getUserlists()
                    })
                    .catch((error) => {
                        console.error(`error adding document for: userlist ${listname}`, error)
                    }))
            :
            randomListId &&
            db.collection(`user/${user.uid}/userlists`).doc(randomListId).set({
                listId: randomListId,
                nameOfList: listname,
                nameOfUser: user.displayName,
                numberOfBooks: 0,
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

    const removeBookFromList = (listname, listid, mergedbookinfo) => {
        db.collection(`user/${user.uid}/userlists/${listid}/books`).doc(mergedbookinfo.title).delete(mergedbookinfo)
            .then(() => {
                console.log(`document successfully deleted for: bookObject ${mergedbookinfo.title}`)
                getBooksFromUserlist(listid)
            })
            .catch((error) => {
                console.error(`error removing document for: bookObject ${mergedbookinfo.title}`, error)
            })
            &&
            db.collection(`user/${user.uid}/userlists`).doc(listid).set({
                listId: listid,
                nameOfList: listname,
                nameOfUser: user.displayName,
                numberOfBooks: booksFromUserlist.length - 1,
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
        const booksFromUserlist = await getBooksFromUserlist(list.listId)
        booksFromUserlist?.map((book) =>
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

    const getBooksFromUserlist = async (listId) => {
        const booksFromList = []
        await db.collection(`user/${user.uid}/userlists/${listId}/books`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                booksFromList.push(doc.data())
            })
            // console.log('booksFromUserlist:', booksFromList)
        })
        setBooksFromUserlist(booksFromList)
        return booksFromList
    }

    const getListsIncludingThisBook = async (mergedbookinfo) => {
        const listsIncludingThisBook = []
        const lists = await getUserlists()
        lists.forEach(async (list) => {
            const booksFromList = await getBooksFromUserlist(list.listId)
            booksFromList.forEach((item) => {
                if (item.title === mergedbookinfo.title) {
                    console.log('bookObject found in this list:', list.nameOfList)
                    listsIncludingThisBook.push(list)
                }
                else {
                    // console.log('bookObject not found in this list:', list)
                }
            })
        })
        // console.log('userlistsIncludingThisBook:', userlistsIncludingThisBook)
        setListsIncludingThisBook(listsIncludingThisBook)
        return listsIncludingThisBook
    }

    const getPublicListId = async (listid) => {
        console.log('listid:', listid)
        let randomListId = createRandomListId()
        const lists = await getUserlists()
        console.log('lists:', lists)
        let list = lists?.filter((listitem) => (listitem?.listId === listid))[0]
        console.log('list:', list)
        const booksFromUserlist = await getBooksFromUserlist(listid)
        list && db.collection(`lists/`).doc(randomListId).set({
            listIdPublic: randomListId,
            nameOfList: list?.nameOfList,
            nameOfUser: user.displayName,
            numberOfBooks: booksFromUserlist.length,
            listUpdatedOnDate: new Date()
        })
            .then(() => {
                console.log(`document successfully written in public lists for: userlist ${list.nameOfList}`)
            })
            .catch((error) => {
                console.error(`error adding document in public lists for: userlist ${list.nameOfList}`, error)
            })
        booksFromUserlist?.map((book) =>
            db.collection(`lists/${randomListId}/books`).doc(book.title).set(book)
                .then(() => {
                    console.log(`document successfully written in public list for: bookObject ${book.title}`)
                })
                .catch((error) => {
                    console.error(`error adding document in public list for: bookObject ${book.title}`, error)
                })
        )
        return randomListId
    }

    const deletePublicListId = async (publicListId, listId) => {
        const booksFromUserlist = await getBooksFromUserlist(listId)
        booksFromUserlist?.map((book) =>
            db.collection(`lists/${publicListId}/books`).doc(book.title).delete(book)
                .then(() => {
                    console.log(`document successfully deleted in public list for: bookObject ${book.title}`)
                })
                .catch((error) => {
                    console.error(`error removing document from public list for: bookObject ${book.title}`, error)
                })
        )
        db.collection(`lists/`).doc(publicListId).delete(listId)
            .then(() => {
                console.log(`document successfully deleted from public lists for: userlist ${listId.nameOfList}`)
            })
            .catch((error) => {
                console.error(`error deleting from public lists for: userlist ${listId.nameOfList}`, error)
            })
        return null
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
        const booksFromList = []
        await db.collection(`lists/${publicListId}/books`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                booksFromList.push(doc.data())
            })
            // console.log('booksFromUserlist:', booksFromList)
        })
        setBooksFromPublicList(booksFromList)
        return booksFromList
    }

    const getPrivateListId = async (publicListId) => {
        console.log('listid:', publicListId)
        let randomListId = createRandomListId()
        const lists = await getPublicLists()
        console.log('lists:', lists)
        let list = lists?.filter((listitem) => (listitem?.publicListId === publicListId))[0]
        console.log('list:', list)
        const booksFromPublicList = await getBooksFromPublicList(publicListId)
        list && db.collection(`user/${user.uid}/userlists/`).doc(randomListId).set({
            listId: randomListId,
            nameOfList: list?.nameOfList,
            nameOfUser: user.displayName,
            numberOfBooks: booksFromUserlist.length,
            listUpdatedOnDate: new Date()
        })
            .then(() => {
                console.log(`document successfully written in public lists for: userlist ${list.nameOfList}`)
            })
            .catch((error) => {
                console.error(`error adding document in public lists for: userlist ${list.nameOfList}`, error)
            })
        booksFromPublicList?.map((book) =>
            db.collection(`user/${user.uid}/userlists/${randomListId}/books`).doc(book.title).set(book)
                .then(() => {
                    console.log(`document successfully written in public list for: bookObject ${book.title}`)
                })
                .catch((error) => {
                    console.error(`error adding document in public list for: bookObject ${book.title}`, error)
                })
        )
        return randomListId
    }




    return (
        <UserListsContext.Provider value={{
            userlists, getUserlists, deleteUserlist, booksFromUserlist, getBooksFromUserlist, createOrAddBookToUserlistController,
            removeBookFromList, listsIncludingThisBook, getListsIncludingThisBook, getPublicListId, deletePublicListId,
            publicLists, getPublicLists, booksFromPublicList, getBooksFromPublicList, getPrivateListId
        }}>
            {children}
        </UserListsContext.Provider>
    )
}