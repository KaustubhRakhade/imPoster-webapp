import { useState, useRef, useEffect, useContext } from "react";
import Editor from "../components/Editor";
import Post from "../components/Post";
import { PostContext } from "../context/PostContext";
import useAuthContext from "../hooks/useAuthContext";
import axios from "axios"
import useSignOut from '../hooks/useSignOut';

export default function Dashboard({showPopup}) {
  const {posts, dispatch} = useContext(PostContext)
  const { signout } = useSignOut()
  const { user } = useAuthContext()

  const [textInEditor, setTextInEditor] = useState("");
  const textfieldRef = useRef();

  //keeps track of which post is being edited
  const [isEditing, setIsEditing] = useState(-1);

  const handleEdit = (post) => {
    setTextInEditor(post.content);
    document.body.scrollTop = 0;            //Safari
    document.documentElement.scrollTop = 0; //Chrome, Firefox
    textfieldRef.current.focus();
    setIsEditing(post._id);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios(process.env.BACKEND + "/api/posts/", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = response.data
  
        let responseOK = response && response.status === 200 && response.statusText === 'OK';

        if (!responseOK) {
          alert(data.error)
          return
        }
  
        if(responseOK) {
          dispatch({
            type: "SET_POSTS",
            payload: data
          })
        }
        
      }
      catch (error) {
        
        if (error.response.data.error === "Authorization failed!") {
          signout()
        }
        console.log(error.response.data.error)
      }

    }

    if (user) {
      fetchPosts()
    }

  }, [dispatch, user])

  const handleAddPost = () => {
    if (isEditing === -1) {
      showPopup("Posted sucessfully!", "bolt", "#4b93ff;")
    }
    else {
      showPopup("Edited sucessfully!", "edit_note", "#f9c052")
    }
    setIsEditing(-1);
  };

  const handleDeletePost = (post) => {
    showPopup("Deleted sucessfully!", "delete", "#ff6a6a")
  };

  const handleRate = (post, rating) => {
  };

  return (
    <>
      <Editor
        textInEditor={textInEditor}
        setTextInEditor={setTextInEditor}
        addPost={handleAddPost}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        textfieldRef={textfieldRef}
      />

      {posts && posts.map((post) => (
        <Post
          post={post}
          key={post._id}
          isEditing={post._id === isEditing}
          deletePost={handleDeletePost}
          editPost={handleEdit}
          ratePost={handleRate}
        />
      ))}
    </>
  );
}
