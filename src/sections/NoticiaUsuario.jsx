import React, { useState } from 'react';
import aprovado from '../img/Paper_Plane.svg';
import reprovado from '../img/Unavailable.svg';
import imagemalan from '../img/1.png';
import imagembilante from '../img/2.jpg';
import '../styles/sections/NoticiaUsuario.sass';
import NoticiaImagem1 from '../img/Jailson_Mendes.jpg';
import NoticiaImagem2 from '../img/Imposto_Renda.jpg';
import NoticiaImagem3 from '../img/Shrek.jpg';
import NoticiaImagem4 from '../img/WhatHell.jpg';
import NoticiaContext from "../context/NoticiaContext.jsx";
import ComentarioContext from "../context/ComentarioContext.jsx";
import UsuarioContext from "../context/UsuarioContext.jsx";

const dataAtual = () => {
    new Date();
}

const NoticiaUsuario = () => {
    const [imagePreview, setImagePreview] = useState(null);

function NoticiaUsuario() {
    const [imagePreview, setImagePreview] = useState(null);
    const { RealizaLogout } = useContext(UsuarioContext);
    const { noticias, Noticia_GetByStatus, Noticia_GetAll } = useContext(NoticiaContext);
    const{comentarios,comentario_GetAllByNoticia,comentario_GetAllByStatus,comentario_GetAllByID,comentario_GetAllByNoticiaAndStatus}= useContext(ComentarioContext);

    const [noticialeft, setNoticialeft] = useState([]);
    const [noticiaright, setNoticiaright] = useState([]);
    useEffect(() => {
        Noticia_GetByStatus(1);

        // Recuperar valores dos cookies
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        const email = Cookies.get('email');
        const senha = Cookies.get('senha');
        const nivel = Cookies.get('nivel'); 

        if (!authToken || !userId || !email || !senha || !nivel) {
            window.location.href = '/';
            return;
        }
        console.log('authToken:', authToken);
        console.log('userId:', userId);
        console.log('email:', email);
        console.log('senha:', senha);
        console.log('nivel:', nivel);

        if (nivel === 1) {
            console.log('admin');
        } else if (nivel === 2) {
            console.log('user');
        } else {
            console.log('erro');
        }
    }, []);
    
    const urlSplits = window.location.pathname.split('/');
        const idNoticia = urlSplits[urlSplits.length - 1];
        console.log(idNoticia);
        Noticia_GetById(idNoticia);

    
    noticias=Noticia_GetById(urlSplits); //1 usuario 2 adm 3 desativado
    comentarios=comentario_GetAllByNoticiaAndStatus(idNoticia,1);

    if  ((noticia.Status === 2 && nivel === 1) || (noticia.Status === 2 && nivel === 3)){//1 aprovado 2 reprovado
        RealizaLogout()
    }
    
    
}

    return (
        <div className="side">
            <div className="main-container">
                <article className="news-container">
                    <header>
                        <h1 className="title">{noticias.titulo}</h1>
                        <div className="divider"></div>
                        <h2 className="subtitle">{noticias?.subtitulo}</h2>
                    </header>
                    <figure>
                        <img src={noticias.linkIMG} alt="Imagem da Notícia" className="image" />
                    </figure>
                    <section className="content">
                        <p>{noticias?.texto}</p>
                        
                    </section>
                </article>
                
            </div>
            {/* Área dos comentários */}
        </div>
    );
};

export default NoticiaUsuario;