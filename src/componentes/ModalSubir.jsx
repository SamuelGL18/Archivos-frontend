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
        const respuesta = await axios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false,
        });
        console.log("File upload successful:", respuesta.data);
      } else {
        console.warn("No file or data to upload.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to create FormData object
  const crearArchivo = () => {
    const formData = new FormData(); // Use FormData for multipart uploads

    // Handle image upload if file is selected
    if (imagen) {
      formData.append("imagen", imagen); // Append the file
    } else {
      console.warn("No se ha seleccionado el archivo."); // Inform user
      return null; // Exit if no file selected
    }

    return formData; // Return populated FormData object
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
              <FormLabel>Imágen</FormLabel>
              <FormControl
                required
                type="file"
                className="mb-2"
                id="imagen"
                name="imagen"
                autoComplete="off"
                onChange={(e) => setImagen(e.target.files[0])} // Get the first selected file
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
