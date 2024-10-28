import { useState, useContext } from "react";
import {
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { ControladoresContexto } from "../Contexto";
import axios from "../api/axios";

const ModalSubir = () => {
  const { mostrarAgregar, handleOcultarAgregar } = useContext(
    ControladoresContexto
  );

  // Datos del archivo
  const [imagen, setImagen] = useState(null);

  //* Posteo del archivo
  const subirArchivoAPI = async () => {
    try {
      const formData = crearArchivo();

      if (formData) {
        const respuesta = await axios.post("/subir", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false,
        });
        console.log("El archivo se subio:", respuesta.data);
        handleOcultarAgregar();
      } else {
        console.warn("No se ha seleccionado ningun archivo.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // datos del formulario
  const crearArchivo = () => {
    const datosFormulario = new FormData();

    if (imagen) {
      datosFormulario.append("imagen", imagen);
    } else {
      console.warn("No se ha seleccionado el archivo.");
      return null;
    }

    return datosFormulario;
  };

  return (
    <>
      <Modal show={mostrarAgregar} onHide={handleOcultarAgregar} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Subir Archivo</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>Seleccione el archivo</FormLabel>
              <FormControl
                required
                type="file"
                className="mb-2"
                id="imagen"
                name="imagen"
                autoComplete="off"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={subirArchivoAPI}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSubir;
