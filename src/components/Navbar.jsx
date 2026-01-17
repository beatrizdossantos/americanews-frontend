import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import '../styles/components/navbar.sass'
import iconBack from '../img/iconBack.png'
import logoNavbar from '../img/logoNavbar.png'
import User from '../img/User.svg'
import box_plus from '../img/box-plus.svg'
import Order from '../img/Order.svg'
import support from '../img/support.svg'
import Reload from '../img/Reload.svg'
import Search from '../img/Search.svg'
import '../components/SupportScreen.jsx'
import '../sections/CadastrarNoticia.jsx'
import '../sections/HomeNoticia.jsx'
import UsuarioContext from "../context/UsuarioContext.jsx";
import iconCategories from "../img/iconCategories.png"

const btnSupport = () => {
    document.getElementById('supportScreen').style.visibility = "visible";
    document.getElementById("supportScreen").style.display = "flex"
};

let state = true;
let state1 = true;

const btnCategory = () => {
    const categories = document.getElementById('categories');
    if (state1) {
        categories.style.visibility = "visible";
        state1 = false;
    } else {
        categories.style.visibility = "hidden";
        state1 = true;
    }
};

const handleClickOutside = (event) => {
    const categories = document.getElementById('categories');
    const btnCategories = document.getElementById('btnCategories');

    if (categories && !categories.contains(event.target) && !btnCategories.contains(event.target)) {
        categories.style.visibility = "hidden";
        state1 = true;
    }
};

const handleClickItem = (event) => {
    const categories = document.getElementById('categories');
    const btnCategories = document.getElementById('btnCategories');

    if (categories) {
        categories.style.visibility = "hidden";
        state1 = true;
    }
};

const btnOrder = () => {
    let items = document.getElementsByClassName("noticiaItemRight");
    let dates = document.getElementsByClassName("dataDaNoticia");
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < items.length - 1; i++) {
            let date1 = new Date(dates[i].value);
            let date2 = new Date(dates[i + 1].value);
            
            if ((state && date1 > date2) || (!state && date1 < date2)) {
                let tempContent = items[i].innerHTML;
                items[i].innerHTML = items[i + 1].innerHTML;
                items[i + 1].innerHTML = tempContent;
                
                swapped = true;
            }
        }
    } while (swapped);

    state = !state;
};

const btnReload = () => {
    window.location.reload(true);
};

const Navbar = () => {
    const { RealizaLogout } = useContext(UsuarioContext);
    
    const handleLogout = async (e) => {
        e.preventDefault();
        await RealizaLogout();
    };

    useEffect(() => {       
        // Recuperar valores dos cookies
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        const email = Cookies.get('email');
        const senha = Cookies.get('senha');
        const nivel = Cookies.get('nivel');

        const registerButton = document.getElementById("registerButton");
        const menu = document.getElementsByClassName("dropdown")[0];

        if (registerButton && nivel != 1) {
            registerButton.style.display = "none";
            menu.style.height = "2rem";
        }

        // Adicionar event listener para cliques fora do menu de categorias
        document.addEventListener('click', handleClickOutside);

        // Adicionar event listener para cliques em um item do menu de categorias
        const categoryItems = document.getElementsByClassName('category-item');
        for (let i = 0; i < categoryItems.length; i++) {
            categoryItems[i].addEventListener('click', handleClickItem);
        }

        // Remover event listener ao desmontar o componente
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav id='navbar'>
            <div id='leftNavbar'>
                <img id='logoNavbar' src={logoNavbar} alt="Logo Navbar" />
            </div>
            <div id='centerNavbar'>
                <button id="BottonSearchNavbar">
                    <img src={Search} alt='Search'/>
                </button>
                <input id="inputSearch" type="search" name="pesquisa"/>
                <button onClick={btnCategory} id="btnCategories">
                    <img src={iconCategories} />
                </button>
            </div>
            <div id='rightNavbar'>
                <button onClick={btnSupport} id='btnSupport' className='BottonNavbar' >
                    <img src={support} alt='support'/>
                </button>
                <button id='btnReload' className='BottonNavbar' onClick={btnReload}>
                    <img src={Reload} alt='Reload'/>
                </button>
                <button id='btnOrder' onClick={btnOrder} className='BottonNavbar' >
                    <img  src={Order} alt='Order'/>
                </button>
                <Link to="/notice" id='btnPlus' className='BottonNavbar'>
                    <img  src={box_plus} alt='box_plus'/>
                </Link>
                <ul>
                    <li>
                        <button id='btnUser' className='BottonNavbar' >
                            <img className='iconeNavbar' src={User} alt='User'/>
                        </button>
                        <ul className='dropdown'>
                            <li><a href="#" onClick={handleLogout}>Sair</a></li>                           
                            <li><a id="registerButton" href="/register">Cadastrar</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
