import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Disabilities = db.define('disabilities',{
    nameDisability:{
        type: DataTypes.STRING
    },
    descriptionDisability:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Disabilities;