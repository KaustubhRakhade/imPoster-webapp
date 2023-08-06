import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                user: action.payload
            }

        case 'SIGN_OUT':
            return {
                user: null
            }

        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //run just once at the start
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            dispatch({
                type: "SIGN_IN",
                payload: user
            })
        }
    }, [])

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}