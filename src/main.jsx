import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ControllersProvider } from "./Contexto.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ControllersProvider>
      <App />
    </ControllersProvider>
  </React.StrictMode>
);
