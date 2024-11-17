import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { db, fireAuth } from "../services/firebaseConfig";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";



export const AuthContext = createContext();

export const AuthContextProvider =({children})=> {
    const [currentUser, setCurrentUser] = useState({})
    
    

    const collectionUsersRef = collection(db, 'users')
    const provider = new GoogleAuthProvider()

const signInWithGoogle = async()=> {
    try {
        const popup = await signInWithPopup(fireAuth, provider);
        const user =popup.user;
        const q = query(collectionUsersRef, where('uid', '==', user.uid))
        const docs = await getDocs(q);
        if(docs.docs.length === 0){
            addDoc(collectionUsersRef,{
                uid:user?.uid,
                name:user?.displayName,
                email:user?.photoURL,
                authProvider:popup?.providerId,
            })
        }
        // navigation.navigate('PostsScreen')
    } catch (error) {
        console.log(error.message)
        Alert.alert(error.message)
    }
}

    useEffect(() => {
     const unSub = onAuthStateChanged(fireAuth, (user)=> {
        setCurrentUser(user);
        console.log("AuthContext log-", user)
     })
    
      return () => {
        unSub();
      }
    }, [])

    const signOutUser = async()=> {
        await signOut(fireAuth);
        window.location.reload();
    }

    return  ( 
        <AuthContext.Provider value={{currentUser, signOutUser, signInWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )
    
}