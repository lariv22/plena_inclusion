import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const Participant = db.define(
  "participant",
  {
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
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
  },
  {
    freezeTablename: true,
  }
);

(async () => {
  await db.sync();
})();

export default Participant;
