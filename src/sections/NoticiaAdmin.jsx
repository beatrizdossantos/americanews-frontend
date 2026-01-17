import React, { useState, useContext, useEffect } from 'react';
import aprovado from '../img/Paper_Plane.svg';
import reprovado from '../img/Unavailable.svg';
import imagemalan from '../img/1.png';
import imagembilante from '../img/2.jpg';
import '../styles/sections/NoticiaAdmin.sass';
import Cookies from 'js-cookie';
import NoticiaContext from "../context/NoticiaContext.jsx";
import ErrorMessagee from '../components/ErrorMessage.jsx';
import SuccessMessagee from '../components/SuccessMessage.jsx';
import iconBack from '../img/iconBack.png';
import logoNavbar from '../img/logoNavbar.png';


const NoticiaAdmin = () => {
    const {
        Noticia_GetById,
        Noticia_UpdateStatus,
        noticias,
        error,
        isMessageVisible,
        setIsMessageVisible,
        updateSuccess
    } = useContext(NoticiaContext);

    const [adminId, setAdminId] = useState(0);

    useEffect(() => {
        // Esconder barra de pesquisa de notícias
        checkUrlAndHideSearch("HomeAdmin");

        const btnReload = document.getElementById("btnReload");
        const leftNavbar = document.getElementById("leftNavbar");
        const rightNavbar = document.getElementById("rightNavbar");
        const allPage = document.getElementById("americanews");
        const btnOrder = document.getElementById("btnOrder");

        if (btnReload) btnReload.style.display = "none";
        if (btnOrder) btnOrder.style.display = "none";
        if (leftNavbar) {
            leftNavbar.innerHTML = `
                <a href='/HomeAdmin' id='btnBack'><img id='iconBack' src=${iconBack} alt='Voltar' /></a>
                <img id='logoNavbar' src=${logoNavbar} alt='Logo Navbar' />
            `;
            const logoElement = document.getElementById("logoNavbar");
            if (logoElement) {
                logoElement.style.marginLeft = "0";
            }
        }
        if (allPage) allPage.style.overflow = "hidden";
        if (rightNavbar) {
            rightNavbar.style.justifyContent = "flex-end";
            rightNavbar.style.paddingRight = "2rem";
        }

    }, [])
    
    useEffect(() => {     
        // Recuperar valores dos cookies
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        const email = Cookies.get('email');
        const senha = Cookies.get('senha');
        const nivel = Cookies.get('nivel');

        if (authToken == null || userId == null || email == null || senha == null || nivel == null){
            window.location.href = '/';
        } else {
            if (nivel != '1') {
                RealizaLogout()
            }
        }

        setAdminId(userId);

        const urlSplits = window.location.pathname.split('/');
        const idNoticia = urlSplits[urlSplits.length - 1];
        console.log(idNoticia);
        Noticia_GetById(idNoticia);
    }, []);

    useEffect(() => {
        console.log(updateSuccess);

        const errorMessagee = document.getElementById('errorMessage');
        const successMessagee = document.getElementById('successMessage');

        function hiddenMessageError() {
            errorMessagee.style.visibility = "hidden";
            errorMessagee.style.display = "none";

            setIsMessageVisible(false);
        }

        function hiddenMessageSuccess() {
            successMessagee.style.visibility = "hidden";
            successMessagee.style.display = "none";

            setIsMessageVisible(false);
        }
        
        if (updateSuccess && isMessageVisible) {
            successMessagee.style.visibility = "visible";
            successMessagee.style.display = "flex";
            successMessagee.style.top = "80px";

            setTimeout(hiddenMessageSuccess, 2000);
        }

        if (!updateSuccess && isMessageVisible) {
            errorMessagee.style.visibility = "visible";
            errorMessagee.style.display = "flex";
            errorMessagee.style.top = "80px";

            setTimeout(hiddenMessageError, 2000);
        }
    }, [isMessageVisible, updateSuccess]);

    function handleChangeStatus(status, idNoticia) {
        console.log(idNoticia + "," + status + "," + adminId);
        Noticia_UpdateStatus(idNoticia, status, adminId);
    }

    function checkUrlAndHideSearch(targetPath) {
        const currentPath = window.location.pathname;    

        if (!currentPath.includes(targetPath)) {
            const element = document.getElementById("centerNavbar");
            if (element) {
                element.style.display = 'none';
            }
        } else {
            const element = document.getElementById("centerNavbar");
            if (element) {
                element.style.display = 'flex';
            }
        }
    }

    return (
        <div className="lado">
            <div className="main-container">
                <article className="news-container">
                    <header>
                        <h1 className="title">{noticias.titulo}</h1>
                        <div className="divider"></div>
                        <h2 className="subtitle">{noticias.subtitulo}</h2>
                    </header>
                    <figure>
                        <img src={noticias.linkIMG} alt="Imagem da Notícia" className="image" style={{ maxWidth: '400px' }}/>
                    </figure>
                    <section className="content">
                        <p>{noticias.texto}</p>          
                        <div className="container-button">
                            <div className="buttonReprovs" >
                                <button style={{ cursor: 'pointer'}} className="blackbutton" type="button" onClick={() => handleChangeStatus(2, noticias.id)}>Reprovado</button>
                                <button style={{ cursor: 'pointer'}} className="redbutton" type="button" onClick={() => handleChangeStatus(2, noticias.id)}><img src={reprovado} alt="Ícone Reprovado" /></button>
                            </div>
                            <div className="buttonAprovs">
                                <button style={{ cursor: 'pointer'}} className="blackbutton" type="button" onClick={() => handleChangeStatus(1, noticias.id)}>Aprovado</button>
                                <button style={{ cursor: 'pointer'}} className="greenbutton" type="button" onClick={() => handleChangeStatus(1, noticias.id)}><img src={aprovado} alt="Ícone Aprovado" /></button>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}

export default NoticiaAdmin;
