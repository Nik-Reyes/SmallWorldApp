import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Alert, View, TouchableOpacity } from "react-native";
import { Text, Button, ActivityIndicator, TextInput, IconButton, Avatar } from "react-native-paper";
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
    const [userData, setData] = useState(null)
    const [terrariumData, setTerrariumData] = useState(null)
    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const userRef = doc(fbFireStore, "users", fbAuth.currentUser.uid)
                const userRefSnap = await getDoc(userRef)

                if(userRefSnap.exists()) {
                    setData(userRefSnap.data())
                } 

                const terrariumDoc = doc(fbFireStore, "terrariums", fbAuth.currentUser.uid)
                const terrariumSnap = await getDoc(terrariumDoc)
                if (terrariumSnap.exists()) {
                    setTerrariumData(terrariumSnap.data())
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
            <View
                style={styles.header}
            >
                <IconButton
                    icon="chevron-left"
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <Button
                    onPress={handleSignOut}
                    textColor='#48AC54'
                >
                    Sign-Out
                </Button>
            </View>

            {userData && terrariumData ? 
                <>
                    <View
                        style={{alignItems: 'center'}}
                    >
                        <Avatar.Icon 
                            size={100} 
                            icon="account" 
                            color="white"
                            style={{backgroundColor: '#48AC54'}}
                        />
                        <Text
                            variant="titleLarge"
                            style={{fontWeight: 'bold', marginTop: 10}}
                        >
                            {userData.username}
                        </Text>
                        <Text
                            variant="titleMedium"
                        >
                            {userData.email}
                        </Text>
                    </View>

                    <View
                        style={[styles.card, {marginTop: 20}]}
                    >
                        <Text variant="headlineSmall" style={{fontWeight: "bold"}}>Joined</Text>
                        <Text variant="titleMedium">{userData.joined.toDate().toLocaleDateString()}</Text>
                    </View>

                    <View
                        style={styles.card}
                    >
                        <Text variant="headlineSmall" style={{fontWeight: "bold"}}>Plants Discovered</Text>
                        <Text variant="titleMedium">Total: {terrariumData.totalPlantsFound}</Text>
                    </View>

                </>
                :
                <ActivityIndicator animating={true} color="green" />
            }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },
    card: {
        marginTop: 10,
        flexDirection: 'column',
        backgroundColor: '#48AC54',
        padding: 10,
        borderRadius: 15
    },  
    button: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10
    }
})
