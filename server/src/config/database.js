import { Sequelize } from "sequelize";

//npm install sequelize

const db = new Sequelize("plena-inclusion", "root", "YouCan", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
