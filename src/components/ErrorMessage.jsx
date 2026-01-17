import React from 'react'
import iconError from '../img/iconError.png'
import '../styles/components/errorMessage.sass'

// https://i.ibb.co/hFsvzbM/Group-3.png

function ErrorMessage() {
  return (
    <div id='errorMessage' >
        <img src={iconError} /> 
        <p>Ocorreu um erro. Verifique os dados!</p>
    </div>
  )
}

export default ErrorMessage