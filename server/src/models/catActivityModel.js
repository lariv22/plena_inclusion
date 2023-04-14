import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Activity from "./activityModel.js";
import Category from "./categoryModel.js";
const { DataTypes } = Sequelize;
const CatActivity = db.define("CatActivity", {
  ActivityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Activity,
      key: "id",
    },
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
  },
});

(async () => {
  await db.sync();
})();

export default CatActivity;
