import { createContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import app from "../firebase.config";

export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)


    // google sign in method
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // sign out method 
    const signOutMethod = () =>{
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