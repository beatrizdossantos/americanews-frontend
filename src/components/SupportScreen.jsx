import React from 'react'
// import { useState } from 'react'
import iconClose from '../img/iconClose.png'
import logoAmericanews from '../img/logoAmericanews.png'
import iconPerson from '../img/iconPerson.png'
import iconEmail from '../img/iconEmail.png'
import iconTel from '../img/iconTel.png'
import iconForm from '../img/iconEmail2.png'
import '../styles/components/supportScreen.sass'
import '../components/Navbar.jsx'
import '../sections/HomeNoticia.jsx'
import '../sections/CadastrarNoticia.jsx'
import '../sections/LoginScreen.jsx'

const SupportScreen = () => {

    const btnClose = () => {
        document.getElementById('supportScreen').style.visibility = "hidden";
        document.getElementById("supportScreen").style.display = "none"
    }

    return (
        <div id='supportScreen'>
            <div className="popupScreen">
                <button onClick={btnClose}><img src={iconClose} alt='Fechar'/></button>
                <img src={logoAmericanews} id='logoAmericanas' alt="Logo da Americanews" />
                    <div className='centralDeContatos'>
                        <h1>Para dúvidas, sugestões ou reclamações:</h1>
                        <div className='boxContact' id='boxTel'>
                            <img src={iconPerson} alt="" />
                            <div className="fieldTel">
                                <p>+55 (11) 9 6980-1105</p>
                                <div className="clipboardButton"><img src={iconTel}/></div>
                            </div>
                        </div>
                        <div className='boxContact' id='boxEmail'>
                            <img src={iconEmail} alt="" />
                            <div className="fieldEmail">
                                <p>suporte@americanas.com.br</p>
                                <div className="clipboardButton"><img src={iconForm}/></div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default SupportScreen;