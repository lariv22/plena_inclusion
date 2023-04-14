import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Activities = db.define(
  "activities",
  {
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    idCreator: {
      type: DataTypes.STRING,
    },
    dateStart: {
      type: DataTypes.DATEONLY,
    },
    dateEnd: {
      type: DataTypes.DATEONLY,
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
