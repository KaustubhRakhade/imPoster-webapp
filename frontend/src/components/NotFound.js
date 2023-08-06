import React from 'react'
import logo from '../logo512.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div id='not-found'>
        <h1>4<img src={logo} alt="0" />4</h1>
        <span>This page doesn't exist</span>
        <Link to="/home">
            <span className='material-icons-round'>home</span>
            <span>Home</span>
        </Link>
    </div>
  )
}
