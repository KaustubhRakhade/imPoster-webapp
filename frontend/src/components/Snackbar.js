import React, { useState } from 'react'
import '../styles/snackbar.css';

//The popup from bottom element
export default function Snackbar({popup}) {

  const [canceled, setCanceled] = useState(false);
  const handleCancel = () => {
    setCanceled(true)
  }
  
  if (canceled) { return null }
  return (
    <div className="snackbar-window">
      <div className="snackbar" style={{ "--primary-color": popup.color }}>
          <span className="material-icons-round">{popup.icon}</span>
          <span>{popup.text}</span>
          <input type='button' value="OK" id='snackbar-ok' onClick={handleCancel}/>
          <div className="snackbar-timeout"></div>
      </div>
    </div>

  )
}
