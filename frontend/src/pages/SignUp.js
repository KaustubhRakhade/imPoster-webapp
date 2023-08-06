import React, { useEffect, useRef, useState } from 'react'
import '../styles/signin-signup.css';
import useSignUp from "../hooks/useSignUp"
import validator from "validator"
import FormInput from '../components/FormInput';
import axios from "axios"

export default function SignUp({showPopup}) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPassError, setConfirmPassError] = useState(null);

    const submitRef = useRef();

    const { signup, isLoading, error } = useSignUp()

    const handleSignUp = async () => {
        if (usernameError ||
            emailError ||
            passwordError ||
            confirmPassError)
        {
            showPopup("Invalid credentials!", "error", "#ff6a6a")
        }
        else {
            await signup(username, email, password)
            showPopup("Signed Up!", "login", "#20da97")
        }
    }

    useEffect(() => {
        const validateInput = () => {
            setUsernameError(() => {
                if (username !== "") {
                    return null
                }
    
                return "Username is required"
            })
    
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
                if (password.length < 8) {
                    return "Password should be atleast 8 characters"
                }
    
                if (validator.isStrongPassword(password)) {
                    return null
                }
                return "Use atleast one UPPERCASE, lowercase, number & special character"
            })
    
            setConfirmPassError(() => {
                if (password === confirmPass && confirmPass !== "") {
                    return null
                }
    
                return "Passwords don't match"
            })
        }

        validateInput()
    }, [username,
        email,
        password,
        confirmPass])

    useEffect(() => {
        const body = {
            "email": email,
            "username": username
          }
      
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const checkDuplicate = async () => {
            try {
                const response = await axios.post("https://imposter-webapp.onrender.com" + "/api/user/check/", body, config)
                const isDuplicate = await response.data
            
                let responseOK = response && response.status === 200;
        
                if (!responseOK) {
                    console.log(isDuplicate)
                }
        
                if (responseOK) {
                    if (isDuplicate.username) {
                        setUsernameError("Username already taken")
                    }
        
                    if (isDuplicate.email) {
                        setEmailError("Email already registered")
                    }
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        
        checkDuplicate()

    }, [username, email])

    useEffect(() => {
        if (usernameError ||
            emailError ||
            passwordError ||
            confirmPassError)
        {
            submitRef.current.classList.add("disabled");
        }
        else {
            submitRef.current.classList.remove("disabled");
        }
    }, [usernameError,
        emailError,
        passwordError,
        confirmPassError])

  return (
    <div id='signin'>
        <h3>Sign Up</h3>

        <FormInput
            id="input-name"
            icon="person"
            type="text"
            placeholder="Username"
            setData={setUsername}
            data={username}
            error={usernameError}
        />
        
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

        <FormInput
            id="input-confirm"
            icon="key"
            type="password"
            placeholder="Confirm Password"
            setData={setConfirmPass}
            data={confirmPass}
            error={confirmPassError}
        />

        <div id="input-bottom">
            {/* <input type="checkbox" name="" id="rememberCheckbox" />
            <label htmlFor="rememberCheckbox">
                <span className='material-icons-round'>check_box_outline_blank</span>
                <span className='material-icons-round'>check_box</span>
                <span>Remember me</span>
            </label> */}

            <div onClick={handleSignUp} ref={submitRef} id="signInBtn">
                <span className='material-icons-round'>login</span>
                <span>Sign Up</span>
            </div>
        </div>

        {error && <span className='errorText'>{error}</span>}

    </div>
  )
}
