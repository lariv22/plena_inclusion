import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const Professionals = db.define(
  "professionals",
  {
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    speciality: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Professionals;
