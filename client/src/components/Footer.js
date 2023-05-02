import Container from "react-bootstrap/Container";
import Col from "../../node_modules/react-bootstrap/Col";
import Row from "../../node_modules/react-bootstrap/Row";

function Footer() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="container mt-5 top">
              <div className="p-2 text-center">
                <div className="mb-3">Política de privacidad</div>
                <div className="mb-3">Cosas legales</div>
                <div className="mb-3">Movidas</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="container mt-5 top">
              <div className="p-2 text-center">
                <div className="mb-3">No sé</div>
                <div className="mb-3">qué más</div>
                <div className="mb-3">poner la vd</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="p-2 text-center">
            <div className="mb-3">@ 2023 Plena Inclusión</div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
