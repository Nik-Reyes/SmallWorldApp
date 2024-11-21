import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, Alert } from "react-native";
import { Button, ActivityIndicator, TextInput } from "react-native-paper";
import { fbAuth, fbFireStore } from "../services/firebaseConfig";
import { 
    EmailAuthProvider, 
    signOut, 
    reauthenticateWithCredential 
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {

    const navigation = useNavigation()

    const [deleteAccount, setDeleteAccount] = useState(false)
    const [password, setPassword] = useState('')
    const [data, setData] = useState(null)
    const [dataFetched, setDataFetched] = useState(false)
    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const docRef = doc(fbFireStore, "users", fbAuth.currentUser.uid)
                const docSnap = await getDoc(docRef)

                if(docSnap.exists()) {
                    setData(docSnap.data())
                    setDataFetched(true)
                } else {
                    alert('No user data exists!?')
                }
            } catch (error) {
                console.log("Error Fetching your Data:", error)
            }
            
        }
        fetchUserData()
    }, [])

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Sign Out",
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            signOut(fbAuth)
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Main" }],
                            });
                        } catch (error) {
                            console.error(error)
                        }   
                    }
                }
            ],
            { cancelable: true }
        ) 
    }

    const handleDeletion = (password) => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete this account. There is no going back.",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete Account',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const user = fbAuth.currentUser
                            const uid = user.uid
                            if (!user) {
                                alert("No user is signed in. Please log in again.");
                                return;
                            }

                            // Re-authenticate for deletion
                            const credentials = EmailAuthProvider.credential(data.email, password)
                            await reauthenticateWithCredential(user, credentials)

                            // Delete user data
                            await deleteDoc(doc(fbFireStore, "users", uid))
                            await deleteDoc(doc(fbFireStore, "terrarium", uid))
                            await user.delete()

                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Main" }],
                            });
                            
                            alert('Your account was successfully deleted')
                        } catch (error) {
                            console.error("Error deleting account", error)
                        }
                    }
                }
            ]
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Profile Page </Text>
            {dataFetched ? 
                <>
                    <Text>Username: {dataFetched ? data.username : "Loading..."}</Text>
                    <Text>Email: {dataFetched ? data.email : "Loading..."}</Text>
                </>
                :
                <ActivityIndicator animating={true} color="green" />
            }
            <Button
                onPress={() => console.log(data, fbAuth.currentUser)}
            >
                Show data
            </Button>
            <Button
                onPress={handleSignOut}
            >
                Sign Out
            </Button>
            {deleteAccount ?
                <>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        activeOutlineColor="#76B947"
                    />
                    <Button onPress={() => setDeleteAccount(false)}>Go Back</Button>
                    <Button onPress={() => handleDeletion(password)}>Confirm Delete Account</Button>
                </>
                :
                <Button
                    onPress={() => setDeleteAccount(true)}
                >
                    Delete Account
                </Button>
            }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
    }
})