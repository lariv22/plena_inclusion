import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "user",
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
    phoneNumber: {
      type: DataTypes.INTEGER(9),
    },
    email: {
      type: DataTypes.STRING(60),
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    address: {
      type: DataTypes.STRING(150),
    },
    special_needs: {
      type: DataTypes.BOOLEAN,
    },
    emerg_number: {
      type: DataTypes.INTEGER(9),
    },
    disability: {
      type: DataTypes.STRING(40),
    },
    registrationDate: {
      type: DataTypes.DATE,
    },
    terminationDate: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
    email_notif: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTablename: true,
  }
);

(async () => {
  await db.sync();
})();

export default User;
