import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          history("/dashboard");
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
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={LoginUser} className="box">
                <div className="field mt-5 has-text-centered">
                  <p className="has-text-centered" style={{ fontSize: 45 }}>
                    Plena Inclusión
                  </p>
                  <p className="has-text-centered" style={{ fontSize: 30 }}>
                    Inicio de sesión
                  </p>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    className="button is-success is-fullwidth"
                    style={{ backgroundColor: "#2DA635" }}
                  >
                    Login
                  </button>
                </div>
                <div className="links">
                  <a className="link" href="/Register">
                    ¿Aún no tienes una cuenta?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
