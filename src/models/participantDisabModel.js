import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Participant from "./participantModel.js";
import Disability from "./disabilityModel.js";
const { DataTypes } = Sequelize;
const ParticipantDisab = db.define("ParticipantDisab", {
  ParticipantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Participant,
      key: "id",
    },
  },
  DisabilityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Disability,
      key: "id",
    },
  },
});

(async () => {
  await db.sync();
})();

export default ParticipantDisab;
