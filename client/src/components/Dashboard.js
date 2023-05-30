import React, { useState, useEffect } from "react";
import Form from "../../node_modules/react-bootstrap/Form";
import Button from "../../node_modules/react-bootstrap/Button";
import Col from "../../node_modules/react-bootstrap/Col";
import Row from "../../node_modules/react-bootstrap/Row";
import Card from "../../node_modules/react-bootstrap/Card";
import Container from "../../node_modules/react-bootstrap/Container";
import Nav from "../../node_modules/react-bootstrap/Nav";
import Navbar from "../../node_modules/react-bootstrap/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./style.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Dashboard = () => {
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [activitiesOfUserWeek, setActivitiesOfUserWeek] = useState([]);
  const [activitiesOfUserDates, setActivitiesOfUserDates] = useState([]);
  const [msg, setMsg] = useState("");
  const [ready, setReady] = useState(false);
  const [expire, setExpire] = useState("");

  var curr = new Date();
  var date = curr.toISOString().substring(0, 10);
  curr.setDate(curr.getDate() + 7);
  const [startDate, setStartDate] = useState(date);
  date = curr.toISOString().substring(0, 10);
  const [endDate, setEndDate] = useState(date);

  const navigation = useNavigate();

  useEffect(() => {
    defaultDate();
  }, []);

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

  const defaultDate = async () => {
    var curr = new Date();
    var startDate = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 7);
    var endDate = curr.toISOString().substring(0, 10);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const GetActivitiesOfUserWeek = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const { userId } = jwt_decode(token);
    const response = await axios
      .post("/getActivitiesOfUser", {
        userId,
        startDate: startDate,
        endDate: endDate,
      })
      .then((response) => {
        setActivitiesOfUserWeek(response.data.arrayActivities);
      })
      .catch(async (error) => {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
        if (error.response.status === 403) {
          const RT = await refreshToken();
          GetActivitiesOfUserWeek(new Event("click"));
        }
      });
  };

  const GetActivitiesOfUserDates = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const { userId } = jwt_decode(token);
    const response = await axios
      .post(
        "/getActivitiesOfUser",
        {
          userId,
          startDate: newStartDate,
          endDate: newEndDate,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setActivitiesOfUserDates(response.data.arrayActivities);
      })
      .catch(async (error) => {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
        if (error.response.status === 403) {
          const RT = await refreshToken();
          GetActivitiesOfUserDates(new Event("click"));
        }
      });
  };

  return (
    <div className="container mt-5 top">
      <div className="p-5 text-center">
        <h1 className="mb-3" style={{ fontSize: 30, fontWeight: "bold" }}>
          Mis actividades
        </h1>
      </div>
      <Navbar className="border-bottom border-gray pb-5">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={GetActivitiesOfUserWeek}>
              <Button
                className="button is-success is-fullwidth"
                variant="outline-success"
                type="submit"
                style={{ backgroundColor: "#2DA635" }}
              >
                Buscar próximas
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row xs={10} md={7} className="g-4 mt-1 mb-5">
        {activitiesOfUserWeek.map((activity) => (
          <Col key={activity.id}>
            <Card className={`box - shadow`}>
              <Card.Body>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Actividad:</span>{" "}
                  {activity.name}
                </Card.Title>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}></span>{" "}
                  <img
                    src={activity.image}
                    alt="new"
                    height="200"
                    width="200"
                  />
                </Card.Title>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Fecha inicio:</span>{" "}
                  {activity.dateStart}
                </Card.Title>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Fecha final:</span>{" "}
                  {activity.dateEnd}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Navbar className="border-bottom border-gray pb-5">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={GetActivitiesOfUserDates}>
              <Form.Control
                className="me-2"
                type="date"
                placeholder="Fecha inicio"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
              />
              <Form.Control
                className="me-2"
                type="date"
                placeholder="Fecha final"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
              <Button
                className="button is-success is-fullwidth"
                variant="outline-success"
                type="submit"
                style={{ backgroundColor: "#2DA635" }}
              >
                Buscar entre fechas
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row xs={10} md={7} className="g-4 mt-1 mb-5">
        {activitiesOfUserDates.map((activity) => (
          <Col key={activity.id}>
            <Card className={`box - shadow`}>
              <Card.Body>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Actividad:</span>{" "}
                  {activity.name}
                </Card.Title>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}></span>{" "}
                  <img
                    src={activity.image}
                    alt="new"
                    height="200"
                    width="200"
                  />
                </Card.Title>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Fecha inicio:</span>{" "}
                  {activity.dateStart}
                </Card.Title>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Fecha final:</span>{" "}
                  {activity.dateEnd}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
