import React, { useEffect, useContext } from 'react'
import '../styles/editor.css';
import person from '../person.jpg';
import { PostContext } from "../context/PostContext";
import useAuthContext from "../hooks/useAuthContext";
import axios from "axios"
import useSignOut from '../hooks/useSignOut';


export default function Editor({ textInEditor, setTextInEditor, isEditing, setIsEditing, textfieldRef}) {

    const { dispatch } = useContext(PostContext)
    const { user } = useAuthContext()
    const { signout } = useSignOut()

    const addPost = async () => {
        
      const post = {
        "content": textInEditor,
        "likes": [],
        "dislikes": []
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }

      try {

        const response = await axios.post("/api/posts/", post, config)
        const data = response.data

        let responseOK = response && response.status === 200 && response.statusText === 'OK';

        if (!responseOK) {
          alert(data.error)
          return
        }

        if(responseOK) {
          dispatch({
            type: "CREATE_POST",
            payload: data
          })
          console.log("added!")
          handleDiscard()
        }
      }
      catch (error) {
        
        if (error.response.data.error === "Authorization failed!") {
          signout()
        }
        console.log(error.response.data.error)
      }
  }

  const editPost = async () => {
        
    const post = {
      "content": textInEditor,
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }

    try {

      const response = await axios.patch("/api/posts/" + isEditing, post, config)
      const data = await response.data

      let responseOK = response && response.status === 200 && response.statusText === 'OK';

      if (!responseOK) {
        alert(data.error)
        return
      }

      if (responseOK) {
        dispatch({
          type: "EDIT_POST",
          payload: {
            _id: data._id,
            content: textInEditor
          }
        })
        setIsEditing(-1);
        console.log("edited!", data)
        handleDiscard()
      }
    }
    catch (error) {
          
      if (error.response.data.error === "Authorization failed!") {
        signout()
      }
      console.log(error.response.data.error)
    }
  }

    const handleClick = () => {
        
      if (!user) {
        console.log("NOT LOGGED IN")
        return
      }
        if (isEditing === -1) {
          addPost()
        }

        else {
          editPost()
        }

    }

    const handleDiscard = () => {
      setTextInEditor("")
    }

    //auto-resize textfield
    useEffect(() => {
      textfieldRef.current.style.height = "inherit"
      textfieldRef.current.style.height = `${textfieldRef.current.scrollHeight}px`
    }, [textInEditor, textfieldRef])

  return (
    <div id='editor'>
      <img id="user-image-pc" src={person} alt=""/>
      <div id="editor-main">
        <textarea
            onChange={(e) => {
              setTextInEditor(e.target.value)
            }}
            ref={textfieldRef}
            placeholder='Write your thoughts...'
            value={textInEditor}
          />

          <div id="editor-controls">

            <img id="user-image-mob" src={person} alt=""/>

            <div id='shareBtn' className={textInEditor === "" ? "disabled" : ""} onClick={handleClick}>
              <span className="material-icons-round">{isEditing!==-1 ? "save" : "send"}</span>
              <span>{isEditing!==-1 ? "Save Edit" : "Share"}</span>
            </div>

            <div id='discardBtn' className={textInEditor === "" ? "disabled" : ""} onClick={handleDiscard}>
              <span className="material-icons-round">backspace</span>
              <span>{isEditing!==-1 ? "Clear" : "Discard"}</span>
            </div>

          </div>
      </div>


    </div>
  )
}
