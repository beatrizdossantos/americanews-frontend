import React from 'react'
import iconSuccess from '../img/iconSuccess.png'
import '../styles/components/sucessMessage.sass'

function SuccessMessage() {
  return (
    <div id='successMessage'>
        <img src={iconSuccess} />
        <p>Sucesso na Operação!</p>
    </div>
  )
}

export default SuccessMessage