import React, { useState } from "react";
import axios from "axios";
import Card from "../../node_modules/react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const history = useNavigate();
  const [userData, setUserData] = useState([]);
  const [msg, setMsg] = useState("");
  const [ready, setReady] = useState(false);

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/getUserData", {
          id: id,
        })
        .then((response) => {
          setUserData(response.data.user);
          setReady(true);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const Auth2 = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/updateEmailUser", {
          id: id,
          email: email,
          confEmail: confEmail,
        })
        .then((response) => {
          alert(response.data.msg);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const Auth3 = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/updatePasswordUser", {
          id: id,
          password: password,
          confPassword: confPassword,
        })
        .then((response) => {
          alert(response.data.msg);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-half">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <div className="field mt-5 has-text-centered">
                  <p className="has-text-centered" style={{ fontSize: 45 }}>
                    Perfil
                  </p>
                </div>
                <div className="field mt-5">
                  <label className="label">ID</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    className="button is-success is-fullwidth"
                    style={{ backgroundColor: "#2DA635" }}
                  >
                    Buscar usuario
                  </button>
                </div>
              </form>
            </div>
            {ready && (
              <Card>
                <Card.Body>
                  <Card.Title>
                    <span style={{ fontWeight: "bold" }}>
                      Datos del usuario
                    </span>
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
                    <span style={{ fontWeight: "bold" }}>
                      Segundo Apellido:
                    </span>{" "}
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
          </div>
          <div className="columns is-half">
            <div className="column is-4-desktop">
              <form onSubmit={Auth2} className="box">
                <div className="field mt-5 has-text-centered">
                  <p className="has-text-centered" style={{ fontSize: 45 }}>
                    Modificar correo
                  </p>
                </div>
                <div className="field mt-5">
                  <label className="label">ID</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
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
              <form onSubmit={Auth3} className="box">
                <div className="field mt-5 has-text-centered">
                  <p className="has-text-centered" style={{ fontSize: 45 }}>
                    Modificar contraseña
                  </p>
                </div>
                <div className="field mt-5">
                  <label className="label">ID</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
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
        </div>
      </div>
    </section>
  );
};

export default Profile;
