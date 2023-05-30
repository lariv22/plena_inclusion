import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [id, setId] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [surname1, setSurname1] = useState("");
  const [surname2, setSurname2] = useState("");
  const [DNI, setDNI] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [special_needs, setSpecial_needs] = useState(0);
  const [emerg_number, setEmerg_number] = useState("");
  const [disability, setDisability] = useState("");
  const [email_notif, setEmail_notif] = useState(0);
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/addUser", {
        name: nameUser,
        surname1: surname1,
        surname2: surname2,
        DNI: DNI,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        birthDate: birthDate,
        address: address,
        special_needs: special_needs,
        emerg_number: emerg_number,
        disability: disability,
        email_notif: email_notif,
      });
      history("/login");
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
              <form onSubmit={Auth} className="box">
                <div className="field mt-5 has-text-centered">
                  <p className="has-text-centered" style={{ fontSize: 45 }}>
                    Plena Inclusión Aragón
                  </p>
                  <p className="has-text-centered" style={{ fontSize: 30 }}>
                    Formulario de registro
                  </p>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nombre"
                      value={nameUser}
                      onChange={(e) => setNameUser(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Apellido 1"
                      value={surname1}
                      onChange={(e) => setSurname1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Apellido 2"
                      value={surname2}
                      onChange={(e) => setSurname2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="DNI"
                      value={DNI}
                      onChange={(e) => setDNI(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Selecciona tu género</option>
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Teléfono"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
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
                  <label className="label">
                    Introduce tu fecha de nacimiento
                  </label>
                  <div className="controls">
                    <input
                      type="date"
                      className="input"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Dirección"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">¿Necesidades especiales?</label>
                  <div className="controls">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={special_needs}
                      onChange={(e) => setSpecial_needs(1)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Número de emergencia</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Número de móvil"
                      value={emerg_number}
                      onChange={(e) => setEmerg_number(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Discapacidad</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Discapacidad"
                      value={disability}
                      onChange={(e) => setDisability(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">
                    ¿Desea recibir notificaciones?
                  </label>
                  <div className="controls">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={email_notif}
                      onChange={(e) => setEmail_notif(1)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    className="button is-success is-fullwidth"
                    style={{ backgroundColor: "#2DA635" }}
                  >
                    Registrarme
                  </button>
                </div>
                <div className="links">
                  <a className="link" href="/Login">
                    ¿Ya tienes una cuenta?
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

export default Register;
