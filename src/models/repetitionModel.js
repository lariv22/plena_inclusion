import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Activity from "./activityModel.js";
import Professional from "./professionalModel.js"

const { DataTypes } = Sequelize;

const Repetitions = db.define('repetitions',{
    nameRepetition:{
        type: DataTypes.STRING
    },
    startDateRepetition:{
        type: DataTypes.DATE
    },
    durationRepetition:{
        type: DataTypes.STRING
    },
    locationRepetition:{
        type: DataTypes.STRING
    },
    professionalId:{
        type: DataTypes.INTEGER,
        references: {
            model: Professional,
            key: "id"
        }
    },
    activityId:{
        type: DataTypes.INTEGER,
        references: {
            model: Activity,
            key: "id"
        }
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Repetitions;