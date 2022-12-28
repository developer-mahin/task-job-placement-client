import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from "../firebase.config";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient()
    const [user, setUser] = useState(null)



    // method for create account with email and password 
    const createAccount = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // method for login account using email and password 
    const signInWithEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    // google sign in method
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // sign out method 
    const signOutMethod = () => {
        return signOut(auth)
    }



    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        createAccount,
        signInWithEmailPassword,
        updateUserProfile,
        googleSignIn,
        signOutMethod
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;