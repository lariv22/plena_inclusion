import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const Professionals = db.define('professionals',{
    speciality:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

Professionals.belongsTo(User, { foreignKey: "id", targetKey: "id" });

(async () => {
    await db.sync();
})();

export default Professionals;