

export const postActions = {
    SUBMIT_POST: 'SUBMIT_POST',
    ADD_LIKE: 'ADD_LIKE',
    ADD_COMMENT: 'ADD_COMMENT',
    HANDLE_ERROR: 'HANDLE_ERROR'
}

export const postStates = {
    posts: [],
    likes: [],
    comments: [],
    userLiked: false,
    error: false
};


export const PostsReducer = (state, action) => {
    // const { user } = useContext(AuthContext)
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
                userLiked: action.likes.includes(user?.uid),
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