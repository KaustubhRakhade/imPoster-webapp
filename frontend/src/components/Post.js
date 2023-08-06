import React, { useState, useContext } from 'react'
import '../styles/post.css';
import person from '../person.jpg';
import { PostContext } from "../context/PostContext";
import useAuthContext from "../hooks/useAuthContext";
import axios from "axios"
import useSignOut from '../hooks/useSignOut';


export default function Post({post, editPost, isEditing}) {

    const { dispatch } = useContext(PostContext)
    const { user } = useAuthContext()
    const { signout } = useSignOut()

    const [deleted, setDeleted] = useState(false)
    const handleEditButton = () => {
        editPost(post)
    }

    const ratePost = async (action) => {

        const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            }
          }

        try {

            const response = await axios.get(process.env.BACKEND + `/api/rate/${action}/` + post._id, config)

            const data = await response.data
            let responseOK = response && response.status === 200 && response.statusText === 'OK';

            if (!responseOK) {
                alert(data.error)
                return
            }
    
            if (responseOK) {
                dispatch({
                    type: "RATE_POST",
                    payload: data
                })
                console.log("like updated!", data)
            } 
        }
        catch (error) {
        
            if (error.response.data.error === "Authorization failed!") {
              signout()
            }
            console.log(error.response.data.error)
          }
    }

    const deletePost = async () => {

        const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            }
          }

        try {


            const response = await axios.delete(process.env.BACKEND + "/api/posts/" + post._id, config)

            const data = await response.data
            let responseOK = response && response.status === 200 && response.statusText === 'OK';

            if (!responseOK) {
                alert(data.error)
                return
            }
    
            if (responseOK) {
                dispatch({
                    type: "DELETE_POST",
                    payload: data
                })
                console.log("deleted!")
            }
        }
        catch (error) {
        
            if (error.response.data.error === "Authorization failed!") {
              signout()
            }
            console.log(error.response.data.error)
          }

    }

    const handleDeleteButton = () => {
        if (!user) {
            console.log("NOT LOGGED IN")
            return
        }
        // setDeleted(true)
        setTimeout(() => {
            deletePost(post)
        }, 400)
        // deletePost(post)
    }

    const handleLike = () => {
        ratePost("like")
    }

    const handleDislike = () => {
        ratePost("dislike")
    }

    let timeGap = Date.now() - post.createdAt;
    let descTimeGap = "just now";

    const timeUnits = [
        {
            time: 1000*3600*24*365,
            text: "year(s) ago"
        },
        {
            time: 1000*3600*24*30,
            text: "month(s) ago"
        },
        {
            time: 1000*3600*24*7,
            text: "week(s) ago"
        },
        {
            time: 1000*3600*24,
            text: "day(s) ago"
        },
        {
            time: 1000*3600,
            text: "hour(s) ago"
        },
        {
            time: 1000*60,
            text: "minute(s) ago"
        },
        {
            time: 1000*1,
            text: "second(s) ago"
        }
    ]

    for (let unit of timeUnits) {
        if (timeGap > unit.time) {
            descTimeGap = Math.round(timeGap / unit.time) + " " + unit.text;
            break;
        }
    }
 
  return (
    <div className={"post" + (isEditing ? " editing" : "") + (deleted ? " deleted" : "")}>
        <img id="user-image-pc" src={person} alt=""/>
        <div className="post-main">
            <div className="post-topbar">
                <img id="user-image-mob" src={person} alt=""/>
                <span className="post-user">
                    <b>@{post.username}</b>
                    <br />
                    {descTimeGap}
                </span>
                {   post.user_id === user.user_id &&
                <>
                    <input className='material-icons-round editBtn' type="button" value="edit" onClick={handleEditButton}/>
                    <input className='material-icons-round deleteBtn' type="button" value="delete" onClick={handleDeleteButton}/>
                </>
                }

            </div>
            <span className="post-content">{post.content}</span>
            <div className="post-bottombar">
                <input checked={post.likes.includes(user.user_id)} type="checkbox" id={"likeBtn" + post._id} onChange={handleLike}/>
                <input checked={post.dislikes.includes(user.user_id)} type="checkbox" id={"dislikeBtn" + post._id} onChange={handleDislike}/>
                <label htmlFor={"likeBtn" + post._id}>
                    <span className='material-icons-round'>thumb_up</span>
                    <span>{post.likes.length}</span>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor={"dislikeBtn" + post._id}>
                    <span className='material-icons-round'>thumb_down</span>
                    <span>{post.dislikes.length}</span>
                </label>
            </div>
        </div>
        
    </div>
  )
}
