import * as React from 'react';
import axios from 'axios';
import { createContext, useState } from "react";
import { apiAdress } from '../components/Api.jsx';

const ComentarioContext = createContext();

export const ComentarioProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorUser,seterrorUser]=useState('');

  const comentario_GetAllByNoticia = async (Noticia) => {
    try {
      const response = await axios.get(`${apiAdress}/Comentario/Comentario/noticia/${Noticia}`);
      const data = response.data;
      if (response.status === 200 ) {
        setComentario(data);
      }
    } catch (error) {
      console.error(error);
      let message = "Ocorreu um erro ao buscar Comentarios";
      seterrorUser="Erro ao consultar Comentarios";

      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
    } else {
      setError(message);
      seterrorUser="Erro ao consultar Comentarios";
    }
    }
  };

  

  const comentario_GetAllByStatus = async (Status) => {
    try {
      const response = await axios.get(`${apiAdress}/Comentario/status/${Status}`);
      const data = response.data;
      if (response.status === 200 ) {
        setComentario(data);
      }
    } catch (error) {
      console.error(error);
      let message = "Ocorreu um erro ao buscar Comentarios";
      seterrorUser="Erro ao consultar Comentarios";

      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
    } else {
      setError(message);
      seterrorUser="Erro ao consultar Comentarios";
    }
    }
  };

  const comentario_GetAllByID = async (ID) => {
    try {
      const response = await axios.get(`${apiAdress}/Comentario/${ID}`);
      const data = response.data;
      if (response.status === 200 ) {
        setComentario(data);
      }
    } catch (error) {
      console.error(error);
      let message = "Ocorreu um erro ao buscar Comentarios";
      seterrorUser="Erro ao consultar Comentarios";

      if (error.response && error.response.data && error.response.data.message) {
        setError(message + ": " + error.response.data.message);
    } else {
      setError(message);
      seterrorUser="Erro ao consultar Comentarios";
    }
    }
  };

  
  const comentario_GetAllByNoticiaAndStatus= async (IDNoticia,Status)=>{
    try {
        const response = await axios.get(`${apiAdress}/Comentario/${IDNoticia}/${Status}`);
        const data = response.data;
        if (response.status === 200 ) {
          setComentario(data);
        }
      } catch (error) {
        console.error(error);
        let message = "Ocorreu um erro ao buscar Comentarios";
        seterrorUser="Erro ao consultar Comentarios";
  
        if (error.response && error.response.data && error.response.data.message) {
          setError(message + ": " + error.response.data.message);
      } else {
        setError(message);
        seterrorUser="Erro ao consultar Comentarios";
      }
      }
    };

    const Comentario_Insert = async (Comentario) => {
        try {
          const response = await axios.post(`${apiAdress}/Comentario`, {
            Texto: texto,
            Status: status,
            IdUsuario: idusuario,
            Data: data,
            ID_ADM_Reprovou: id_adm_reprovou,
            DataReprovado: datareprovado
    
          });
          const data = response.data;
    
          if (response.status === 200 ) {
            const newComentario = data;
            setComentarios([...Comentario, newComentario]);
          } else {
            seterrorUser="Erro ao consultar Comentario";
            setError(data.message);
          }
        } catch (error) {
          seterrorUser="Erro ao consultar Comentario";
          console.error(error);
          setError('Ocorreu um erro ao adicionar uma Comentario.');
        }
      };

      const Comentario_UpdateStatus = async (IDcomentario,Status,idADM) => {
        try {
          const response = await axios.put(`${apiAdress}/Comentario/${IDcomentario}/${Status}/${idADM}`, {
          });
          const data = response.data;
    
          if (response.status === 200 ) {
            console.log("sucesso");
            setComentarios([...Comentario, newComentario]);
          } else {
            seterrorUser="Erro ao consultar Comentario";
            setError(data.message);
          }
        } catch (error) {
          seterrorUser="Erro ao consultar Comentario";
          console.error(error);
          setError('Ocorreu um erro ao adicionar uma Comentario.');
        }
      };

      return (
        <ComentarioContext.Provider value={{ comentarios, loading, error, comentarioAllByNoticia }}>
          {children}
        </ComentarioContext.Provider>
      );
  };

export default ComentarioContext;
