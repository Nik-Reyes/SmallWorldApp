import { Text } from "react-native";
import { Button } from "react-native-paper";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import { signOut } from "firebase/auth"
import { fbAuth, fbFirestore, signOutUser } from "../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile() {

    // Fetch User Data
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const fetchUserData = async() => {
            const docRef = doc(fbFirestore, "users", fbAuth.currentUser.uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setUserData(docSnap.data())
            } else {
                alert('No user data exists!?')
            }
        }
        fetchUserData()
    }, [fbAuth])    

    return (
        <KeyboardAvoidingContainer>
            <Text>This is the profile page</Text>
            {userData &&
                <Text>Currently logged in as: {userData.username}</Text>
            }
            <Button 
                mode="contained"
                onPress={signOutUser}
            > Sign Out
            </Button>
        </KeyboardAvoidingContainer>
        
    );
}