import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Activities = db.define(
  "activities",
  {
    name: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTablename: true,
  }
);

(async () => {
  await db.sync();
})();

export default Activities;
