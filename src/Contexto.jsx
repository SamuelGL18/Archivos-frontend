import React, { useState } from "react";
import axios from "./api/axios";

const ControladoresContexto = React.createContext({});

// eslint-disable-next-line react/prop-types
const ControllersProvider = ({ children }) => {
  //* MODALES
  //* Controladores del agregar producto modal

  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [imagenes, setImagenes] = useState([]);

  const fetchImagenes = async () => {
    try {
      const respuesta = await axios.get("/archivos");
      setImagenes(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMostrarAgregar = () => {
    setMostrarAgregar(true);
  };
  const handleOcultarAgregar = () => setMostrarAgregar(false);

  const value = {
    mostrarAgregar,
    handleMostrarAgregar,
    handleOcultarAgregar,
    imagenes,
    fetchImagenes,
  };

  return (
    <ControladoresContexto.Provider value={value}>
      {children}
    </ControladoresContexto.Provider>
  );
};

export { ControladoresContexto, ControllersProvider };
