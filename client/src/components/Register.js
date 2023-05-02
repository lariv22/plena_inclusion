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
  const [disability, setDisability] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/addParticipant", {
          id: id,
          name: nameUser,
          surname1: surname1,
          surname2: surname2,
          DNI: DNI,
          gender: gender,
          phoneNumber: phoneNumber,
          email: email,
          birthDate: birthDate,
          address: address,
          disability: disability,
        })
        .then((response) => {
          alert(response.data.msg);
        });
      history("/dashboard");
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
                    PlenaInclusión
                  </p>
                </div>
                <div className="field mt-5">
                  <label className="label">Id</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Nombre</label>
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
                  <label className="label">Surname1</label>
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
                  <label className="label">Surname2</label>
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
                  <label className="label">DNI</label>
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
                  <label className="label">Genero</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Género"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Telefono</label>
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
                  <label className="label">Email</label>
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
                  <label className="label">FechaNac</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Fecha de nacimiento"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Direccion</label>
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
                  <label className="label">Discapacidad</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Discapacidad"
                      value={address}
                      onChange={(e) => setDisability(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    className="button is-success is-fullwidth"
                    style={{ backgroundColor: "#2DA635" }}
                  >
                    Registrar participante
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

export default Register;
