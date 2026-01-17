import React, { useState, useContext, useEffect } from 'react';
import '../styles/sections/homeNoticia.sass';
import Cookies from 'js-cookie';
import NoticiaContext from "../context/NoticiaContext.jsx";
import UsuarioContext from "../context/UsuarioContext.jsx";

const dataAtual = () => new Date();

function HomeNoticia() {
    const { RealizaLogout } = useContext(UsuarioContext);
    const { noticias, Noticia_GetByStatus, Noticia_GetAll } = useContext(NoticiaContext);

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

    useEffect(() => {
        if (noticias.length > 0) {
            const halfLength = Math.floor(noticias.length / 2);
            setNoticialeft(noticias.slice(0, halfLength));
            setNoticiaright(noticias.slice(halfLength));
        }
    }, [noticias]);

    return (
        <div id="homeNoticia">
            {/* Notícias à Esquerda */}
            <div id="noticiaScrollLeft">
                {noticialeft.map((noticia, index) => (
                    <a href={`/noticia/${noticia.id}`} key={index} className="noticiaItemLeft">
                        <img
                            className="imageScrollLeft"
                            src={noticia.linkIMG}
                            alt={`Noticia ${index + 1}`}
                        />
                        <p className="textoSobrepostoLeft">{noticia.titulo}</p>
                    </a>
                ))}
            </div>
            {/* Notícias Selecionadas à Direita */}
            <div id="noticiaScrollRight">
                {noticiaright.length > 0 ? (
                    noticiaright.map((noticia, index) => (
                    <a href={`/noticia/${noticia.id}`}>
                        <div href={`/noticia/${noticia.id}`} className="noticiaItemRight">
                            <img
                                className="imageScrollRight"
                                src={noticia.linkIMG}
                                alt="Noticia Selecionada"
                            />
                            <div className="corpoNoticia">
                                <h3 className="titleNoticiaRight">{noticia.titulo}</h3>
                                <p className="textoSobrepostRight">{noticia.texto}</p>
                                <p className="dataDaNoticia">
                                    {noticia.dataPublicacao
                                        ? noticia.dataPublicacao.slice(0, 10)
                                        : ''}
                                </p>
                            </div>
                        </div>
                    </a>
                ))): (
                    <div className='noticiaItem'>
                        <p>Ainda não há notícias disponíveis para leitura!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeNoticia;
