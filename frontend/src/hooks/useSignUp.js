import { useState } from 'react'
import useAuthContext from "./useAuthContext"

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, password) => {
        setError(null)
        setIsLoading(true)

        console.log({username, email, password})

        const response = await fetch("https://imposter-webapp.onrender.com" + "/api/user/signup", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username, email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            //save user and JWT to localStorage
            localStorage.setItem("user", JSON.stringify(json))

            //also signin after signup is done
            dispatch({
                type: "SIGN_IN",
                payload: json
            })

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error}
}

export default useSignUp