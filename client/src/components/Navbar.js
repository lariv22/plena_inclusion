import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../plenaInclusion.png";

function NavBar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container className="align-content-center">
          <Navbar.Brand className="justify-content-center" href="/Dashboard">
            <img
              src={Logo}
              width="40"
              height="30"
              className="img-responsive"
              alt="logo"
            />
            Plena Inclusión
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Dashboard">Mis actividades</Nav.Link>
            <Nav.Link href="/SearchActivities">Buscar actividades</Nav.Link>
            <Nav.Link href="/Register">Registrar</Nav.Link>
            <Nav.Link href="/Profile">Perfil</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
