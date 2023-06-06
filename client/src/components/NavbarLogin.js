import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../plenaInclusion.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavBarLogin() {
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const [expire, setExpire] = useState("");

  const navigation = useNavigate();

  const Logout = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("/logout").then((response) => {
        localStorage.removeItem("accessToken");
        history("/login");
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container className="align-content-center justify-content-center">
          <Navbar.Brand
            className="d-flex align-items-center justify-content-center"
            href="/Dashboard"
          >
            <img
              src={Logo}
              width="40"
              height="30"
              className="img-responsive"
              alt="logo"
            />
            Plena Inclusión
          </Navbar.Brand>
          <Nav className="d-flex align-items-center justify-content-center me-auto is-pulled-left">
            <Nav.Link href="/Dashboard">Mis actividades</Nav.Link>
            <Nav.Link href="/SearchActivities">Buscar actividades</Nav.Link>
            <Nav.Link href="/Profile">Perfil</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center justify-content-center is-pulled-right">
            <form onSubmit={Logout}>
              <button className="button is-danger is-fullwidth is-pulled-right">
                Cerrar sesión
              </button>
            </form>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
 export default NavBarLogin;