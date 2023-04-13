import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";
import Activity from "./activityModel.js";
const { DataTypes } = Sequelize;
const UserActivity = db.define("UserActivity", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  ActivityId: {
    type: DataTypes.INTEGER,
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
