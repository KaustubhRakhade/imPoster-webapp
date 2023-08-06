import { createContext, useReducer } from "react";

export const PostContext = createContext()

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }

        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }

        case 'EDIT_POST':
            const postToEdit = state.posts.findIndex((post) => post._id === action.payload._id)
            console.log(postToEdit)
            let editedPosts = [...state.posts]
            editedPosts[postToEdit].content = action.payload.content

            return {
                posts: editedPosts
            }

        case 'DELETE_POST':
            return {
                posts: state.posts.filter((post) => {
                    return post._id !== action.payload._id
                })
            }

        case 'RATE_POST':
            const postToRate = state.posts.findIndex((post) => post._id === action.payload._id)
            console.log(postToRate)
            const ratedPosts = [...state.posts]
            ratedPosts[postToRate].likes = action.payload.likes
            ratedPosts[postToRate].dislikes = action.payload.dislikes

            return {
                posts: ratedPosts
            }

        default:
            return state
    }
}

export const PostContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(postsReducer, {
        posts: null
    })
    return(
        <PostContext.Provider value={{...state, dispatch}}>
            { children }
        </PostContext.Provider>
    )
}