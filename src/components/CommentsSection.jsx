import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, ScrollView, Image, TouchableOpacity } from 'react-native'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { fbFireStore } from '../services/firebaseConfig'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../services/authContext'
import { usePostsContext } from '../context/PostsContext'
import { AntDesign } from '@expo/vector-icons'



const CommentsSection = ({ postId, data }) => {
    const { user } = useContext(AuthContext)
    const { postState, postActions, dispatch } = usePostsContext();
    // const { comments, error } = postState;
    const [commentText, setCommentText] = useState('')
    const [editCommentText, setEditCommentText] = useState('')
    const [comments, setComments] = useState([])
    const [editingCommentId, setEditingCommentId] = useState(null)

    //    const commentsCollectionRef = collection(db,'comments')

    // Real time database checker for multiple commenting
    useEffect(() => {
        const commentsCollectionRef = collection(fbFireStore, 'comments')
        const q = query(commentsCollectionRef, where('postId', '==', postId))

        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            // dispatch({
            //     type: postActions.ADD_COMMENT,
            //     comments: commentsData
            // })
            setComments(commentsData)
        })

        return () => unSubscribe()
    }, [postId])

    //    post a comment
    const handleComment = async () => {
        if (commentText.trim() === '') return
        try {

            const newCommentRef = collection(fbFireStore, 'comments')
            await addDoc(newCommentRef, {
                postId,
                userId: user?.uid,
                username: data?.username || 'Username',
                text: commentText,
                timestamp: serverTimestamp(),
            })
            setCommentText('')
        } catch (error) {
            console.log('Error adding comment:', error.message)
            Alert.alert(error.message)
        }
    }
    // Edit a comment 
    const handleEditComment = async (commentId, newText) => {

        if (newText === '') return
        try {
            const commentsCollectionRef = collection(fbFireStore, 'comments')
            const commentRef = doc(commentsCollectionRef, commentId)
            await updateDoc(commentRef, {
                text: newText
            })
            setEditCommentText('')
        } catch (error) {
            console.log('Error editing comment:', error.message)
            Alert.alert(error.message)
        }
    }

    //    Delete a comment 
    const handleDeleteComment = async (commentId) => {
        try {
            const commentsCollectionRef = collection(fbFireStore, 'comments')
            const commentRef = doc(commentsCollectionRef, commentId)
            await deleteDoc(commentRef)
        } catch (error) {
            console.log('Error deleting  comment:', error.message)
            Alert.alert(error.message)
        }
    }
    const URI = 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png'

    return (

        <View style={styles.commentsContainer}>
            {comments?.map((item) => (

                <View key={item.id}>
                    <View style={styles.commentItem}>
                        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 2, gap: 5 }}>
                            <Image source={{ uri: URI }} alt='Avatar' style={{ height: 20, width: 20, borderRadius: 50, }} />
                            <Text style={styles.commentAuthor}>{item.username || "Anonymous"}</Text>
                        </View>
                        <Text style={styles.commentText}>{item.text}</Text>

                        {editingCommentId === item.id
                            &&
                            <TextInput
                                value={editCommentText}
                                onChangeText={(text) => setEditCommentText(text)}
                                placeholder='Edit Comment'
                                style={styles.commentText}
                            />
                        }
                        <Text style={{ fontSize: 12 }} >{new Date(item?.timestamp?.toDate())?.toLocaleString()}</Text>

                        {user?.uid === item.userId && (
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginBottom: 5, marginTop: 5 }}>
                                {editingCommentId !== item.id ? (
                                    // <Button title='Edit' onPress={() => setEditingCommentId(item.id)} />
                                    <AntDesign onPress={() => setEditingCommentId(item.id)} name="edit" size={24} color="teal" />
                                ) : (
                                    <AntDesign onPress={() => { handleEditComment(item.id, editCommentText), setEditingCommentId(null) }} name="save" size={24} color="teal" />
                                    // <Button title='Save' onPress={() => { handleEditComment(item.id, editCommentText), setEditingCommentId(null) }} />
                                )}
                                <AntDesign onPress={() => handleDeleteComment(item.id)} name="delete" size={20} color="red" />
                                {/* <Button title='Delete' onPress={() => handleDeleteComment(item.id)} /> */}
                            </View>
                        )}
                    </View>
                </View>
            ))}
            {editingCommentId === null ? (
                <View style={styles?.addCommentSection}>
                    <TextInput
                        value={commentText}
                        onChangeText={(text) => setCommentText(text)}
                        placeholder="Add a comment..."
                        style={styles.commentInput}
                    />

                    <TouchableOpacity onPress={handleComment}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "teal", borderRadius: 20 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff', paddingLeft: 130, paddingRight: 130, paddingTop: 10, paddingBottom: 10, fontSize: 16 }} >Add comment</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    )
}

export default CommentsSection

const styles = StyleSheet.create({
    commentsContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    commentItem: {
        marginBottom1: 10,
    },
    commentText: {
        fontSize: 16,
    },
    commentAuthor: {
        fontWeight: 'bold',

    },
    commentInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,

    },
    addCommentSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }
})