import * as React from 'react';
import axios from 'axios';
import { createContext, useState } from "react";
import { apiAdress } from '../components/Api.jsx';
const RegistroContext = createContext();

export const NoticiaProvider = ({ children }) => {
  const [Registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorUser,seterrorUser]=useState('');

  useEffect(() => {
    const Registro_GetAll = async () => {
      try {
        const response = await axios.get(`${apiAdress}/Registro`);
        const data = response.data;

        if (response.status === 200 ) {
          setRegistros(data);
        }
      } catch (error) {
        console.error(error);
        seterrorUser="Erro ao consultar Registros";
        let message ="Ocorreu um erro ao buscar Registros";

        if (error.response && error.response.data && error.response.data.message) {
          setError(message + ": " + error.response.data.message);
      } else {
        setError(message);
      }
      } finally {
        setLoading(false);
      }
    };
    Registro_GetAll();
  }, []);

  const Registro_GetById= async (IDRegistro)=>{
    try {
        const response = await axios.get(`${apiAdress}/Registro/${IDRegistro}`);
        const data = response.data;
        if (response.status === 200 ) {
          setRegistros(data);
        }
      } catch (error) {
        console.error(error);
        let message = "Ocorreu um erro ao buscar Registros";
        seterrorUser="Erro ao consultar Registros";
  
        if (error.response && error.response.data && error.response.data.message) {
          setError(message + ": " + error.response.data.message);
      } else {
        setError(message);
        seterrorUser="Erro ao consultar Registros";
      }
      }
    };




return (
  <RegistroContext.Provider value={{Registros,loading,error,errorUser}}>
    {children}
  </RegistroContext.Provider>
);
};

export default RegistroContext;