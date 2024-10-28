import { useEffect, useContext } from "react";
import ModalSubir from "./componentes/ModalSubir";
import Navegacion from "./componentes/Navegacion";
import { ControladoresContexto } from "./Contexto";
import { Col, Container, Row, Card, CardImg } from "react-bootstrap";

function App() {
  const { fetchImagenes, imagenes } = useContext(ControladoresContexto);
  // obtener imagenes al iniciar
  useEffect(() => {
    fetchImagenes();
  }, [fetchImagenes, imagenes]);

  const descargarArchivo = (nombreArchivo) => {
    window.location.href = `http://localhost:3000/descargar?filename=${nombreArchivo}`;
  };

  return (
    <>
      <Navegacion></Navegacion>
      <ModalSubir></ModalSubir>
      <Container className="mt-3">
        <Row>
          <h1>Archivos subidos</h1>
          {imagenes?.map((imagen, index) => (
            <Col xs={12} md={4} lg={3} xl={3} className="mb-4" key={index}>
              <Card>
                <CardImg
                  src={`http://localhost:3000/archivos/${imagen}`}
                  alt={`imagen${index}`}
                  style={{
                    maxHeight: "18em",
                    height: "18em",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Imagen seleccionada:", imagen);
                    descargarArchivo(imagen);
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
