import { createContext, useReducer, useContext } from "react";
import { PostsReducer, postStates, postActions } from "./PostReducer";
import { collection, query } from "firebase/firestore";
import AuthContext from "../services/authContext";

const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const postActions = {
        SUBMIT_POST: 'SUBMIT_POST',
        ADD_LIKE: 'ADD_LIKE',
        ADD_COMMENT: 'ADD_COMMENT',
        HANDLE_ERROR: 'HANDLE_ERROR'
    }

    const postStates = {
        posts: [],
        likes: [],
        comments: [],
        userLiked: false,
        error: false
    };


    const PostsReducer = (state, action) => {
        switch (action.type) {
            case postActions.SUBMIT_POST:
                return {
                    ...state,
                    error: false,
                    posts: action.posts,
                };
            case postActions.ADD_LIKE:
                return {
                    ...state,
                    error: false,
                    likes: action.likes,
                    userLiked: action.likes?.includes(user?.uid),
                };
            case postActions.ADD_COMMENT:
                return {
                    ...state,
                    error: false,
                    comments: action.comments,
                };
            case postActions.HANDLE_ERROR:
                return {
                    ...state,
                    error: true,
                    posts: [],
                };
            default:
                return state

        }
    }
    const [postState, dispatch] = useReducer(PostsReducer, postStates)
    const value = {
        postState,
        postActions,
        dispatch,
    }


    return <PostsContext.Provider value={value} >{children}</PostsContext.Provider>
}
export const usePostsContext = () => {
    const context = useContext(PostsContext)
    if (!context) {
        throw new Error('usePostsContext must be used within a PostProvider')
    }
    return context;
}