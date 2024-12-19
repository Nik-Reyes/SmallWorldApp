import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { useContext, useEffect, useRef, useState, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { fbFireStore } from '../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { styles } from "../styles/Home.styles";
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../services/authContext';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import FriendsList from '../components/FriendsList';
import PlantBanner from '../components/home/PlantBanner/PlantBanner';


const SearchFriend = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allFetchedUsers, setAllFetchedUsers] = useState([])
    const [currentUserFriends, setCurrentUserFriends] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const { user } = useContext(AuthContext)
    const { width } = useWindowDimensions();
    const navigation = useNavigation()


    useEffect(() => {
        searchTerm === '' && setSearchResults([])
        fetchAllUsers()
        fetchCurrentUserData()
    }, [searchTerm])

    // Fetch all users
    const fetchAllUsers = async () => {
        const usersCollection = collection(fbFireStore, "users");
        const querySnapshot = await getDocs(usersCollection); // Get all users

        const users = [];
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const userId = doc.id;
            // console.log(user?.uid)

            if (userId !== user?.uid) {
                users.push({ ...userData, id: userId });
            }

        });
        // console.log('users', users)
        setAllFetchedUsers(users)

    }
    // Fetch all users
    const fetchCurrentUserData = async () => {
        const usersCollection = collection(fbFireStore, "users");
        const querySnapshot = await getDocs(usersCollection); // Get all users


        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const userId = doc.id;
            // console.log(user?.uid)

            if (userId === user?.uid) {
                setCurrentUserFriends(userData.friends);
            }

        });

    }

    // Search the users array for the friend 
    const handleSearch = async (text) => {
        try {
            setSearchTerm(text)
            setTimeout(() => {
                const filteredUsers = allFetchedUsers.filter((user) =>
                    user.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
                ); // Filter users based on search term
                if (filteredUsers.length > 0) {
                    console.log('Filtered users', filteredUsers)
                    // Filter users based on search term
                    setSearchResults(filteredUsers);

                } else {
                    setErrorMsg('No user found, Please search again')
                    setSearchResults([])
                }
            }, 1000);
        } catch (error) {
            console.error("Error searching users:", error);
            setSearchResults([]);
        }
    };
    // Add friend
    async function handleAddFriend(userId, friendId, friendName) {

        let friendImage = ''

        try {
            // Check if the friend exists
            const friendDocRef = doc(fbFireStore, 'users', friendId);
            const friendDoc = await getDoc(friendDocRef);

            if (friendDoc.exists()) {
                // Update the user's friends array
                const userDocRef = doc(fbFireStore, 'users', userId);
                await updateDoc(userDocRef, {
                    friends: arrayUnion({
                        id: friendId,
                        image: friendImage,
                        name: friendName
                    })
                });

                // Update the friend's friends array
                await updateDoc(friendDocRef, {
                    friends: arrayUnion({
                        id: userId,
                        // Assuming you have the current user's image and name
                        image: data?.photoUrl || '',
                        name: data?.username
                    })
                });

                Alert.alert('Friend added!');
            } else {
                console.log('Friend does not exist');
            }
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <LinearGradient
                colors={["#E8F5E9", "#ebf7f4", "#d2ede5"]}
                start={{ x: 0.5, y: 0.4 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.3, 0.8]}
                style={{
                    flex: 1,
                }}
            >
                <PlantBanner />
                <View style={{ marginTop: 24 }} >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Friends</Text>

                    <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10, zIndex: 2, marginTop: '-20' }} onPress={() => navigation.goBack()}>
                        {/* <Text style={{ color: 'teal', fontWeight: 600, fontSize: 20 }}>BACK</Text> */}
                        <AntDesign name="doubleleft" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{
                        width: width,
                        paddingTop: 24,
                        paddingBottom: 100,
                        alignSelf: "center",



                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            gap: 20,
                        }}
                    >


                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>


                            <TextInput
                                left={<TextInput.Icon icon="magnify" color={() => "#253b35"} />}
                                mode="outlined"
                                value={searchTerm}
                                onChangeText={(text) => { handleSearch(text) }}
                                placeholder="Find a friend"
                                placeholderTextColor="grey"
                                autoCorrect={false}
                                autoCapitalize="none"
                                outlineColor="#fff"
                                keyboardAppearance="light"

                                style={[styles.searchInput2, { borderWidth: 0 }, { outlineWidth: 0 }, { elevation: 0 }]}
                                theme={{
                                    colors: {
                                        primary: "#253b35",
                                    },
                                    roundness: 50,
                                }}
                            />
                        </View>
                        {searchTerm !== '' && <TouchableOpacity onPress={() => setSearchTerm('')} >
                            <Text style={{ borderWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'transparent', color: '#000', }}>Clear</Text>
                        </TouchableOpacity>}

                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }} >

                            {searchResults.length > 0 && <View style={{ width: '100%', maxHeight: 200 }} >


                                {/* {searchResults?.map((item) => (
                                    <Text key={item.uid}>{item.username}</Text>

                                ))} */}
                                <ScrollView
                                    contentContainerStyle={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', borderWidth: 0.1, padding: 10, borderRadius: 20, gap: 10, backgroundColor: '#fff' }}
                                >
                                    {searchResults.map((item) => (

                                        <View key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', gap: 20, width: '100%', }} >
                                            <Text style={{ fontWeight: '400', fontSize: 18 }}>{item.username}</Text>
                                            <TouchableOpacity onPress={() => handleAddFriend(user?.uid, item.id, item.username)} >
                                                <Text
                                                    style={{ borderWidth: 0, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', color: '#fff' }}>
                                                    Add friend </Text>
                                            </TouchableOpacity>
                                        </View>))}

                                </ScrollView>
                            </View>
                            }
                            <FriendsList friends={currentUserFriends} />

                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView >
    )
}

export default SearchFriend;
// const styles = StyleSheet.create({})
