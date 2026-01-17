import React from 'react';
import '../styles/components/Rodape.sass';
import logo from '../img/americanewsBranca.svg';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div>
            <img src={logo} alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-links">
          <a href="#terms">Termos de Serviço</a>
          <a href="#privacy">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
