import { useContext } from "react";
import { ControladoresContexto } from "../Contexto";
import { Container, Navbar, Button, Image } from "react-bootstrap";

const Navegacion = () => {
  const { handleMostrarAgregar } = useContext(ControladoresContexto);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand>Windows Server</Navbar.Brand>
          <Button
            className="nav-link"
            variant="link"
            onClick={handleMostrarAgregar}
          >
            <Image
              src="cloud-computing.png"
              width="30"
              height="30"
              className="ms-auto"
            ></Image>
            Subir
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default Navegacion;
