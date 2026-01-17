import React, { useState, useContext, useEffect } from 'react';
import '../styles/sections/loginScreen.sass';
import '../styles/components/supportScreen.sass'
import imgTopSide from '../img/top-side.svg';
import logoAmericanews from '../img/logoAmericanews.png';
import iconSupport from '../img/iconSupport.png';
import '../components/SupportScreen.jsx';
import UsuarioContext from "../context/UsuarioContext.jsx";
import ErrorMessagee from '../components/ErrorMessage.jsx';
import SuccessMessagee from '../components/SuccessMessage.jsx';

const LoginScreen = () => {
    const {
        login,
        RealizaLogin,
        errorMessage, 
        user
    } = useContext(UsuarioContext);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email: ' + email + '  Senha: ' + senha);
        await RealizaLogin(email, senha);
    };

    useEffect(() => {

        document.getElementById('successMessage').style.top = "40px"
        document.getElementById('errorMessage').style.top = "40px"

        const errorMessagee = document.getElementById('errorMessage');
        const successMessagee = document.getElementById('successMessage');


        console.log(login);

        if (login.login === true) {
            errorMessagee.style.visibility = "hidden";
            errorMessagee.style.display = "none";

            function hiddenMessageSuccess() {
                if (login.login === true) {
                    // successMessagee.style.top = "40px"
                    successMessagee.style.visibility = "hidden";
                    successMessagee.style.display = "none"
                }
            }

            function redirect() {
                if (user.nivelPermissao === 1)
                    window.location.href = '/HomeAdmin';
    
                if (user.nivelPermissao === 2)
                    window.location.href = '/home';
            }

            if (login.login === true) {
                // successMessagee.style.top = "40px"
                successMessagee.style.visibility = "visible";
                successMessagee.style.display = "flex"
            }

            setTimeout(hiddenMessageSuccess, 1000);
            setTimeout(redirect, 1000);
        }
        else {
            console.log('Error message:', errorMessage);

            function hiddenMessageError() {
                if (errorMessage != '') {
                    // errorMessage.style.top = "40px"
                    errorMessagee.style.visibility = "hidden";
                    errorMessagee.style.display = "none"
                }
            }

            if (errorMessage != '') {
                // errorMessage.style.top = "40px"
                errorMessagee.style.visibility = "visible";
                errorMessagee.style.display = "flex"
            }

            setTimeout(hiddenMessageError, 3000);
        }  
    }, [login]);

    const btnSupport = () => {
        document.getElementById('supportScreen').style.visibility = "visible";
        document.getElementById("supportScreen").style.display = "flex";
    };

    return (
        <div id="background">
            <div id='top-side'>
                <img id="imgTopSide" src={imgTopSide} alt=''/>
                <button id='btnSupport' onClick={btnSupport}><img id='imgSupport' src={iconSupport} alt='Suporte'/></button>
                <div id="logoAmenicanews"><img src={logoAmericanews} alt='Logo AmericaNews'/></div>
            </div>
            <div id='down-side'>
                <div id='formLogin'>
                    <form className="form" action="" onSubmit={handleSubmit}>
                        <div id='input-box1'>
                            <input type="email"
                                placeholder='E-mail' 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required/>
                        </div>
                        <div id='input-box2'>
                            <input type="password" 
                                placeholder='Senha'
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required/>
                            <a onClick={btnSupport}>Esqueceu a senha?</a>
                        </div>
                        <div id='buttons'>
                            <button id='btnLogin' type="submit" disabled={login.loading}>
                                {login.loading ? 'CARREGANDO...' : 'LOGIN'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
