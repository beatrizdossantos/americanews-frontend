import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, useState } from "react";
import { apiAdress } from '../components/Api.jsx';

const UsuarioContext = createContext();

export const UsuarioProvider = ({children}) => {

    const [login, setLogin] = React.useState({loading: false, login: false});
    const [user, setUser] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState("");

    const RealizaLogin = async (email, senha) => {
        setLogin(prev => {return {loading: true, login: false}});
        console.log('Realizando login...');

        try {
            const response = await axios.post(
                `${apiAdress}/Usuario/login`,
                {
                    Email: email,
                    Password: senha
                },
            );
            
            if (response.status === 200) {
                setUser(response.data);
                setErrorMessage('');
                console.log(response);
                
                // Setar Cookies
                Cookies.set('authToken', true, { expires: 7 });
                Cookies.set('userId', response.data.id, { expires: 7 });
                Cookies.set('email', response.data.email, { expires: 7 });
                Cookies.set('senha', senha, { expires: 7 });
                Cookies.set('nivel', response.data.nivelPermissao, { expires: 7 });

                setLogin(prev => {return {loading: false, login: true}});
            }
        } catch (error) {
            console.error(error);
            setUser(null);

            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Ocorreu um erro inesperado ao realizar o login!");
            }

            setLogin(prev => {return {loading: false, login: false}});
        }
    };

    const RealizaLogout = () => {
        Cookies.remove('authToken');
        Cookies.remove('email');
        Cookies.remove('userId');
        Cookies.remove('senha');
        Cookies.remove('nivel');

        setUser(null);
        setLogin(prev => {return {loading: false, login: false}});

        window.location.href = '/';
    }
    
    return <UsuarioContext.Provider
        value={{
            login,
            RealizaLogin,
            RealizaLogout,
            user,
            errorMessage
        }}
    >
        {children}
    </UsuarioContext.Provider>
};

export default UsuarioContext;