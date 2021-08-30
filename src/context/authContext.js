import { createContext, useState, useEffect } from 'react'
import firebase from '../config'

export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid
                console.log('user:', user)
            } else {
                // User is signed out
                // ...
            }
        })
    }, [])

    const register = ({ email, password, name }) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user
                console.log('user:', user)
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log('errorMessage:', errorMessage)
            })
    }

    const login = ({ email, password }) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                console.log('user:', user)
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log('errorMessage :>> ', errorMessage)
            })
    }


    return (
        <AuthContext.Provider value={{ user, register, login }}>
            {children}
        </AuthContext.Provider>
    )
}
