import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../logo192.png';
import '../styles/navbar.css';
import useSignOut from '../hooks/useSignOut';
import useAuthContext from '../hooks/useAuthContext';

export default function Navbar() {

  const { signout } = useSignOut()
  const { user } = useAuthContext()
  console.log(user)

  const handleSignOut = () => {
    signout()
  }
  return (
    <div id='navbar'>
        <input className="material-icons-round" type="button" value="menu" />
        <div id="logobox">
            <img src={logo} alt=""/>
            <h1>imPoster</h1>
        </div>
        
        <div id="navlinks">

            { user && 
              <>
                <span>Signed in as @{user && user.username}</span>
                <input type="button" value="Sign Out" onClick={handleSignOut}/>
              </> }

            { !user && 
              <>
                {/* <Link className='active' to="/home">Home</Link> */}
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </> }

        </div>
    </div>
  )
}
