import useAuthContext from "./useAuthContext"
import { usePostContext } from "./usePostContext"



const useSignOut = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: postDispatch } = usePostContext()

    const signout = () => {
        localStorage.removeItem("user")


        dispatch({
            type: "SIGN_OUT"
        })
        postDispatch({
            type: "SET_POSTS",
            payload: null
        })
    }

    return { signout }
}

export default useSignOut