import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Participant = db.define(
  "participant",
  {
    name: {
      type: DataTypes.STRING(50),
    },
    special_needs: {
      type: DataTypes.BOOLEAN,
    },
    emerg_number: {
      type: DataTypes.INTEGER(9),
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
