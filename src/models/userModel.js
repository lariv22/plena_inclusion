import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING(50),
    },
    surname1: {
      type: DataTypes.STRING(50),
    },
    surname2: {
      type: DataTypes.STRING(50),
    },
    DNI: {
      type: DataTypes.STRING(9),
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    phone: {
      type: DataTypes.INTEGER(9),
    },
    email: {
      type: DataTypes.STRING(60),
    },
    birthday: {
      type: DataTypes.ONLYDATE,
    },
    address: {
      type: DataTypes.STRING(150),
    },
    termination_date: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTablename: true,
  }
);

(async () => {
  await db.sync();
})();

export default Users;
