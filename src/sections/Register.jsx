import React, { useState, useEffect } from 'react';
import '../styles/sections/Register.sass';
import InputMask from 'react-input-mask';
import iconBack from '../img/iconBack.png';
import logoNavbar from '../img/logoNavbar.png';
import Cookies from 'js-cookie';


const FormularioCadastro = () => {

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
    const leftNavbar = document.getElementById("leftNavbar");
    const btnReload = document.getElementById("btnReload");
    const btnOrder = document.getElementById("btnOrder");
    const rightNavbar = document.getElementById("rightNavbar");
    const allPage = document.getElementById("americanews");
    const menu = document.getElementsByClassName("dropdown")[0];
    const backHome = nivel == 1 ? "/homeAdmin" : "/home";

    if (menu) 
      menu.children[1].innerHTML = ''
      menu.style.height = "2rem"
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
    <div className="inner-container" >
      <label htmlFor="nome-completo" className="label-text label-text-gray">
        Nome completo
      </label>
      <input type="text" id="nome-completo" className="input-field" maxLength={200}/>

      <label htmlFor="endereco" className="label-text label-text-gray ">
        Endereço
      </label>
      <input type="text" id="endereco" className="input-field" maxLength={200}/>

      <label htmlFor="telefone" className="label-text label-text-gray">
        Telefone
      </label>
      <InputMask htmlFor="telefone" id="telefone" className="input-field"
        mask="(99) 9 9999-9999"
        maskChar=""
      />
      <label htmlFor="email" className="label-text label-text-gray">
        Email
      </label>
      <input type="email" id="email" className="input-field" maxLength={200}/>

      <label htmlFor="email-corporativo" className="label-text label-text-gray">
        Email corporativo
      </label>
      <input type="email" id="email-corporativo" className="input-field" maxLength={200}/>

      <label htmlFor="senha" className="label-text label-text-gray">
        Senha
      </label>
      <input type="password" id="senha" className="input-field" maxLength={200}/>

      <label htmlFor="confirmar-senha" className="label-text label-text-gray">
        Confirmar senha
      </label>
      <input type="password" id="confirmar-senha" className="input-field" maxLength={200}/>

      <button className="button">Cadastrar</button>
    </div>
  );
};

export default FormularioCadastro;
