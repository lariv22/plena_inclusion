import Container from "react-bootstrap/Container";
import Col from "../../node_modules/react-bootstrap/Col";
import Row from "../../node_modules/react-bootstrap/Row";
import Aragon from "../PlenaInclusionAragon.png";

function Footer() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="container mt-5 top">
              <div className="p-2 text-center">
                <img
                  src={Aragon}
                  width="200"
                  height="100"
                  className="img-responsive"
                  alt="logo"
                />
              </div>
            </div>
          </Col>
          <Col>
            <div className="container mt-5 top">
              <div className="p-2 text-center">
                <div className="mb-3">Política de privacidad</div>
                <div className="mb-3">Aviso legal</div>
                <div className="mb-3">Política de cookies</div>
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
