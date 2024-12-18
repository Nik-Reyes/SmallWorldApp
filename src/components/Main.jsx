import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Pressable, Animated } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { fbAuth, fbFireStore } from '../services/firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Button } from 'react-native';
import { usePostsContext } from '../context/PostsContext'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import AuthContext from '../services/authContext'
import PostCard from './PostCard'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { TextInput } from "react-native-paper";
import { styles } from "../styles/Home.styles";
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Instagram } from 'react-content-loader'
// import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const Main = () => {
    const { user } = useContext(AuthContext)
    const { postState, postActions, dispatch } = usePostsContext();
    const { posts, error } = postState;
    const [image, setImage] = useState('')
    const [file, setFile] = useState(null)
    const [text, setText] = useState('')
    const [data, setData] = useState(null)
    const [dataFetched, setDataFetched] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [loading, setLoading] = useState(false)
    const [lodingImage, setLoadingImage] = useState(false)

    // const [imageSwitch, setImageSwitch] = useState(false)
    // const [searchInput, setSearchInput] = useState('')
    const postsRef = doc(collection(fbFireStore, 'posts'));
    // const document = postsRef.id
    // const collectionRef = collection(fbFireStore, 'posts')
    const navigation = useNavigation()
    const storage = getStorage()

    // Upload an image
    const handleUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access media library is required');
            return
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.canceled) {
            setFile(pickerResult.assets[0])
            setImageSwitch(true)
        }
    }

    // submit a post
    const handleSubmitPost = async () => {
        // console.log(file.ri) 
        if (text !== '') {

            try {

                const postsRef = doc(collection(fbFireStore, 'posts'));

                await setDoc(postsRef, {
                    documentId: postsRef.id,
                    uid: user?.uid,
                    logo: data?.photoUrl || "",
                    name: data?.username || "Anonymous",
                    text,
                    image,
                    timestamp: serverTimestamp(),
                })
                setText('')

            } catch (error) {
                dispatch({ type: postActions.HANDLE_ERROR });
                Alert.alert(error.message)
            }
        }
        else {
            dispatch({ type: postActions.HANDLE_ERROR });
        }

    }



    const metaData = {
        mimeType: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/svg+xml'
        ],
    }

    const formatImage = (mimeType) => {
        if (mimeType === 'image/jpeg') {
            return 'jpeg'
        }
        else if (mimeType === 'image/png') {
            return 'png'
        }
        else if (mimeType === 'image/gif') {
            return 'gif'
        }
        else if (mimeType === 'image/svg+xml') {
            return 'svg'
        } else return 'jpeg'
    }
    const submitImage = async () => {
        const fileType = metaData.mimeType.includes(file.mimeType)
        if (!file) return;


        if (fileType) {
            setLoadingImage(true)
            const format = formatImage()

            try {
                // Resize the image to make resolution uniform across all posts
                const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
                    file.uri,
                    [{ resize: { width: 1080, height: 1080 } }],
                    { compress: 1, format }
                );

                // Upload the resized image to Firebase
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    await fetch(resizedUri).then(res => res.blob()),
                    metaData.mimeType
                );
                await uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes)
                        );
                        setProgressBar(progress);
                        AsyncStorage.setItem('fileUrI', file.uri)

                    },
                    (error) => {
                        Alert.alert(error.message)
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                setImage(downloadURL)
                                setFile(null)
                                setLoadingImage(false)
                                console.log('Image Uplaoded!')
                            }
                        );
                    }
                );
                setLoadingImage(false)
            } catch (error) {
                setLoadingImage(false)
                // Handle error
            }
        }
    };


    const fetchUserData = async () => {
        try {
            const docRef = doc(fbFireStore, "users", fbAuth.currentUser.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setData(docSnap.data())
                setDataFetched(true)
            } else {
                console.log('No user data exists!?')
            }
        } catch (error) {
            console.log("Error Fetching your Data:", error)
        }

    }



    // fetch Initialposts

    const fetchInitialPostss = async () => {
        setLoading(true)
        try {
            const collectionRef = collection(fbFireStore, 'posts')
            const q = query(collectionRef, orderBy('timestamp', 'asc'));
            onSnapshot(q, (doc) => {
                dispatch({
                    type: postActions.SUBMIT_POST,
                    posts: doc?.docs?.map((Item) => Item.data())
                })
                setImage('')
                setFile(null)
                setProgressBar(0)
                setLoading(false)
            });
        } catch (error) {
            console.log(error?.message)
        }


    }
    useEffect(() => {
        fetchInitialPostss()
        fetchUserData()
    }, [])



    return (
        <View style={{ flex: 1 }}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>

                <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10, zIndex: 2, }} onPress={() => navigation.goBack()}>
                    <AntDesign name="doubleleft" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SearchFriend')} >
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontWeight: 500, fontSize: 20, }}>Friends</Text>
                        <AntDesign name="arrowright" size={10} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', }} >
                {image && <Image source={{ uri: image }} alt='previewImage' style={{ height: 100, width: 100, borderRadius: 10, marginBottom: 10 }} />}
                {file && <Image source={{ uri: file.uri }} alt='previewImage' style={{ height: 100, width: 100, borderRadius: 10, marginBottom: 10 }} />}
                <View
                    style={{
                        width: `${progressBar}%`,
                        padding: 1,
                        borderRadius: 10,
                        backgroundColor: 'blue',
                    }}
                />

                <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center', }} >
                    {file && <TouchableOpacity onPress={submitImage}
                        style={{ marginTop: 5, borderWidth: 0, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Upload <AntDesign name="cloudupload" size={24} color="white" /></Text>
                    </TouchableOpacity>}
                    {!file && <TouchableOpacity onPress={handleUpload}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, borderWidth: 0, paddingTop: 5, paddingBottom: 5, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', paddingRight: 10, paddingLeft: 10 }}><MaterialIcons name="add-a-photo" size={24} color="white" /></Text>
                    </TouchableOpacity>}

                    <TextInput
                        mode="outlined"
                        value={text}
                        onChangeText={(text) => setText(text)}
                        placeholder={`Whats on your mind ${dataFetched ? data.username : "..."}?`}
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

                    {image && <TouchableOpacity onPress={handleSubmitPost}
                        style={{ borderWidth: 0, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Share</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            {/* 
            <View style={{ padding: 10, width: '50%' }} >
                <TouchableOpacity onPress={handleUpload}
                    style={{ width: '55%' }}>
                    {file ? (
                        <Image style={{ width: 100, height: 100 }} source={{ uri: file.uri }} />
                    ) : (<Text style={{ color: '#fff', fontSize: 18, borderWidth: 0, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', }}>Add Image</Text>)}
                </TouchableOpacity>
                {file !== null && <TouchableOpacity onPress={submitImage}
                    style={{ width: '40%', marginTop: 5, borderWidth: 0, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Upload</Text>
                </TouchableOpacity>}
              
            </View> */}
            <ScrollView style={{ flex: 1 }} >
                <View style={{ flex: 1, padding: 5 }} >
                    {
                        error ? (
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'red' }} >Something went wrong,please refresh and try again</Text>
                        ) : (
                            <>
                                {
                                    // loading ? <ContentLoader>
                                    //     <Circle cx="30" cy="30" r="30" />
                                    //     <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                    //     <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                    // </ContentLoader> :
                                    posts?.length !== 0 &&

                                    posts?.map((post, index) => {
                                        return (
                                            <PostCard
                                                key={index}
                                                logo={post?.logo}
                                                id={post?.documentId}
                                                uid={post?.uid}
                                                name={post?.name}
                                                text={post?.text}
                                                image={post?.image}
                                                data={data}
                                                timestamp={new Date(post?.timestamp?.toDate())?.toLocaleString()}
                                            />
                                        )
                                    })
                                }
                            </>
                        )
                    }

                </View>
            </ScrollView>

        </View >
    )
}

export default Main

// const styles = StyleSheet.create({})