import React, { useState } from "react";

const ControladoresContexto = React.createContext({});

// eslint-disable-next-line react/prop-types
const ControllersProvider = ({ children }) => {
  //* MODALES
  //* Controladores del agregar producto modal
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const handleMostrarAgregar = () => {
    setMostrarAgregar(true);
  };
  const handleOcultarAgregar = () => setMostrarAgregar(false);

  const value = { mostrarAgregar, handleMostrarAgregar, handleOcultarAgregar };

  return (
    <ControladoresContexto.Provider value={value}>
      {children}
    </ControladoresContexto.Provider>
  );
};

export { ControladoresContexto, ControllersProvider };
