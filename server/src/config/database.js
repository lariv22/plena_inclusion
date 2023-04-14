import { Sequelize } from "sequelize";

//npm install sequelize

const db = new Sequelize("plena-inclusion", "root", "", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
});

export default db;
