import React, { useEffect, useRef, useState } from 'react'
import '../styles/signin-signup.css';
import useSignIn from "../hooks/useSignIn"
import validator from "validator"
import FormInput from '../components/FormInput';

export default function SignIn({showPopup}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const submitRef = useRef();

    const { signin, isLoading, error } = useSignIn()

    const handleSignIn = async () => {
        if (emailError || passwordError) {
            showPopup("Invalid credentials!", "error", "#ff6a6a")

        }
        else {
            await signin(email, password)
            // showPopup("Signed In!", "login", "#20da97")
        }
    }

    useEffect(() => {
        const validateInput = () => {
    
            setEmailError(() => {
                if (email === "") {
                    return "Email Address is required"
                }
    
                if (validator.isEmail(email)) {
                    return null
                }
    
                return "Email Address is not valid"
            })
    
            setPasswordError(() => {
                if (password.length >= 8) {
                    return null
                }
    
                return "Password should be atleast 8 characters"
            })
    
        }

        validateInput()
    }, [email, password])

    useEffect(() => {
        if (emailError || passwordError)
        {
            submitRef.current.classList.add("disabled");
        }
        else {
            submitRef.current.classList.remove("disabled");
        }
    }, [emailError, passwordError])

    useEffect(() => {
        if (error) {
            showPopup(error, "error", "#ff6a6a")

            if (error.toLowerCase().includes('email')) {
                setEmailError(error)
            }
            if (error.toLowerCase().includes('password')) {
                setPasswordError(error)
            }
        }
    }, [error])
  return (
    <div id='signin'>
        <h3>Sign In</h3>

        <FormInput
            id="input-email"
            icon="alternate_email"
            type="email"
            placeholder="Email Address"
            setData={setEmail}
            data={email}
            error={emailError}
        />

        <FormInput
            id="input-password"
            icon="key"
            type="password"
            placeholder="Password"
            setData={setPassword}
            data={password}
            error={passwordError}
        />

        <div id="input-bottom">
            {/* <input type="checkbox" name="" id="rememberCheckbox" />
            <label htmlFor="rememberCheckbox">
                <span className='material-icons-round'>check_box_outline_blank</span>
                <span className='material-icons-round'>check_box</span>
                <span>Remember me</span>
            </label> */}

            <div onClick={handleSignIn} ref={submitRef} id="signInBtn">
                <span className='material-icons-round'>login</span>
                <span>Sign In</span>
            </div>
        </div>

        {/* {error && <div>{error}</div>} */}

    </div>
  )
}
