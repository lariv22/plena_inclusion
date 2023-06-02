import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../../node_modules/react-bootstrap/Form";
import Button from "../../node_modules/react-bootstrap/Button";
import Col from "../../node_modules/react-bootstrap/Col";
import Row from "../../node_modules/react-bootstrap/Row";
import Card from "../../node_modules/react-bootstrap/Card";
import Container from "../../node_modules/react-bootstrap/Container";
import Nav from "../../node_modules/react-bootstrap/Nav";
import Navbar from "../../node_modules/react-bootstrap/Navbar";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState({
    userId: -1,
    name: "",
    email: "",
  });
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const [ready, setReady] = useState(false);
  const [expire, setExpire] = useState("");

  const navigation = useNavigate();

  useEffect(() => {
    refreshToken();
    GetUserData();
  }, []);

  const GetUserData = async () => {
    const token = localStorage.getItem("accessToken");
    const { userId } = jwt_decode(token);
    axios
      .post("/getUserData", {
        userId,
      })
      .then((response) => {
        setUserData(response.data.user);
        setReady(true);
      })
      .catch(async (error) => {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
        if (error.response.status === 403) {
          const RT = await refreshToken();
          GetUserData(new Event("firstTime"));
        }
      });
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3000/refreshToken");
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      return Promise.resolve();
    } catch (error) {
      if (error.response) {
        navigation("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      const token = localStorage.getItem("accessToken");
      if (expire * 1000 < currentDate.getTime() || expire == undefined) {
        config.headers.Authorization = `Bearer ${token}`;
        const decoded = jwt_decode(token);
        config.params = {
          userId: decoded.userId,
        };
        setExpire(decoded.exp);
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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

  const UpdateEmail = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const { userId } = jwt_decode(token);
    if (window.confirm("¿Seguro que quieres cambiar el email?")) {
      try {
        const response = await axiosJWT
          .post("/updateEmailUser", {
            id: userId,
            email: email,
            confEmail: confEmail,
          })
          .then((response) => {
            alert(response.data.msg);
          })
          .catch(async (error) => {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
            if (error.response.status === 403) {
              const RT = await refreshToken();
              UpdateEmail(new Event("click"));
            }
          });
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  const UpdatePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const { userId } = jwt_decode(token);
    if (window.confirm("¿Seguro que quieres cambiar la contraseña?")) {
      try {
        const response = await axiosJWT
          .post("/updatePasswordUser", {
            id: userId,
            password: password,
            confPassword: confPassword,
          })
          .then((response) => {
            alert(response.data.msg);
          })
          .catch(async (error) => {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
            if (error.response.status === 403) {
              const RT = await refreshToken();
              UpdatePassword(new Event("click"));
            }
          });
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  return (
    <div className="container mt-5 top">
      <div className="p-5 text-center">
        <h1 className="mb-3" style={{ fontSize: 30, fontWeight: "bold" }}>
          Perfil
        </h1>
      </div>
      <form onSubmit={Logout} className="box">
        <div className="field mt-5">
          <button
            className="button is-success is-fullwidth"
            style={{ backgroundColor: "#2DA635" }}
          >
            Cerrar sesión
          </button>
        </div>
      </form>
      <Row xs={10} md={7} className="g-4 mt-1 mb-5">
        <Col>
          {ready && (
            <Card className={`box - shadow`}>
              <Card.Body>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Datos del usuario</span>
                </Card.Title>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Nombre:</span>{" "}
                  {userData.name}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Primer Apellido:</span>{" "}
                  {userData.surname1}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Segundo Apellido:</span>{" "}
                  {userData.surname2}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>DNI:</span>{" "}
                  {userData.DNI}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Género:</span>{" "}
                  {userData.gender}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Teléfono:</span>{" "}
                  {userData.phoneNumber}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                  {userData.email}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>
                    Fecha de nacimiento:
                  </span>{" "}
                  {userData.birthDate}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Dirección:</span>{" "}
                  {userData.address}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row xs={10} md={7} className="g-4 mt-1 mb-5">
        <Col>
          {ready && (
            <div className="columns is-full">
              <div className="column is-4-desktop">
                <form onSubmit={UpdateEmail} className="box">
                  <div className="field mt-5 has-text-centered">
                    <p className="has-text-centered" style={{ fontSize: 20 }}>
                      Modificar correo
                    </p>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Nuevo email</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Nuevo email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <label className="label">Confirmar email</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Confirmar email"
                        value={confEmail}
                        onChange={(e) => setConfEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      className="button is-success is-fullwidth"
                      style={{ backgroundColor: "#2DA635" }}
                    >
                      Modificar email
                    </button>
                  </div>
                </form>
              </div>
              <div className="column is-4-desktop">
                <form onSubmit={UpdatePassword} className="box">
                  <div className="field mt-5 has-text-centered">
                    <p className="has-text-centered" style={{ fontSize: 20 }}>
                      Modificar contraseña
                    </p>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Nueva contraseña</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <label className="label">Confirmar contraseña</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Confirmar contraseña"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      className="button is-success is-fullwidth"
                      style={{ backgroundColor: "#2DA635" }}
                    >
                      Modificar contraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
