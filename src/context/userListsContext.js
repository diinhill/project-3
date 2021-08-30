import React, { createContext, useContext, useState } from 'react'
import firebase from '../config'
import { AuthContext } from './authContext'

const db = firebase.firestore()

export const UserListsContext = createContext()



export const UserListsContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [newList, setNewList] = useState()
    const [newFavourite, setNewFavourite] = useState()



    const createNewList = () => {
        db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id)
            })
            .catch((error) => {
                console.error("Error adding document: ", error)
            })
    }
    const getNewList = () => {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`)
            })
        })
    }

    const addFavouriteToList = () => {

    }








    return (
        <UserListsContext.Provider value={{ newList, createNewList, getNewList, newFavourite, addFavouriteToList }}>
            {children}
        </UserListsContext.Provider>
    )
}