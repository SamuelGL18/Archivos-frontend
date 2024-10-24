import { useState, useEffect } from "react";
import ModalSubir from "./componentes/ModalSubir";
import Navegacion from "./componentes/Navegacion";
import { ControllersProvider } from "./Contexto";
import axios from "./api/axios";
import { Col, Container, Row, Card, CardImg } from "react-bootstrap";

function App() {
  const [imagenes, setImagenes] = useState([]);

  // Fetch images from the backend when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/images");
        setImagenes(response.data); // This will be the list of filenames
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const downloadFile = async (filename) => {
    try {
      const response = await axios.post(
        "/download",
        { filename },
        {
          responseType: "blob", // Important to handle the response as a blob
        }
      );

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log("Attempting to download:", filename);
      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the file name for download

      // Append to the body
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to trigger the download

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <ControllersProvider>
        <Navegacion></Navegacion>
        <ModalSubir></ModalSubir>
        <Container>
          <Row>
            <h1>Uploaded Images</h1>
            {imagenes.map((imagen, index) => (
              <Col xs={12} md={4} lg={3} xl={3} className="mb-4" key={index}>
                <Card>
                  <CardImg
                    src={`http://localhost:3000/uploads/${imagen}`}
                    alt={`uploaded-${index}`}
                    style={{
                      maxHeight: "18em",
                      height: "18em",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("Clicked filename:", imagen);
                      downloadFile(imagen);
                    }} // Call download function on click
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </ControllersProvider>
    </>
  );
}

export default App;
