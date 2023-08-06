import { useState } from 'react'
import useAuthContext from "./useAuthContext"

export const useSignIn = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signin = async (email, password) => {
        setError(null)
        setIsLoading(true)

        console.log({email, password})

        const response = await fetch(process.env.BACKEND + "/api/user/signin", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            //save user and JWT to localStorage
            localStorage.setItem("user", JSON.stringify(json))

            dispatch({
                type: "SIGN_IN",
                payload: json
            })

            setIsLoading(false)
        }
    }

    return { signin, isLoading, error}
}

export default useSignIn