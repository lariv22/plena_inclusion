import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Activity = db.define(
  "activity",
  {
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING(500),
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

export default Activity;
