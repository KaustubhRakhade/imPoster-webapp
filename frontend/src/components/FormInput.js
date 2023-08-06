import React from 'react'

export default function FormInput({id, icon, type, placeholder, setData, data, error}) {
  return (
    <>
        <div id={id} className="input-field">
            <span className='inputIcon material-icons-round'>{icon}</span>
            <input
                type={type}
                placeholder={placeholder}
                value={data}
                onInput={(e) => { setData(e.target.value) }}
            />
            <span className={`inputStatus material-icons-round ${error ? "" : "correct"}`}>
                {error ? "error" : "check_circle"}
            </span>
        </div>
        <span className='errorText'>{error}</span>
    </>

  )
}
