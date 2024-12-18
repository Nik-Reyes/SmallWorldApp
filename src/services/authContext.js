import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { fbAuth } from './firebaseConfig';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe();
    }, [fbAuth])


    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext