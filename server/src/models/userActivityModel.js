import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";
import Activity from "./activityModel.js";
const { DataTypes } = Sequelize;
const UserActivity = db.define("UserActivity", {
  idUser: {
    type: DataTypes.INTEGER(10),
    references: {
      model: User,
      key: "id",
    },
  },
  idActivity: {
    type: DataTypes.INTEGER(10),
    references: {
      model: Activity,
      key: "id",
    },
  },
});

(async () => {
  await db.sync();
})();

export default UserActivity;
