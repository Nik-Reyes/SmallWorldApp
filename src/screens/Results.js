import { onAuthStateChanged } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { FlatList, StyleSheet, View, Image,  } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { fbAuth, fbFireStore } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Results({ route }){

    const navigation = useNavigation()
    const { results, photo } = route.params

    // useEffect(() => {
    //     const fetchUserData = async() => {
    //         try {
    //             // Add plant to firebase
    //             const name = results[0].species.commonNames[0]

    //             const terrariumRef = doc(fbFireStore, "terrariums", fbAuth.currentUser.uid)
    //             await updateDoc(terrariumRef, {
    //                 totalPlantsFound: increment(1)
    //             });
    //         } catch (error) {
    //             console.log("Error Fetching your Data:", error)
    //         }
    //     }
    //     fetchUserData()
    // }, [])

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
            </View>
            

            <Text variant="headlineSmall">Plant Identification Results</Text>
            <Image source={{ uri: photo }} style={styles.image} />
            {results && results.length > 0 ?
                
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View
                            style={[
                                styles.resultItem,
                                index === 0 ? { backgroundColor: '#48AC54' } : {} // Apply blue background to the first item
                            ]}
                        >
                            <Text>
                                <Text variant="titleLarge">{index + 1}. </Text>
                                <Text style={styles.boldText} variant="titleLarge">{item.species.commonNames[0] || 'N/A'} </Text>
                                <Text variant="titleSmall">{(item.score * 100).toFixed(2)}% match</Text>
                            </Text>
                        </View>
                    )}
                    style={{ width: '100%' }}
                />
            :
                <Text style={styles.noResults}>No results found.</Text>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
        paddingTop:"5%",
        alignItems: 'center'
    },
    header: {
        width: '100%',
    },
    image: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
      marginBottom: 10,
      marginTop: 10
    },
    resultItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      backgroundColor: 'lightgrey',
      width: '100%',
      marginBottom: 5,
      borderRadius: 10
    },
    resultText: {
      fontSize: 16,
    },
    noResults: {
      marginTop: 20,
      fontSize: 16,
      color: "gray",
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,  // You can adjust the font size as needed
    },
  });