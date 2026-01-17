import React, { useState, useEffect } from 'react';
import iconBack from '../img/iconBack.png';
import logoNavbar from '../img/logoNavbar.png';
import enviarNoticia from '../img/enviarNoticia.svg';
import '../App.jsx';
import anexo from '../img/anexo.svg';
import '../styles/sections/cadastrarNoticia.sass';
import '../components/Navbar.jsx';
import Cookies from 'js-cookie';

const CadastrarNoticia = () => {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Recuperar valores dos cookies
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        const email = Cookies.get('email');
        const senha = Cookies.get('senha');
        const nivel = Cookies.get('nivel');

        if(authToken == null || userId == null || email == null || senha == null || nivel == null){
            window.location.href = '/'; // saber onde esta o link principal para ser aqui
        }

        const btnPlus = document.getElementById("btnPlus");
        const btnReload = document.getElementById("btnReload");
        const btnOrder = document.getElementById("btnOrder");
        const leftNavbar = document.getElementById("leftNavbar");
        const rightNavbar = document.getElementById("rightNavbar");
        const allPage = document.getElementById("americanews");
        const backHome = nivel == 1 ? "/homeAdmin" : "/home";

        if (btnPlus) btnPlus.style.display = "none";
        if (btnReload) btnReload.style.display = "none";
        if (btnOrder) btnOrder.style.display = "none";  
        if (leftNavbar) {

            leftNavbar.innerHTML = `
                <a href='${backHome}' id='btnBack'><img id='iconBack' src=${iconBack} alt='Voltar' /></a>
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

        // Esconder barra de pesquisa de notícias
        checkUrlAndHideSearch("HomeAdmin");

    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
        <div id="formulario">
            <div className="form-container">
                <form className="form-label">
                    <div className="input-group">
                        <div className="input-left">
                            <label className="label-text">Título</label>
                            <input type="text" placeholder="" className="input-title" />
                            <label className="label-text">Subtítulo</label>
                            <input type="text" placeholder="" className="input-title" />
                            <label className="label-text">Categoria</label>
                            <input type="text" placeholder="" className="input-category-field" />
                        </div>
                        <div className="input-right">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                ) : (
                                    <img src={anexo} alt="Anexo" />
                                )}
                                <span id="upload-text">{imagePreview ? '' : ''}</span>
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                className="input-image"
                                onChange={handleFileUpload}
                            />
                        </div>
                    </div>
                    <label className="label-text">Conteúdo</label>
                    <textarea type="text" placeholder="" id="conteudo" className="textarea"></textarea>
                    <div className="button-container">
                        <button type="submit" className="submit-button" id='submit-button'>Enviar para revisão</button>
                        <button type="button" className="submit-button-right"><img id="enviar" src={enviarNoticia} alt='' /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastrarNoticia;
