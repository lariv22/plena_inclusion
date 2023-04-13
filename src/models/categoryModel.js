import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Categories = db.define('categories',{
    nameCategory:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Categories;