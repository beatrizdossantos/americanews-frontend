import * as React from 'react';
import axios from 'axios';
import { createContext, useState, useEffect} from "react";
import { apiAdress } from '../components/Api.jsx';
const NoticiaContext = createContext();

export const NoticiaProvider = ({ children }) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

    const Noticia_GetAll = async () => {
      try {
        const response = await axios.get(`${apiAdress}/Noticia`);
        const data = response.data;

        if (response.status === 200 ) {
          setNoticias(data);
        }
      } 
      catch (error) {
        console.error(error);
        let message = "Ocorreu um erro ao buscar noticias";

        if (error.response && error.response.data && error.response.data.message) 
          setError(message + ": " + error.response.data.message);
        else 
        setError(message);
      } 
      finally {
        setLoading(false);
      }
    };


  const Noticia_GetByStatus = async (Status) => {
    try {
      const response = await axios.get(`${apiAdress}/Noticia/Status/${Status}`);
      const data = response.data;

      if (response.status === 200 ) {
        setNoticias(data);
      } 
    } catch (error) {
      console.error(error);
      let message = "Ocorreu um erro ao buscar as noticias";

      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
      } else {
        setError(message);
      }
    }
  };

  const Noticia_Insert = async (noticia) => {
    try {
      const response = await axios.post(`${apiAdress}/Noticia`, {
        Titulo: titulo,
        Subtitulo: subtitulo,
        Texto: texto,
        LinkIMG: linkIMG,
        Data: data,
        Status: status,
        IdUsuario: idUsuario,
        ID_ADM_Aprovou: id_adm_aprovou

      });
      const data = response.data;

      if (response.status === 200 ) {
        const newNoticia = data;
        setNoticias([...noticias, newNoticia]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro ao adicionar uma noticia.');
    }
  };

  const Noticia_UpdateStatus = async (noticia,newStatus,AdminID) => {
    try {
      const response = await axios.put(`${apiAdress}/Noticia/atualizarStatus/${noticia}/${newStatus}/${AdminID}`);
      const data = response.data;

      if (response.status === 200 ) {
        console.log("sucesso");
        setIsMessageVisible(true);  
        setUpdateSuccess(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setIsMessageVisible(true);
      setUpdateSuccess(false);
      
      let message = "Ocorreu um erro ao mudar o status da noticia";

      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
      } else {
        setError(message);
      }
    }
  };

  const Noticia_GetById = async (ID_Noticia) => {
    try {
      const response = await axios.get(`${apiAdress}/Noticia/${ID_Noticia}`);
      const data = response.data;
      if (response.status === 200 ) {
        setNoticias(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      let message = "Ocorreu um erro ao buscar noticias";
      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
    } else {
      setError(message);
    }
    }
  };


  const Noticia_Search = async (Search) => {
    try {
      const response = await axios.get(`${apiAdress}/Noticia/search/${Search}/1`);
      const data = response.data;
      if (response.status === 200 ) {
        setNoticias(data);
      }
    } catch (error) {
      console.error(error);
      let message = "Ocorreu um erro ao buscar noticias";

      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
    } else {
      setError(message);
    }
    }
  };

  return (
    <NoticiaContext.Provider 
      value={{
        noticias, 
        loading, 
        error, 
        Noticia_GetByStatus, 
        Noticia_GetAll, 
        Noticia_GetById,
        Noticia_UpdateStatus,
        updateSuccess,
        isMessageVisible,
        setIsMessageVisible}}>
      {children}
    </NoticiaContext.Provider>
  );
};

export default NoticiaContext;