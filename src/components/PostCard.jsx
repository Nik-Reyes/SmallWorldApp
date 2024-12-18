import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useReducer, useState, useEffect, useMemo } from 'react'
import { Image } from 'react-native'
import { Button } from 'react-native'
// import { usePostsContext } from '../context/PostsContext'
import CommentsSection from './CommentsSection'
import AuthContext from '../services/authContext'
import { fbFireStore } from '../services/firebaseConfig'
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, runTransaction, updateDoc, where, writeBatch } from 'firebase/firestore'
import { FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePostsContext } from '../context/PostsContext'

const PostCard = ({ uid, id, logo, name, text, image, timestamp, data }) => {
    const { user } = useContext(AuthContext)
    const { postState, postActions, dispatch } = usePostsContext();
    // const { comments } = postState;
    const [isOpen, setIsOpen] = useState(false);
    // const likesRef = useMemo(() => doc(fbFireStore, 'postsLikes', id), [id]);
    const likesRef = doc(fbFireStore, 'postsLikes', id)
    const [likes, setLikes] = useState(0)
    const [userLiked, setUserLiked] = useState(false)
    // const [commentsArray, setCommentsArray] = useState()
    const [commentsLength, setCommentsLength] = useState(0)
    const navigation = useNavigation()

    // Open Comments Section
    const handleOpen = () => {
        setIsOpen(true)
    }
    // Close Comments Section
    const handleClose = () => {
        setIsOpen(false)
    }

    // add a Friend
    async function handleAddFriend(userId, friendId, friendImage, friendName) {


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
                Alert.alert('Friend added!')
                navigation.navigate('SearchFriend')
                console.log('Friend added successfully');
            } else {
                console.log('Friend does not exist');
            }
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    // // Add Like to a Post or Like a Post 
    const handleLike = async () => {

        try {

            await runTransaction(fbFireStore, async (transaction) => {
                // const likesRef = doc(fbFireStore, 'postsLikes', id);
                const likesDocSnap = await transaction.get(likesRef)
                const likesDoc = likesDocSnap.data() || {};
                const userLiked = likesDoc.likes?.includes(user?.uid)

                if (Object.keys(likesDoc).length > 0) {
                    // If document exists 
                    transaction.update(likesRef, {
                        likes: userLiked
                            ? arrayRemove(user?.uid)
                            : arrayUnion(user?.uid),
                    });
                } else {
                    // If document doesnt exist
                    transaction.set(likesRef, {
                        likes: userLiked ? [] : [user?.uid],
                    });
                }
            })
            fetchLikes()

        } catch (error) {
            Alert.alert(error.message);
            console.log("error liking/unliking post ", error.message)
        }
    };
    // // Real time database checker for the number of likes on a post
    // useEffect(() => {

    //     const unSubscribe = onSnapshot(likesRef, (doc) => {
    //         const likesArray = doc.data()?.likes || []
    //         // const userLiked = likesArray?.includes(user?.uid)
    //         if (likesArray) {
    //             dispatch({
    //                 type: postActions.ADD_LIKE,
    //                 likes: likesArray
    //             })
    //             console.log("likesArray", likesArray)
    //         }
    //     })
    //     return () => unSubscribe();
    // }, [likesRef])


    // Fetch initial likes data
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likesDocSnap = await getDoc(likesRef);
                const likesData = likesDocSnap.exists() ? likesDocSnap.data().likes || [] : [];
                console.log('likesData', likesData)
                const userLiked = likesData?.includes(user?.uid)
                setLikes(likesData?.length)
                setUserLiked(userLiked)
                // dispatch({ type: postActions.ADD_LIKE, likes: likesData });
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    }, [likesRef, user?.uid]);
    const fetchLikes = async () => {
        try {
            const likesDocSnap = await getDoc(likesRef);
            const likesData = likesDocSnap.exists() ? likesDocSnap.data().likes || [] : [];
            // console.log('likesData', likesData)
            const userLiked = likesData?.includes(user?.uid)
            setLikes(likesData?.length)
            setUserLiked(userLiked)
            // dispatch({ type: postActions.ADD_LIKE, likes: likesData });
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    // Delete existing user post

    const handleDeletePost = async (postId) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Delete",
                    style: { color: 'red' },
                    onPress: async () => {
                        try {
                            const postRef = doc(fbFireStore, 'posts', postId);
                            await runTransaction(fbFireStore, async (transaction) => {
                                return transaction.get(postRef).then((docSnapshot) => {
                                    if (docSnapshot.exists()) {
                                        transaction.delete(postRef);
                                    }
                                });
                            }).then(() => {
                                console.log('Post deleted successfully');
                            }).catch((error) => {
                                console.error('Error deleting post:', error.message);
                            });
                        } catch (error) {
                            console.log(error.message)
                        }
                    }
                }
            ],
            { cancelable: true }
        )


    }


    // Real time database checker the comments length
    useEffect(() => {
        const commentsCollectionRef = collection(fbFireStore, 'comments')
        const q = query(commentsCollectionRef, where('postId', '==', id))

        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            // setCommentsArray(commentsData)
            setCommentsLength(commentsData?.length)

            // return dispatch({
            //     type: postActions.ADD_COMMENT,
            //     comments: commentsArray
            // })

        })

        return () => unSubscribe()
    }, [id])

    // const URI = logo !== '' ? logo : profilePicture
    const URI = 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png'


    return (
        <View style={{ padding: 10, display: 'flex', alignItems: 'start' }} >

            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 5, gap: 10 }}>
                <Image source={{ uri: URI }} alt='Avatar' style={{ height: 40, width: 40, borderRadius: 50, }} />

                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
            </View>
            <Text style={{ fontSize: 16, marginBottom: 5, padding: 5 }}>{text}</Text>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'auto', }} >

                {image && <Image source={{ uri: image }} style={{ height: 370, width: 370, objectFit: 'contain', borderRadius: 10 }} alt='PostImage' />}
            </View>

            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 5, marginTop: 10, gap: 20, padding: 5 }} >
                <TouchableOpacity onPress={handleLike} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} >
                    {userLiked ? <FontAwesome name="heart" size={24} color="red" /> : <FontAwesome name="heart-o" size={24} color="teal" />}
                    <Text
                        style={{ borderWidth: 0, fontWeight: '500', color: 'black', }}>
                        {likes === 0 ? '' : `${likes}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={isOpen ? handleClose : handleOpen} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}  >
                    {isOpen ? <MaterialCommunityIcons name="cancel" size={24} color="teal" /> :
                        <>
                            <FontAwesome name="comment-o" size={24} color="teal" />
                            <Text
                                style={{ borderWidth: 0, fontWeight: '500', color: 'black', }}>
                                {commentsLength === 0 ? '' : `${commentsLength}`}</Text>
                        </>

                    }
                </TouchableOpacity>
                {user?.uid !== uid &&
                    <TouchableOpacity onPress={() => handleAddFriend(user?.uid, uid, logo, name)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} >
                        <Text
                            style={{ borderWidth: 0, padding: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '500', borderRadius: 20, backgroundColor: 'teal', color: '#fff' }}>
                            Add Friend</Text>
                    </TouchableOpacity>
                }
            </View>
            <View>
                {isOpen && <CommentsSection postId={id} data={data} />}
            </View>
            <View style={{ width: '98%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                <Text>Published: {timestamp}</Text>
                {
                    user?.uid === uid &&
                    <TouchableOpacity onPress={() => handleDeletePost(id)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} >
                        <Text
                            style={{ borderWidth: 0, padding: 5, paddingLeft: 10, paddingRight: 10, fontWeight: '700', borderRadius: 20, backgroundColor: '#fff', color: 'red' }}>
                            Delete</Text>
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}

export default PostCard

const styles = StyleSheet.create({})