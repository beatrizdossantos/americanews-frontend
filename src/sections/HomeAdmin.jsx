import '../styles/sections/HomeAdmin.sass';
import Cookies from 'js-cookie';
import UsuarioContext from "../context/UsuarioContext.jsx";
import NoticiaContext from "../context/NoticiaContext.jsx";
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories.jsx';

function HomeAdmin() {
    const {
        RealizaLogout
    } = useContext(UsuarioContext);

    const {
        noticias,
        Noticia_GetByStatus,
        Noticia_GetAll,
    } = useContext(NoticiaContext);

    useEffect(() => {
        Noticia_GetAll();

        // Recuperar valores dos cookies
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        const email = Cookies.get('email');
        const senha = Cookies.get('senha');
        const nivel = Cookies.get('nivel');

        if (authToken == null || userId == null || email == null || senha == null || nivel == null) {
            window.location.href = '/';
        } else {
            if (nivel != '1') {
                RealizaLogout()
            }
        }
    }, []);

    useEffect(() => {
        console.log(noticias);
    }, [noticias]);

    useEffect(() => {
        const menuCategory = document.getElementById("categories")
        const btnCategories = document.getElementById("btnCategories")

        if (btnCategories){
            btnCategories.style.visibility = "visible"  
        }

        document.getElementById('categories').addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                const id = event.target.id;
                console.log('Item clicado:', id);
                handleCategoryClick(id);
            }
        });

    }, [])

    function handleCategoryClick(status) {  
        if (status == 0)    
            Noticia_GetAll();
        else
            Noticia_GetByStatus(status);
    }

    return (
        <div id='homeNoticia'>
            <div id='noticiaScroll'>            
                {noticias.length > 0 ? (
                    noticias.map((noticia, index) => (
                        <div key={noticia.id} style={{ listStyleType: 'none', padding: 0 }}>
                            <Link
                                to={{
                                    pathname: `/noticiaAdmin/${noticia.id}`
                                }}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div className='noticiaItem' style={{ cursor: 'pointer' }}>
                                    <img className='imageScroll' src={noticia.linkIMG} alt={`Noticia ${index + 1}`} />
                                    <div className='corpoNoticia'>
                                        <h3 className='titleNoticia'>{noticia.titulo}</h3>
                                        <p className='textoSobrepost'>{noticia.texto}</p>
                                        <input
                                            type='date'
                                            className='dataDaNoticia'
                                            name={`dataDaNoticia-${index}`}
                                            disabled
                                            value={moment(noticia.data).format('YYYY-MM-DD')}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className='noticiaItem'>
                        <p>Não há notícias nesse status.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HomeAdmin; 